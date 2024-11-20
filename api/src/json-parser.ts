import { bytes } from "@typeberry/block";
import { isBigIntString } from "./number-utils";

export function parse(json: string) {
  return JSON.parse(json, (_key, value) => {
    if (typeof value === "string" && value.startsWith("0x")) {
      return bytes.Bytes.parseBytes(value, value.length / 2 - 1);
    }

    if (typeof value === "string" && isBigIntString(value)) {
      return BigInt(value);
    }

    return value;
  });
}

export function serialize<T>(object: T) {
  return JSON.stringify(object, (_key, value) => {
    if (value instanceof bytes.BytesBlob) {
      return value.toString();
    }
    if (value instanceof bytes.Bytes) {
      return value.toString();
    }
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}
