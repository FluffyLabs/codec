import { WithTooltip } from "@fluffylabs/shared-ui";
import { useMemo } from "react";
import { calculateDiff, type DiffResult } from "../utils/diff";

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
              <WithTooltip key={key} help={`Before: ${segment.oldContent}\nAfter: ${segment.content}`}>
                <span className="bg-yellow-200 dark:bg-yellow-800">{segment.content}</span>
              </WithTooltip>
            );
          }

          if (segment.type === "removed") {
            return (
              <WithTooltip key={key} help={`Removed: ${segment.content}`}>
                <span className="bg-red-200 dark:bg-red-800">•</span>
              </WithTooltip>
            );
          }

          if (segment.type === "added") {
            return (
              <WithTooltip key={key} help={`Added: ${segment.content}`}>
                <span className="bg-green-200 dark:bg-green-800">{segment.content}</span>
              </WithTooltip>
            );
          }

          return null;
        })}
      </Component>
    </div>
  );
}
