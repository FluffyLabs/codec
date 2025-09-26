import { Tooltip } from "react-tooltip";
import { type DiffResult, calculateDiff } from "../utils/diff";

interface DiffHighlightProps {
  currentText: string;
  previousText: string;
  className?: string;
}

export function DiffHighlight({ currentText, previousText, className = "" }: DiffHighlightProps) {
  const diffResult: DiffResult = calculateDiff(previousText, currentText);

  if (!diffResult.hasChanges) {
    return <pre className={className}>{currentText}</pre>;
  }

  return (
    <div className={className}>
      <pre>
        {diffResult.segments.map((segment, index) => {
          const key = `${segment.type}-${index}-${segment.position}`;

          if (segment.type === "unchanged") {
            return <span key={key}>{segment.content}</span>;
          }

          if (segment.type === "added") {
            return (
              <span key={key}>
                <span
                  className="bg-yellow-200 dark:bg-yellow-800"
                  data-tooltip-id={`diff-tooltip-${key}`}
                  data-tooltip-content={`Added: ${segment.content}`}
                >
                  {segment.content}
                </span>
                <Tooltip
                  id={`diff-tooltip-${key}`}
                  place="top"
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    fontSize: "12px",
                    maxWidth: "300px",
                    wordBreak: "break-all",
                  }}
                />
              </span>
            );
          }

          if (segment.type === "removed") {
            return (
              <span key={key}>
                <span
                  className="bg-yellow-200 dark:bg-yellow-800"
                  data-tooltip-id={`diff-tooltip-${key}`}
                  data-tooltip-content={`Removed: ${segment.content}`}
                >
                  {/* Removed content is not displayed but tooltip shows what was removed */}
                </span>
                <Tooltip
                  id={`diff-tooltip-${key}`}
                  place="top"
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    fontSize: "12px",
                    maxWidth: "300px",
                    wordBreak: "break-all",
                  }}
                />
              </span>
            );
          }

          return null;
        })}
      </pre>
    </div>
  );
}
