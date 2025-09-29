import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { type DiffResult, calculateDiff } from "../utils/diff";

interface DiffHighlightProps {
  component?: "div" | "pre";
  isEnabled: boolean;
  value: string;
  previousValue: string | null;
  className?: string;
}

export function DiffHighlight({
  component = "pre",
  isEnabled,
  value,
  previousValue,
  className = "",
}: DiffHighlightProps) {
  const diffResult: DiffResult = useMemo(() => {
    return isEnabled && previousValue !== null && previousValue !== ""
      ? calculateDiff(previousValue, value)
      : { hasChanges: false, segments: [] };
  }, [isEnabled, previousValue, value]);

  if (value === null) {
    return null;
  }

  const Component = component;

  if (!diffResult.hasChanges) {
    return (
      <div className={className}>
        <Component>{value}</Component>
      </div>
    );
  }

  return (
    <div className={className}>
      <Component>
        {diffResult.segments.map((segment, index) => {
          const key = `${segment.type}-${index}-${segment.position}`;

          if (segment.type === "unchanged") {
            return <span key={key}>{segment.content}</span>;
          }

          if (segment.type === "changed") {
            return (
              <span key={key}>
                <span
                  className="bg-yellow-200 dark:bg-yellow-800"
                  data-tooltip-id={`diff-tooltip-${key}`}
                  data-tooltip-content={`Before: ${segment.oldContent}\nAfter: ${segment.content}`}
                >
                  {segment.content}
                </span>
                <Tooltip
                  id={`diff-tooltip-${key}`}
                  place="top"
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    fontSize: "12px",
                    wordBreak: "break-all",
                    whiteSpace: "pre",
                  }}
                />
              </span>
            );
          }

          if (segment.type === "removed") {
            return (
              <span key={key}>
                <span
                  className="bg-red-200 dark:bg-red-800"
                  data-tooltip-id={`diff-tooltip-${key}`}
                  data-tooltip-content={`Removed: ${segment.content}`}
                >
                  •
                </span>
                <Tooltip
                  id={`diff-tooltip-${key}`}
                  place="top"
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    fontSize: "12px",
                    wordBreak: "break-all",
                  }}
                />
              </span>
            );
          }

          if (segment.type === "added") {
            return (
              <span key={key}>
                <span
                  className="bg-green-200 dark:bg-green-800"
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
                    wordBreak: "break-all",
                  }}
                />
              </span>
            );
          }

          return null;
        })}
      </Component>
    </div>
  );
}
