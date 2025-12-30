import { block, collections } from "@typeberry/lib";
import { filledHash } from "../objects/helpers";
import { epochLength, stateExampleSpec } from "./common";

export const recentlyAccumulatedExample: object = block.tryAsPerEpochBlock(
  Array.from({ length: epochLength }, (_, index) =>
    index === 0 ? collections.HashSet.from([filledHash(250)]) : collections.HashSet.new(),
  ),
  stateExampleSpec,
);
