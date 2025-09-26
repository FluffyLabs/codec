import { bytes, codec } from "@typeberry/lib";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CodecInput } from "../components/CodecInput";
import { Json } from "../components/Json";
import { Resizable } from "../components/Resizable/Resizable";
import { ALL_CHAIN_SPECS, kinds } from "../components/constants";
import { TEST_HEADER } from "../components/examples/header";

interface CodecProps {
  isDiffEnabled: boolean;
  setIsDiffEnabled: (enabled: boolean) => void;
}

export function Codec({ isDiffEnabled }: CodecProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // bytes input and it's json decoding
  const [bytesInput, setBytesInput] = useState(TEST_HEADER);
  const [bytesResult, setBytesResult] = useState("");
  // json input and it's hex-encoding
  const [jsonInput, setJsonInput] = useState("{}");
  const [jsonResult, setJsonResult] = useState("");
  // editability
  const [isBytesEditable, setIsBytesEditable] = useState(true);
  const [isJsonEditable, setIsJsonEditable] = useState(false);
  const [previousBytesResult, setPreviousBytesResult] = useState("");
  const [previousJsonResult, setPreviousJsonResult] = useState("");

  // we choose the actual values displayed based on editability.
  const valueBytes = isBytesEditable ? bytesInput : jsonResult;
  const valueJson = isBytesEditable ? bytesResult : jsonInput;

  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState("Block");
  const [chainSpec, setChainSpec] = useState("Tiny");

  useEffect(() => {
    const urlKind = searchParams.get("kind");
    const validKind = urlKind && kinds.find((k) => k.name === urlKind) ? urlKind : "Block";

    const urlFlavor = searchParams.get("flavor");
    const validChainSpec =
      urlFlavor && ["tiny", "full"].includes(urlFlavor.toLowerCase())
        ? urlFlavor.toLowerCase() === "tiny"
          ? "Tiny"
          : "Full"
        : "Tiny";

    const urlData = searchParams.get("data");
    const validData = urlData || TEST_HEADER;

    setKind(validKind);
    setChainSpec(validChainSpec);
    handleSetInput(validData, false);
  }, [searchParams]);

  const updateUrlParams = (newKind: string, newChainSpec: string, newInput: string) => {
    const params = new URLSearchParams();
    params.set("kind", newKind);
    params.set("flavor", newChainSpec.toLowerCase());
    params.set("data", newInput);
    setSearchParams(params);
  };

  const handleSetKind = (newKind: string) => {
    setKind(newKind);
    updateUrlParams(newKind, chainSpec, bytesInput);
  };

  const handleSetChainSpec = (newChainSpec: string) => {
    setChainSpec(newChainSpec);
    updateUrlParams(kind, newChainSpec, bytesInput);
  };

  const handleSetInput = (newInput: string, updateUrl = true) => {
    setBytesInput(newInput);
    setPreviousJsonResult(bytesResult);
    setBytesResult("");

    if (updateUrl) {
      updateUrlParams(kind, chainSpec, newInput);
    }

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
      setBytesResult("");
      setError(`${e}`);
    }
  };

  const handleJsonToHex = (jsonString: string) => {
    // always update textarea
    setJsonInput(jsonString);
    setPreviousJsonResult(valueJson);
    setPreviousBytesResult(jsonResult);
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

      const bytesValue = encoded.toString();
      setError(null);
      setJsonResult(bytesValue);
      setBytesInput(bytesValue);
      updateUrlParams(kind, chainSpec, bytesValue);
    } catch (e) {
      setError(`${e}`);
    }
  };

  return (
    <Resizable
      left={
        <CodecInput
          onChange={handleSetInput}
          value={valueBytes}
          error={error}
          kind={kind}
          setKind={handleSetKind}
          chainSpec={chainSpec}
          setChainSpec={handleSetChainSpec}
          isBytesEditable={isBytesEditable}
          setIsBytesEditable={(editable) => {
            setIsBytesEditable(editable);
            if (editable) setIsJsonEditable(false);
          }}
          isDiffEnabled={isDiffEnabled}
          previousValue={isBytesEditable ? "" : previousBytesResult}
        />
      }
      right={
        <Json
          result={valueJson}
          isJsonEditable={isJsonEditable}
          setIsJsonEditable={(editable) => {
            setIsJsonEditable(editable);
            if (editable) setIsBytesEditable(false);
          }}
          onJsonChange={handleJsonToHex}
          error={error}
          isDiffEnabled={isDiffEnabled}
          previousValue={isJsonEditable ? "" : previousJsonResult}
        />
      }
    />
  );
}
