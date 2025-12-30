import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { culpritExample } from "./culprit";
import { faultExample } from "./fault";
import { verdictExample } from "./verdict";

export const disputesExtrinsicExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.disputes.DisputesExtrinsic> =>
  block.disputes.DisputesExtrinsic.create({
    verdicts: [verdictExample(spec)],
    culprits: [culpritExample(spec)],
    faults: [faultExample(spec)],
  });
