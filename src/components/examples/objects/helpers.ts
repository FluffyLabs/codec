import { block, bytes, codec, collections, config, type crypto, numbers } from "@typeberry/lib";

export const exampleChainSpec: config.ChainSpec = config.tinyChainSpec;

export const asKnownSize = collections.asKnownSize;
export const FixedSizeArray = collections.FixedSizeArray;

export const bytesBlobFrom = (text: string): bytes.BytesBlob => bytes.BytesBlob.blobFromString(text);

export const zeroHash = () => bytes.Bytes.zero(32).asOpaque();

export const filledHash = (value: number) => bytes.Bytes.fill(32, value).asOpaque();

export const ed25519Key = (value: number): crypto.Ed25519Key => bytes.Bytes.fill(32, value).asOpaque();
export const ed25519Signature = (value: number): crypto.Ed25519Signature => bytes.Bytes.fill(64, value).asOpaque();

export const bandersnatchKey = (value: number): crypto.BandersnatchKey => bytes.Bytes.fill(32, value).asOpaque();

export const bandersnatchSignature = (value: number): crypto.BandersnatchVrfSignature =>
  bytes.Bytes.fill(96, value).asOpaque();

export const bandersnatchProof = (value: number): crypto.BandersnatchProof => bytes.Bytes.fill(784, value).asOpaque();
export const serviceGas = (value: number | bigint) => block.tryAsServiceGas(BigInt(value));
export const serviceId = (value: number) => block.tryAsServiceId(value);
export const validatorIndex = (value: number) => block.tryAsValidatorIndex(value);
export const timeSlot = (value: number) => block.tryAsTimeSlot(value);
export const coreIndex = (value: number) => block.tryAsCoreIndex(value);

export const u64 = (value: number | bigint) => numbers.tryAsU64(BigInt(value));
export const u32 = (value: number) => numbers.tryAsU32(value);
export const u16 = (value: number) => numbers.tryAsU16(value);
export const u8 = (value: number) => numbers.tryAsU8(value);

export const bitVecFrom = (length: number, setBits: number[]): bytes.BitVec => {
  const bitVec = bytes.BitVec.empty(length);
  setBits.forEach((idx) => {
    bitVec.setBit(idx, true);
  });
  return bitVec;
};

export const encodeWithExampleSpec = <T>(descriptor: codec.Codec<T>, value: T): bytes.BytesBlob =>
  codec.Encoder.encodeObject(descriptor, value, exampleChainSpec);
