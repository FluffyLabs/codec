import { config } from "@typeberry/lib";

export const stateExampleSpec = config.tinyChainSpec;
export const coresCount = Number(stateExampleSpec.coresCount);
export const epochLength = Number(stateExampleSpec.epochLength);
export const validatorsCount = Number(stateExampleSpec.validatorsCount);
