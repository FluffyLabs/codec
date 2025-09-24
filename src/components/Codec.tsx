import { bytes, codec } from "@typeberry/lib";
import { useEffect, useState } from "react";
import { CodecInput } from "./CodecInput";
import { Json } from "./Json";
import { Resizable } from "./Resizable/Resizable";
import { ALL_CHAIN_SPECS, kinds } from "./constants";
import { TEST_HEADER } from "./examples/header";

export function Codec() {
  const getInitialState = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const urlKind = urlParams.get("kind");
    const validKind = urlKind && kinds.find((k) => k.name === urlKind) ? urlKind : "Block";

    const urlFlavor = urlParams.get("flavor");
    const validChainSpec =
      urlFlavor && ["tiny", "full"].includes(urlFlavor.toLowerCase())
        ? urlFlavor.toLowerCase() === "tiny"
          ? "Tiny"
          : "Full"
        : "Tiny";

    const urlData = urlParams.get("data");
    const validData = urlData || TEST_HEADER;

    return {
      kind: validKind,
      chainSpec: validChainSpec,
      input: validData,
    };
  };

  const initialState = getInitialState();

  const [input, setInput] = useState(initialState.input);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState(initialState.kind);
  const [result, setResult] = useState("");
  const [chainSpec, setChainSpec] = useState(initialState.chainSpec);

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
          onChange={setInput}
          value={input}
          error={error}
          kind={kind}
          setKind={setKind}
          chainSpec={chainSpec}
          setChainSpec={setChainSpec}
        />
      }
      right={<Json result={result} />}
    />
  );
}
