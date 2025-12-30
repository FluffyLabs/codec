import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bitVecFrom, ed25519Signature, exampleChainSpec, validatorIndex, zeroHash } from "./helpers";

export const availabilityAssuranceExample: ClassInstance<typeof block.assurances.AvailabilityAssurance> =
  block.assurances.AvailabilityAssurance.create({
    anchor: zeroHash(),
    bitfield: bitVecFrom(Number(exampleChainSpec.coresCount), [0]),
    validatorIndex: validatorIndex(2),
    signature: ed25519Signature(11),
  });
