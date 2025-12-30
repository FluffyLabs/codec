import { bytes } from "@typeberry/lib";
import { describe, expect, it } from "vitest";

import { ALL_CHAIN_SPECS, kinds, tinyChainSpec } from "../components/constants";

describe("example fixtures", () => {
  ALL_CHAIN_SPECS.filter(({ name }) => name === tinyChainSpec.name).forEach(({ name: specName, spec }) => {
    describe(`chain spec: ${specName}`, () => {
      kinds.forEach((kind) => {
        it(`serializes ${kind.name}`, () => {
          expect(kind.example, `Missing example for ${kind.name}`).not.toBeNull();

          const example = kind.example;
          if (typeof example === "string") {
            expect(() => bytes.BytesBlob.parseBlob(example)).not.toThrow();
            return;
          }

          const encoded = kind.encode(example, spec);
          expect(encoded).toBeInstanceOf(bytes.BytesBlob);
          expect(() => kind.decode(encoded, spec)).not.toThrow();
        });
      });
    });
  });
});
