export function isBigIntString(value: string) {
  if (typeof value === "string" && /^\-?\d+$/.test(value)) {
    try {
      BigInt(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}
