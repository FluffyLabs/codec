import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { credentialExample } from "./credential";
import { asKnownSize, ed25519Signature, timeSlot, validatorIndex } from "./helpers";
import { workReportExample } from "./workReport";

export const reportGuaranteeExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.guarantees.ReportGuarantee> => {
  const secondaryCredential = block.guarantees.Credential.create({
    validatorIndex: validatorIndex(1),
    signature: ed25519Signature(44),
  });

  return block.guarantees.ReportGuarantee.create({
    report: workReportExample(spec),
    slot: timeSlot(20),
    credentials: asKnownSize([credentialExample(spec), secondaryCredential]),
  });
};
