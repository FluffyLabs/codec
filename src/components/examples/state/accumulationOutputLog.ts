import * as collections from "@typeberry/lib/collections";
import type * as config from "@typeberry/lib/config";
import * as state from "@typeberry/lib/state";

import { filledHash, serviceId } from "../objects/helpers";

export const accumulationOutputLogExample = (
  _spec?: config.ChainSpec,
): collections.SortedArray<state.AccumulationOutput> =>
  collections.SortedArray.fromArray(state.accumulationOutputComparator, [
    state.AccumulationOutput.create({
      serviceId: serviceId(5),
      output: filledHash(70),
    }),
    state.AccumulationOutput.create({
      serviceId: serviceId(6),
      output: filledHash(71),
    }),
  ]);
