import { type config, numbers } from "@typeberry/lib";

const { tryAsU8, tryAsU16, tryAsU32, tryAsU64 } = numbers;

export type NumericExamples = {
  u8: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU8>;
  u16: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU16>;
  u24: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU32>;
  u32: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU32>;
  varU32: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU32>;
  varU64: (spec?: config.ChainSpec) => ReturnType<typeof tryAsU64>;
  i8: (spec?: config.ChainSpec) => number;
  i16: (spec?: config.ChainSpec) => number;
  i24: (spec?: config.ChainSpec) => number;
  i32: (spec?: config.ChainSpec) => number;
};

export const numericExamples: NumericExamples = {
  u8: () => tryAsU8(200),
  u16: () => tryAsU16(65_000),
  u24: () => tryAsU32(16_777_215),
  u32: () => tryAsU32(4_081_632_653),
  varU32: () => tryAsU32(123_456_789),
  varU64: () => tryAsU64(18_446_744_073_709_551n),
  i8: () => -42,
  i16: () => -32_000,
  i24: () => -5_000_000,
  i32: () => -2_000_000_000,
};
