import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import { bandersnatchSignature, encodeWithExampleSpec, zeroHash } from "./helpers";

export const headerExample = (_spec: config.ChainSpec = config.tinyChainSpec): block.Header =>
  block.Header.create({
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

export const TEST_HEADER = encodeWithExampleSpec(
  block.Header.Codec,
  headerExample(config.tinyChainSpec),
  config.tinyChainSpec,
).toString();
