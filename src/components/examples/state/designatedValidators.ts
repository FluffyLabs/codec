import { createValidatorDataSet } from "./validatorSets";

import { block, state } from "@typeberry/lib";
import { createValidatorDataSet } from "./validatorSets";

export const designatedValidatorsExample: block.PerValidator<state.ValidatorData> = createValidatorDataSet(1);
