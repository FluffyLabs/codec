import { bytes, codec } from "@typeberry/lib";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CodecInput } from "./CodecInput";
import { Json } from "./Json";
import { Resizable } from "./Resizable/Resizable";
import { ALL_CHAIN_SPECS, kinds } from "./constants";
import { TEST_HEADER } from "./examples/header";

export function Codec() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState(TEST_HEADER);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState("Block");
  const [result, setResult] = useState("");
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
    setInput(validData);
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
    updateUrlParams(newKind, chainSpec, input);
  };

  const handleSetChainSpec = (newChainSpec: string) => {
    setChainSpec(newChainSpec);
    updateUrlParams(kind, newChainSpec, input);
  };

  const handleSetInput = (newInput: string) => {
    setInput(newInput);
    updateUrlParams(kind, chainSpec, newInput);
  };

  useEffect(() => {
    try {
      const kindDescriptor = kinds.find((v) => v.name === kind);
      if (!kindDescriptor) {
        throw new Error(`Invalid codec kind: ${kind}`);
      }
      const spec = ALL_CHAIN_SPECS.find((x) => x.name === chainSpec);
      const decoded = codec.Decoder.decodeObject<unknown>(
        kindDescriptor.clazz.Codec,
        bytes.BytesBlob.parseBlob(input),
        spec?.spec,
      );
      setResult(
        JSON.stringify(
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
        ),
      );
      setError(null);
    } catch (e) {
      setResult("");
      setError(`${e}`);
    }
  }, [input, kind, chainSpec]);

  return (
    <Resizable
      left={
        <CodecInput
          onChange={handleSetInput}
          value={input}
          error={error}
          kind={kind}
          setKind={handleSetKind}
          chainSpec={chainSpec}
          setChainSpec={handleSetChainSpec}
        />
      }
      right={<Json result={result} />}
    />
  );
}
