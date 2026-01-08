import type * as config from "@typeberry/lib/config";

import { createValidatorDataSet } from "./validatorSets";

export const previousValidatorsExample = (spec?: config.ChainSpec): ReturnType<typeof createValidatorDataSet> =>
  createValidatorDataSet(40, spec);
