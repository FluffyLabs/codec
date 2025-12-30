import type { config } from "@typeberry/lib";

import { createValidatorDataSet } from "./validatorSets";

export const previousValidatorsExample = (spec?: config.ChainSpec): ReturnType<typeof createValidatorDataSet> =>
  createValidatorDataSet(40, spec);
