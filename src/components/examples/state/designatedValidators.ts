import type { block, config, state } from "@typeberry/lib";

import { createValidatorDataSet } from "./validatorSets";

export const designatedValidatorsExample = (spec?: config.ChainSpec): block.PerValidator<state.ValidatorData> =>
  createValidatorDataSet(1, spec);
