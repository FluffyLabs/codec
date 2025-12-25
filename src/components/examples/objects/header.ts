import { block, bytes, codec, config } from "@typeberry/lib";

const zeroHash = bytes.Bytes.zero(32).asOpaque();
const zeroSignature = bytes.Bytes.zero(96).asOpaque();

const headerExampleObject = block.Header.create({
  parentHeaderHash: zeroHash,
  priorStateRoot: zeroHash,
  extrinsicHash: zeroHash,
  timeSlotIndex: block.tryAsTimeSlot(42),
  epochMarker: null,
  ticketsMarker: null,
  bandersnatchBlockAuthorIndex: block.tryAsValidatorIndex(1),
  entropySource: zeroSignature,
  offendersMarker: [],
  seal: zeroSignature,
});

const headerExampleEncoded = codec.Encoder.encodeObject(block.Header.Codec, headerExampleObject, config.tinyChainSpec);

export const headerExample: unknown = headerExampleObject;

export const TEST_HEADER = headerExampleEncoded.toString();
