import { Button, ButtonGroup, cn } from "@fluffylabs/shared-ui";
import { bytes } from "@typeberry/lib";
import { UploadIcon } from "lucide-react";
import { useCallback } from "react";
import { ChainSpecSelect } from "./ChainSpecSelect";
import { DiffHighlight } from "./DiffHighlight";
import { JamObjectSelect } from "./JamObjectSelect";
import { KindFinder } from "./KindFinder";
import { blockKind, headerKind, kinds } from "./constants";
import { TEST_BLOCK } from "./examples/block";
import { TEST_HEADER } from "./examples/header";
import { Checkbox } from "./ui/Checkbox";
import { Textarea } from "./ui/Textarea";

type CodecInputProps = {
  onChange: (v: string) => void;
  value: string;
  error: string | null;
  kind: string;
  setKind: (name: string) => void;
  chainSpec: string;
  setChainSpec: (idx: string) => void;
  isBytesEditable: boolean;
  setIsBytesEditable: (editable: boolean) => void;
  isDiffEnabled: boolean;
  previousValue: string;
};

export function CodecInput({
  onChange,
  value,
  error,
  kind,
  setKind,
  chainSpec,
  setChainSpec,
  isBytesEditable,
  setIsBytesEditable,
  isDiffEnabled,
  previousValue,
}: CodecInputProps) {
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

  const isValid = !isBytesEditable || error === null;

  return (
    <div className="w-full flex flex-col p-4 gap-4 overflow-auto">
      <div className="flex justify-end mb-2">
        <Checkbox
          label="Bytes"
          checked={isBytesEditable}
          onChange={(e) => setIsBytesEditable(e.target.checked)}
          disabled={!isBytesEditable && error !== null}
        />
      </div>
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
      {isBytesEditable ? (
        <Textarea
          className={cn(
            {
              "ring-2 ring-red-700": !isValid,
            },
            "flex-1 font-mono bg-[#ddd] dark:bg-secondary",
          )}
          onChange={(ev) => onChange(ev.target.value)}
          value={value}
        />
      ) : isDiffEnabled && previousValue ? (
        <div
          className={cn(
            {
              "ring-2 ring-red-700": !isValid,
            },
            "flex-1 font-mono bg-[#ddd] dark:bg-secondary rounded-sm p-2 overflow-y-scroll overflow-x-auto",
          )}
        >
          <DiffHighlight currentText={value} previousText={previousValue} />
        </div>
      ) : (
        <Textarea
          className={cn(
            {
              "ring-2 ring-red-700": !isValid,
            },
            "flex-1 font-mono bg-[#ddd] dark:bg-secondary",
          )}
          value={value}
          readOnly={true}
        />
      )}

      {!isValid && <KindFinder value={value} chainSpec={chainSpec} setKind={setKind} />}

      {!isValid && (
        <div className="p-4 font-mono border-destructive rounded-sm border-1 border-destructive text-red-500 bg-destructive/40">
          {error}
        </div>
      )}
    </div>
  );
}
