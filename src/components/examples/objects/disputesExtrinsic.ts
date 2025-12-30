import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { culpritExample } from "./culprit";
import { faultExample } from "./fault";
import { verdictExample } from "./verdict";

export const disputesExtrinsicExample: ClassInstance<typeof block.disputes.DisputesExtrinsic> =
  block.disputes.DisputesExtrinsic.create({
    verdicts: [verdictExample],
    culprits: [culpritExample],
    faults: [faultExample],
  });
