import type { config } from "@typeberry/lib";

import { createValidatorDataSet } from "./validatorSets";

export const currentValidatorsExample = (spec?: config.ChainSpec): ReturnType<typeof createValidatorDataSet> =>
  createValidatorDataSet(20, spec);
