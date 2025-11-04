import { Textarea, cn } from "@fluffylabs/shared-ui";
import { DiffHighlight } from "./DiffHighlight";
import { KindFinder } from "./KindFinder";
import { Checkbox } from "./ui/Checkbox";

type CodecInputProps = {
  onChange: (v: string) => void;
  value: string;
  previousValue: string | null;
  error: string | null;
  isBytesEditable: boolean;
  setIsBytesEditable: (editable: boolean) => void;
  isDiffEnabled: boolean;
  setKind: (name: string) => void;
  chainSpec: string;
  controls: React.ReactNode;
};

export function CodecInput({
  onChange,
  value,
  previousValue,
  error,
  isBytesEditable,
  setIsBytesEditable,
  isDiffEnabled,
  chainSpec,
  setKind,
  controls,
}: CodecInputProps) {
  const isValid = !isBytesEditable || error === null;

  return (
    <div className="w-full flex flex-col p-4 gap-4 overflow-auto">
      <div className="flex justify-end mb-2">
        <Checkbox
          label="Bytes"
          checked={isBytesEditable}
          onChange={(e) => setIsBytesEditable(e.target.checked)}
          disabled={isBytesEditable || error !== null}
        />
      </div>

      {controls}

      {isBytesEditable ? (
        <Textarea
          className={cn(
            {
              "ring-2 ring-red-700": !isValid,
            },
            "flex-1 font-mono bg-[#eee] dark:bg-secondary",
          )}
          onChange={(ev) => onChange(ev.target.value)}
          value={value}
        />
      ) : (
        <div
          className={cn(
            "flex-1 font-mono bg-[#eee] dark:bg-secondary rounded-sm p-2 overflow-x-none overflow-y-auto text-sm",
          )}
        >
          <DiffHighlight
            component="div"
            className="break-all"
            value={value}
            previousValue={previousValue}
            isEnabled={isDiffEnabled}
          />
        </div>
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
