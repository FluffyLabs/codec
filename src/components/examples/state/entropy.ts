import { collections, type config, type state } from "@typeberry/lib";

import { filledHash } from "../objects/helpers";

const ENTROPY_ENTRIES = 4 as state.ENTROPY_ENTRIES;

export const entropyExample = (_spec?: config.ChainSpec) =>
  collections.FixedSizeArray.fill((index) => filledHash(50 + index), ENTROPY_ENTRIES);
