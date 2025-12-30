import { collections, type config, state } from "@typeberry/lib";

import { filledHash } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

const makePool = (...seeds: number[]) => collections.asKnownSize(seeds.map((seed) => filledHash(seed)));

export const authPoolsExample = (spec?: config.ChainSpec): state.PerCore<state.AuthorizationPool> =>
  state.tryAsPerCore(
    Array.from({ length: getStateDimensions(spec).coresCount }, (_, index) =>
      makePool(index + 1, index + 2, index + 3),
    ),
    resolveStateSpec(spec),
  );
