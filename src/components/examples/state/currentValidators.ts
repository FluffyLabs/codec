import type * as config from "@typeberry/lib/config";

import { createValidatorDataSet } from "./validatorSets";

export const currentValidatorsExample = (spec?: config.ChainSpec): ReturnType<typeof createValidatorDataSet> =>
  createValidatorDataSet(20, spec);
