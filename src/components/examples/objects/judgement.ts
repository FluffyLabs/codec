import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { ed25519Signature, validatorIndex } from "./helpers";

export const judgementExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.disputes.Judgement> =>
  block.disputes.Judgement.create({
    isWorkReportValid: true,
    index: validatorIndex(0),
    signature: ed25519Signature(50),
  });
