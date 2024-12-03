import assert from "node:assert";
import fs from "node:fs";
import { describe, it } from "node:test";
import { parse } from "yaml";

import { kindNames } from "./kinds";

const rawApiConfig = fs.readFileSync(`${__dirname}/../api.yaml`, "utf8");
const apiConfig = parse(rawApiConfig);

function areArraysEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  const sorted1 = [...array1].sort();
  const sorted2 = [...array2].sort();

  return sorted1.every((value, index) => value === sorted2[index]);
}

function arrayDiff(array1: string[], array2: string[]): string[] {
  const set2 = new Set(array2);
  return array1.filter((item) => !set2.has(item));
}

describe("Codec types validation", () => {
  for (const [path, pathConfig] of Object.entries(apiConfig.paths)) {
    for (const properties of Object.values(pathConfig)) {
      if (!properties.parameters) {
        continue;
      }
      for (const param of properties.parameters) {
        if (param.description === "Type name" && param.in === "path") {
          it(`should verify that the type lists in 'kinds.ts' and 'api.yaml' match for the endpoint: ${path}`, () => {
            const areListEqual = areArraysEqual(param.schema.enum, kindNames);
            const diff = arrayDiff(param.schema.enum, kindNames);

            assert.deepStrictEqual(diff, []); // check difference in values
            assert.strictEqual(areListEqual, true); // check duplicates
          });
        }
      }
    }
  }
});
