import { block, type config, state } from "@typeberry/lib";

import { serviceGas, serviceId, u16, u32 } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

const makeValidatorStats = (seed: number) =>
  state.ValidatorStatistics.create({
    blocks: u32(seed * 2),
    tickets: u32(seed),
    preImages: u32(seed + 1),
    preImagesSize: u32(seed * 3),
    guarantees: u32(seed + 2),
    assurances: u32(seed + 3),
  });

const makeCoreStats = (seed: number) =>
  state.CoreStatistics.create({
    dataAvailabilityLoad: u32(seed * 4),
    popularity: u16(seed),
    imports: u16(seed + 1),
    exports: u16(seed + 2),
    extrinsicSize: u32(seed * 128),
    extrinsicCount: u16(seed + 3),
    bundleSize: u32(seed * 64),
    gasUsed: serviceGas(BigInt(seed) * 1_000n),
  });

const makeServiceStats = (seed: number) =>
  state.ServiceStatistics.create({
    providedCount: u16(seed),
    providedSize: u32(seed * 10),
    refinementCount: u32(seed + 4),
    refinementGasUsed: serviceGas(BigInt(seed) * 500n),
    imports: u16(seed + 2),
    exports: u16(seed + 3),
    extrinsicSize: u32(seed * 16),
    extrinsicCount: u16(seed + 1),
    accumulateCount: u32(seed + 5),
    accumulateGasUsed: serviceGas(BigInt(seed) * 700n),
    onTransfersCount: u32(seed),
    onTransfersGasUsed: serviceGas(BigInt(seed) * 100n),
  });

export const statisticsExample = (spec?: config.ChainSpec): state.StatisticsData => {
  const resolvedSpec = resolveStateSpec(spec);
  const { validatorsCount, coresCount } = getStateDimensions(resolvedSpec);

  const validatorStatsSet = (offset: number) =>
    block.tryAsPerValidator(
      Array.from({ length: validatorsCount }, (_, index) => makeValidatorStats(offset + index)),
      resolvedSpec,
    );

  const coreStats = Array.from({ length: coresCount }, (_, index) => makeCoreStats(index + 1));

  return state.StatisticsData.create({
    current: validatorStatsSet(1),
    previous: validatorStatsSet(10),
    cores: state.tryAsPerCore(coreStats, resolvedSpec),
    services: new Map([
      [serviceId(80), makeServiceStats(1)],
      [serviceId(90), makeServiceStats(2)],
    ]),
  });
};
