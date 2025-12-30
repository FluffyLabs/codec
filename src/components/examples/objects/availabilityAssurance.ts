import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { bitVecFrom, ed25519Signature, resolveExampleSpec, validatorIndex, zeroHash } from "./helpers";

export const availabilityAssuranceExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.assurances.AvailabilityAssurance> =>
  block.assurances.AvailabilityAssurance.create({
    anchor: zeroHash(),
    bitfield: bitVecFrom(Number(resolveExampleSpec(spec).coresCount), [0]),
    validatorIndex: validatorIndex(2),
    signature: ed25519Signature(11),
  });
