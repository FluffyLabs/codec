import { Button } from "@fluffylabs/shared-ui";
import { bytes } from "@typeberry/lib";
import { UploadIcon } from "lucide-react";
import { useCallback } from "react";
import { ChainSpecSelect } from "./ChainSpecSelect";
import { ALL_CHAIN_SPECS, type KindName, kinds } from "./constants";
import { JamObjectSelect } from "./JamObjectSelect";

type ControlsProps = {
  onChange: (v: string) => void;
  kind: KindName;
  setKind: (name: KindName) => void;
  chainSpec: string;
  setChainSpec: (idx: string) => void;
};

export function Controls({ onChange, setKind, kind, setChainSpec, chainSpec }: ControlsProps) {
  const loadExample = useCallback(() => {
    const kindDescriptor = kinds.find((v) => v.name === kind);
    if (!kindDescriptor || kindDescriptor.example == null) {
      return;
    }

    if (typeof kindDescriptor.example === "string") {
      onChange(kindDescriptor.example);
      return;
    }

    try {
      const spec = ALL_CHAIN_SPECS.find((x) => x.name === chainSpec)?.spec;
      const encoded = kindDescriptor.encode(kindDescriptor.example, spec);
      onChange(encoded.toString());
    } catch (error) {
      console.error("Failed to encode example", error);
    }
  }, [chainSpec, kind, onChange]);

  const load = useCallback(() => {
    const $input = document.createElement("input");
    $input.type = "file";
    $input.accept = ".bin";
    $input.click();
    $input.addEventListener("change", (ev) => {
      const target = ev.target as HTMLInputElement | null;
      const file = target?.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target?.result as ArrayBuffer;
          onChange(bytes.BytesBlob.blobFrom(new Uint8Array(fileContent)).toString());
        };

        reader.readAsArrayBuffer(file);
      }
    });
  }, [onChange]);

  return (
    <>
      <div className="flex flex-row justify-between gap-4 overflow-auto">
        <JamObjectSelect setKind={setKind} kind={kind} />
        <ChainSpecSelect setChainSpec={setChainSpec} chainSpec={chainSpec} />
      </div>
      <div className="flex flex-row justify-between gap-4 overflow-auto">
        <Button variant="secondary" onClick={load}>
          <UploadIcon className="mr-2" />
          From file
        </Button>
        <Button
          variant="tertiary"
          intent="neturalSoft"
          onClick={loadExample}
          disabled={!kinds.find((v) => v.name === kind)?.example}
        >
          Example {kind}
        </Button>
      </div>
    </>
  );
}
