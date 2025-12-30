import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { ed25519Key, ed25519Signature, filledHash } from "./helpers";

export const culpritExample: ClassInstance<typeof block.disputes.Culprit> = block.disputes.Culprit.create({
  workReportHash: filledHash(61),
  key: ed25519Key(14),
  signature: ed25519Signature(52),
});
