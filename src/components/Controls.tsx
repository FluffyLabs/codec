import { Button, ButtonGroup } from "@fluffylabs/shared-ui";
import { bytes } from "@typeberry/lib";
import { UploadIcon } from "lucide-react";
import { useCallback } from "react";
import { ChainSpecSelect } from "./ChainSpecSelect";
import { JamObjectSelect } from "./JamObjectSelect";
import { blockKind, headerKind, kinds } from "./constants";
import { TEST_BLOCK } from "./examples/block";
import { TEST_HEADER } from "./examples/header";

type ControlsProps = {
  onChange: (v: string) => void;
  kind: string;
  setKind: (name: string) => void;
  chainSpec: string;
  setChainSpec: (idx: string) => void;
};

export function Controls({ onChange, setKind, kind, setChainSpec, chainSpec }: ControlsProps) {
  const setBlock = useCallback(() => {
    onChange(TEST_BLOCK);
    setKind(kinds.find((v) => v === blockKind)?.name ?? "Block");
  }, [onChange, setKind]);

  const setHeader = useCallback(() => {
    onChange(TEST_HEADER);
    setKind(kinds.find((v) => v === headerKind)?.name ?? "Header");
  }, [onChange, setKind]);

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
        <Button onClick={load}>
          <UploadIcon className="mr-2" />
          From file
        </Button>
        <ButtonGroup>
          <Button variant="outline" onClick={setBlock}>
            Block Example
          </Button>
          <Button variant="outline" onClick={setHeader}>
            Header Example
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
