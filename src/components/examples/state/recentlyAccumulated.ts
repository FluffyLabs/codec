import { block, collections, type config, type state } from "@typeberry/lib";

import { filledHash } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

export const recentlyAccumulatedExample = (spec?: config.ChainSpec): state.RecentlyAccumulated => {
  const resolvedSpec = resolveStateSpec(spec);
  const { epochLength } = getStateDimensions(resolvedSpec);

  return block.tryAsPerEpochBlock(
    Array.from({ length: epochLength }, (_, index) =>
      index === 0 ? collections.HashSet.from([filledHash(250)]) : collections.HashSet.new(),
    ),
    resolvedSpec,
  );
};
