import * as bytes from "@typeberry/lib/bytes";
import * as codec from "@typeberry/lib/codec";
import { describe, expect, it } from "vitest";

import { ALL_CHAIN_SPECS, kinds } from "../components/constants";

const replacer = (_key: string, value: unknown) => {
  if (value instanceof codec.ObjectView) {
    return value.materialize();
  }
  if (value instanceof codec.SequenceView) {
    return value.map((v) => v.materialize());
  }
  if (value instanceof bytes.BytesBlob) {
    return value.toString();
  }
  if (value instanceof bytes.Bytes) {
    return value.toString();
  }
  if (value instanceof Map) {
    return Object.fromEntries(value.entries());
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

describe("STF Vector JSON serialization regression", () => {
  const stfVectorKind = kinds.find((k) => k.name === "STF Vector");
  if (!stfVectorKind) throw new Error("STF Vector kind not found");

  ALL_CHAIN_SPECS.forEach(({ name, spec }) => {
    it(`decoded STF Vector is JSON-serializable (${name})`, () => {
      const example = stfVectorKind.example(spec);
      const encoded = stfVectorKind.encode(example, spec);
      const decoded = stfVectorKind.decode(encoded, spec);
      expect(() => JSON.stringify(decoded, replacer, 2)).not.toThrow();
    });
  });
});
