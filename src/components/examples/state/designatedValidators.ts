import type * as block from "@typeberry/lib/block";
import type * as config from "@typeberry/lib/config";
import type * as state from "@typeberry/lib/state";

import { createValidatorDataSet } from "./validatorSets";

export const designatedValidatorsExample = (spec?: config.ChainSpec): block.PerValidator<state.ValidatorData> =>
  createValidatorDataSet(1, spec);
