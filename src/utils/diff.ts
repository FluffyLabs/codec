export interface DiffSegment {
  type: "unchanged" | "added" | "removed";
  content: string;
  position: number;
}

export interface DiffResult {
  segments: DiffSegment[];
  hasChanges: boolean;
}

export function calculateDiff(oldText: string, newText: string): DiffResult {
  if (oldText === newText) {
    return {
      segments: [{ type: "unchanged", content: newText, position: 0 }],
      hasChanges: false,
    };
  }

  const segments: DiffSegment[] = [];
  let oldIndex = 0;
  let newIndex = 0;
  let position = 0;

  while (oldIndex < oldText.length || newIndex < newText.length) {
    if (oldIndex >= oldText.length) {
      segments.push({
        type: "added",
        content: newText.slice(newIndex),
        position,
      });
      break;
    }

    if (newIndex >= newText.length) {
      segments.push({
        type: "removed",
        content: oldText.slice(oldIndex),
        position,
      });
      break;
    }

    if (oldText[oldIndex] === newText[newIndex]) {
      const matchStart = newIndex;
      while (oldIndex < oldText.length && newIndex < newText.length && oldText[oldIndex] === newText[newIndex]) {
        oldIndex++;
        newIndex++;
      }
      segments.push({
        type: "unchanged",
        content: newText.slice(matchStart, newIndex),
        position,
      });
      position = newIndex;
    } else {
      let oldEnd = oldIndex;
      let newEnd = newIndex;

      while (oldEnd < oldText.length && newEnd < newText.length) {
        if (oldText[oldEnd] === newText[newEnd]) {
          break;
        }
        oldEnd++;
        newEnd++;
      }

      if (oldEnd > oldIndex) {
        segments.push({
          type: "removed",
          content: oldText.slice(oldIndex, oldEnd),
          position,
        });
      }

      if (newEnd > newIndex) {
        segments.push({
          type: "added",
          content: newText.slice(newIndex, newEnd),
          position,
        });
        position = newEnd;
      }

      oldIndex = oldEnd;
      newIndex = newEnd;
    }
  }

  return {
    segments,
    hasChanges: true,
  };
}
