import { DiffHighlight } from "./DiffHighlight";
import { Checkbox } from "./ui/Checkbox";
import { Textarea } from "./ui/Textarea";

type JsonProps = {
  value: string;
  previousValue: string | null;
  isJsonEditable: boolean;
  setIsJsonEditable: (editable: boolean) => void;
  onJsonChange: (json: string) => void;
  error: string | null;
  isDiffEnabled: boolean;
};

export function Json({
  value,
  previousValue,
  isJsonEditable,
  setIsJsonEditable,
  onJsonChange,
  error,
  isDiffEnabled,
}: JsonProps) {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex justify-start">
        <Checkbox
          label="JSON"
          checked={isJsonEditable}
          onChange={(e) => setIsJsonEditable(e.target.checked)}
          disabled={!isJsonEditable && error !== null}
        />
      </div>
      {isJsonEditable ? (
        <Textarea
          className="flex-1 font-mono bg-[#ddd] dark:bg-secondary overflow-x-auto break-keep whitespace-pre"
          onChange={(ev) => onJsonChange(ev.target.value)}
          value={value}
        />
      ) : (
        <div className="flex-1 overflow-y-scroll overflow-x-auto p-2 bg-[#ddd] dark:bg-secondary rounded-sm text-sm">
          <DiffHighlight value={value} previousValue={previousValue} isEnabled={isDiffEnabled} />
        </div>
      )}
      {error && isJsonEditable && (
        <div className="p-4 font-mono border-destructive rounded-sm border-1 border-destructive text-red-500 bg-destructive/40">
          {error}
        </div>
      )}
    </div>
  );
}
