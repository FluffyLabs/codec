export function areArraysEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  const sorted1 = [...array1].sort();
  const sorted2 = [...array2].sort();

  return sorted1.every((value, index) => value === sorted2[index]);
}
