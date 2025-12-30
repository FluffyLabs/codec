import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bandersnatchKey, ed25519Key } from "./helpers";

export const validatorKeysExample: ClassInstance<typeof block.ValidatorKeys> = block.ValidatorKeys.create({
  bandersnatch: bandersnatchKey(5),
  ed25519: ed25519Key(6),
});
