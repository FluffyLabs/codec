import { Checkbox } from "./ui/Checkbox";
import { Textarea } from "./ui/Textarea";

type JsonProps = {
  result: string;
  isJsonEditable: boolean;
  setIsJsonEditable: (editable: boolean) => void;
  onJsonChange: (json: string) => void;
  error: string | null;
};

export function Json({ result, isJsonEditable, setIsJsonEditable, onJsonChange, error }: JsonProps) {
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex justify-start">
        <Checkbox label="JSON" checked={isJsonEditable} onChange={(e) => setIsJsonEditable(e.target.checked)} />
      </div>
      {isJsonEditable ? (
        <Textarea
          className="flex-1 font-mono bg-[#ddd] dark:bg-secondary"
          onChange={(ev) => onJsonChange(ev.target.value)}
          value={result}
        />
      ) : (
        <div className="flex-1 overflow-y-scroll overflow-x-auto p-4 m-4 bg-[#ddd] dark:bg-secondary">
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
