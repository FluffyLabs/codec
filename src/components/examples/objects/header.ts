import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bandersnatchSignature, encodeWithExampleSpec, zeroHash } from "./helpers";

const headerExampleValue = block.Header.create({
  parentHeaderHash: zeroHash(),
  priorStateRoot: zeroHash(),
  extrinsicHash: zeroHash(),
  timeSlotIndex: block.tryAsTimeSlot(42),
  epochMarker: null,
  ticketsMarker: null,
  bandersnatchBlockAuthorIndex: block.tryAsValidatorIndex(1),
  entropySource: bandersnatchSignature(1),
  offendersMarker: [],
  seal: bandersnatchSignature(2),
});

const headerExampleEncoded = encodeWithExampleSpec(block.Header.Codec, headerExampleValue);

export const headerExample: ClassInstance<typeof block.Header> = headerExampleValue;

export const TEST_HEADER = headerExampleEncoded.toString();
