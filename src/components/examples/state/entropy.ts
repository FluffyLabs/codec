import * as collections from "@typeberry/lib/collections";
import type * as config from "@typeberry/lib/config";
import type * as state from "@typeberry/lib/state";

import { filledHash } from "../objects/helpers";

const ENTROPY_ENTRIES = 4 as state.ENTROPY_ENTRIES;

export const entropyExample = (_spec?: config.ChainSpec) =>
  collections.FixedSizeArray.fill((index) => filledHash(50 + index), ENTROPY_ENTRIES);
