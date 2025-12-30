import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { ed25519Signature, validatorIndex } from "./helpers";

export const credentialExample: ClassInstance<typeof block.guarantees.Credential> = block.guarantees.Credential.create({
  validatorIndex: validatorIndex(0),
  signature: ed25519Signature(12),
});
