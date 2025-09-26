import { DiffHighlight } from "./DiffHighlight";
import { Checkbox } from "./ui/Checkbox";
import { Textarea } from "./ui/Textarea";

type JsonProps = {
  result: string;
  isJsonEditable: boolean;
  setIsJsonEditable: (editable: boolean) => void;
  onJsonChange: (json: string) => void;
  error: string | null;
  isDiffEnabled: boolean;
  previousValue: string;
};

export function Json({
  result,
  isJsonEditable,
  setIsJsonEditable,
  onJsonChange,
  error,
  isDiffEnabled,
  previousValue,
}: JsonProps) {
  console.log("Json debug DETAILED:", {
    isJsonEditable,
    isDiffEnabled,
    previousValue: `${previousValue?.substring(0, 50)}...`,
    previousValueLength: previousValue?.length,
    resultLength: result?.length,
    conditionCheck: isDiffEnabled && previousValue,
    previousValueTruthy: !!previousValue,
    shouldUseDiff: !isJsonEditable && isDiffEnabled && previousValue,
    renderPath: isJsonEditable ? "textarea" : (isDiffEnabled && previousValue ? "diff" : "plain"),
    valuesEqual: previousValue === result,
    previousValueEnd: previousValue?.substring(previousValue.length - 50),
    resultEnd: result?.substring(result.length - 50),
  });

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
          className="flex-1 font-mono bg-[#ddd] dark:bg-secondary"
          onChange={(ev) => onJsonChange(ev.target.value)}
          value={result}
        />
      ) : isDiffEnabled && previousValue ? (
        <div className="flex-1 overflow-y-scroll overflow-x-auto p-2 bg-[#ddd] dark:bg-secondary rounded-sm">
          <DiffHighlight currentText={result} previousText={previousValue} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-scroll overflow-x-auto p-2 bg-[#ddd] dark:bg-secondary rounded-sm">
          <pre>{result}</pre>
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
