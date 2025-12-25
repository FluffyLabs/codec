import { bytes, codec } from "@typeberry/lib";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CodecInput } from "../components/CodecInput";
import { Controls } from "../components/Controls";
import { ALL_CHAIN_SPECS, headerKind, kinds, tinyChainSpec } from "../components/constants";
import { TEST_HEADER } from "../components/examples/objects/header";
import { Json } from "../components/Json";
import { Resizable } from "../components/Resizable/Resizable";

interface CodecProps {
  isDiffEnabled?: boolean;
}

function useValidSearchParams(searchParams: URLSearchParams) {
  const urlKind = searchParams.get("kind")?.toLowerCase();
  const kind = kinds.find((k) => k.name.toLowerCase() === urlKind);

  const urlFlavor = searchParams.get("flavor")?.toLowerCase();
  const chainSpec = ALL_CHAIN_SPECS.find((x) => x.name.toLowerCase() === urlFlavor);

  const data = searchParams.get("data");

  return {
    kind,
    chainSpec,
    data,
  };
}

export function Codec({ isDiffEnabled = false }: CodecProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const validSearchParams = useValidSearchParams(searchParams);

  // bytes input and it's json decoding
  const [bytesInput, setBytesInput] = useState(validSearchParams.data ?? TEST_HEADER);
  const [bytesResult, setBytesResult] = useState("");
  const [bytesPreviousResult, setBytesPreviousResult] = useState<string | null>(null);
  // json input and it's hex-encoding
  const [jsonInput, setJsonInput] = useState("{}");
  const [jsonResult, setJsonResult] = useState("");
  const [jsonPreviousResult, setJsonPreviousResult] = useState<string | null>(null);

  // editability
  const [editMode, setEditMode] = useState<"bytes" | "json">("bytes");

  // we choose the actual values displayed based on editability.
  const valueBytes = editMode === "bytes" ? bytesInput : jsonResult;
  const valueJson = editMode === "bytes" ? bytesResult : jsonInput;

  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState(validSearchParams.kind?.name ?? headerKind.name);
  const [chainSpec, setChainSpec] = useState(validSearchParams.chainSpec?.name ?? tinyChainSpec.name);

  const handleBytesToJson = (newInput: string) => {
    if (bytesResult !== "") {
      setBytesPreviousResult(bytesResult);
    }
    setBytesInput(newInput);
    setBytesResult("");
    updateUrlParams(kind, chainSpec, newInput);

    // update the result
    try {
      const kindDescriptor = kinds.find((v) => v.name === kind);
      if (!kindDescriptor) {
        throw new Error(`Invalid codec kind: ${kind}`);
      }
      const spec = ALL_CHAIN_SPECS.find((x) => x.name === chainSpec);
      const decoded = codec.Decoder.decodeObject<unknown>(
        kindDescriptor.clazz.Codec,
        bytes.BytesBlob.parseBlob(bytesInput),
        spec?.spec,
      );
      const json = JSON.stringify(
        decoded,
        (_key, value) => {
          if (value instanceof bytes.BytesBlob) {
            return value.toString();
          }
          if (value instanceof bytes.Bytes) {
            return value.toString();
          }
          if (value instanceof Map) {
            return Object.fromEntries(value.entries());
          }
          if (typeof value === "bigint") {
            return value.toString();
          }
          return value;
        },
        2,
      );
      setBytesResult(json);
      setJsonInput(json);
      setError(null);
    } catch (e) {
      setError(`${e}`);
    }
  };

  const handleBytesToJsonRef = useRef(handleBytesToJson);
  handleBytesToJsonRef.current = handleBytesToJson;

  useEffect(() => {
    if (validSearchParams.kind !== undefined) {
      setKind(validSearchParams.kind.name);
    }
    if (validSearchParams.chainSpec !== undefined) {
      setChainSpec(validSearchParams.chainSpec.name);
    }
    if (validSearchParams.data !== null) {
      handleBytesToJsonRef.current(validSearchParams.data);
    }
  }, [validSearchParams.kind, validSearchParams.chainSpec, validSearchParams.data]);

  const updateUrlParams = (newKind: string, newChainSpec: string, newInput: string) => {
    setSearchParams((current) => {
      const params = new URLSearchParams();
      params.set("kind", newKind);
      params.set("flavor", newChainSpec);
      params.set("data", newInput);

      return params.toString() === current.toString() ? current : params;
    });
  };

  const handleSetKind = (newKind: string) => {
    setKind(newKind);
    updateUrlParams(newKind, chainSpec, bytesInput);
  };

  const handleSetChainSpec = (newChainSpec: string) => {
    setChainSpec(newChainSpec);
    updateUrlParams(kind, newChainSpec, bytesInput);
  };

  const handleJsonToHex = (jsonString: string) => {
    if (jsonResult !== "") {
      setJsonPreviousResult(jsonResult);
    }
    // always update textarea
    setJsonInput(jsonString);
    setJsonResult("");

    try {
      const kindDescriptor = kinds.find((v) => v.name === kind);
      if (!kindDescriptor) {
        throw new Error(`Invalid codec kind: ${kind}`);
      }
      const spec = ALL_CHAIN_SPECS.find((x) => x.name === chainSpec);

      const jsonObject = JSON.parse(jsonString, (_key, value) => {
        if (typeof value === "string" && value.startsWith("0x")) {
          try {
            return bytes.BytesBlob.parseBlob(value);
          } catch {
            return value; // Keep as string if parsing fails
          }
        }
        return value;
      });

      const encoded = codec.Encoder.encodeObject(kindDescriptor.clazz.Codec, jsonObject, spec?.spec);
      // make sure we can decode it back as well
      codec.Decoder.decodeObject(kindDescriptor.clazz.Codec, encoded, spec?.spec);

      const bytesValue = encoded.toString();
      setJsonResult(bytesValue);
      setBytesInput(bytesValue);
      updateUrlParams(kind, chainSpec, bytesValue);
      setError(null);
    } catch (e) {
      setError(`${e}`);
    }
  };

  return (
    <Resizable
      left={
        <CodecInput
          controls={
            <Controls
              onChange={handleBytesToJson}
              kind={kind}
              setKind={handleSetKind}
              chainSpec={chainSpec}
              setChainSpec={handleSetChainSpec}
            />
          }
          onChange={handleBytesToJson}
          value={valueBytes}
          previousValue={jsonPreviousResult}
          error={error}
          setKind={handleSetKind}
          chainSpec={chainSpec}
          isBytesEditable={editMode === "bytes"}
          setIsBytesEditable={(editable) => {
            setEditMode(editable ? "bytes" : "json");
            if (editable) {
              handleBytesToJson(valueBytes);
            }
          }}
          isDiffEnabled={isDiffEnabled}
        />
      }
      right={
        <Json
          value={valueJson}
          previousValue={bytesPreviousResult}
          isJsonEditable={editMode === "json"}
          setIsJsonEditable={(editable) => {
            setEditMode(editable ? "json" : "bytes");
            if (editable) {
              handleJsonToHex(valueJson);
            }
          }}
          onJsonChange={handleJsonToHex}
          error={error}
          isDiffEnabled={isDiffEnabled}
        />
      }
    />
  );
}
