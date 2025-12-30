import { config } from "@typeberry/lib";

export const resolveStateSpec = (spec?: config.ChainSpec): config.ChainSpec => spec ?? config.tinyChainSpec;

export const getStateDimensions = (
  spec?: config.ChainSpec,
): {
  readonly coresCount: number;
  readonly epochLength: number;
  readonly validatorsCount: number;
} => {
  const resolved = resolveStateSpec(spec);
  return {
    coresCount: Number(resolved.coresCount),
    epochLength: Number(resolved.epochLength),
    validatorsCount: Number(resolved.validatorsCount),
  };
};
