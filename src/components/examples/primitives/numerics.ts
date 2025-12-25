import { numbers } from "@typeberry/lib";

const { tryAsU8, tryAsU16, tryAsU32, tryAsU64 } = numbers;

export type NumericExamples = {
  u8: number;
  u16: number;
  u24: number;
  u32: number;
  varU32: number;
  varU64: bigint;
  i8: number;
  i16: number;
  i24: number;
  i32: number;
};

export const numericExamples: NumericExamples = {
  u8: tryAsU8(200),
  u16: tryAsU16(65_000),
  u24: tryAsU32(16_777_215),
  u32: tryAsU32(4_081_632_653),
  varU32: tryAsU32(123_456_789),
  varU64: tryAsU64(18_446_744_073_709_551n),
  i8: -42,
  i16: -32_000,
  i24: -5_000_000,
  i32: -2_000_000_000,
};
