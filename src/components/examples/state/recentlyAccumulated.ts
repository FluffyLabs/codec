import * as block from "@typeberry/lib/block";
import * as collections from "@typeberry/lib/collections";
import type * as config from "@typeberry/lib/config";
import type * as state from "@typeberry/lib/state";

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
