export interface DiffSegment {
  type: "unchanged" | "added" | "removed" | "changed";
  content: string;
  position: number;
  oldContent?: string; // For changed segments, store the original content
}

export interface DiffResult {
  segments: DiffSegment[];
  hasChanges: boolean;
}

export function calculateDiff(oldValue: string, newValue: string): DiffResult {
  const maxLength = Math.max(oldValue.length, newValue.length);
  const segments: DiffSegment[] = [];

  let i = 0;
  while (i < maxLength) {
    const oldChar = oldValue[i] || "";
    const newChar = newValue[i] || "";

    if (oldChar === newChar && oldChar !== "") {
      // Characters are the same - collect all consecutive same characters
      let sameText = oldChar;
      i++;
      while (i < maxLength && oldValue[i] === newValue[i] && oldValue[i]) {
        sameText += oldValue[i];
        i++;
      }
      segments.push({ content: sameText, type: "unchanged", position: i });
    } else {
      // Characters are different - collect consecutive changes
      let removedText = "";
      let addedText = "";

      // Collect consecutive different characters
      while (i < maxLength && (oldValue[i] || "") !== (newValue[i] || "")) {
        if (oldValue[i]) removedText += oldValue.substring(i, i + 2);
        if (newValue[i]) addedText += newValue.substring(i, i + 2);
        i += 2;
      }

      const actuallyRemoved = removedText.substring(addedText.length);
      const actuallyAdded = addedText.substring(removedText.length);

      // changed
      const changedLength = Math.min(removedText.length, addedText.length);
      const after = addedText.substring(0, changedLength);
      const before = removedText.substring(0, changedLength);

      if (changedLength > 0) {
        segments.push({ content: after, oldContent: before, type: "changed", position: i });
      }

      if (actuallyRemoved.length > 0) {
        segments.push({ content: actuallyRemoved, type: "removed", position: i });
      }
      if (actuallyAdded.length > 0) {
        segments.push({ content: addedText, type: "added", position: i });
      }
    }
  }

  return {
    segments,
    hasChanges: segments.length > 1,
  };

  //
  // return parts.map((part, index) => {
  //   const className = part.type === 'removed'
  //     ? 'bg-red-200 dark:bg-red-900/60 text-red-900 dark:text-red-100'
  //     : part.type === 'added'
  //     ? 'bg-green-200 dark:bg-green-900/60 text-green-900 dark:text-green-100'
  //     : '';
  //
  //   return (
  //     <span key={index} className={className}>
  //       {part.text}
  //     </span>
  //   );
  // });
}
