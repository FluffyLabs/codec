import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { credentialExample } from "./credential";
import { asKnownSize, ed25519Signature, timeSlot, validatorIndex } from "./helpers";
import { workReportExample } from "./workReport";

export const reportGuaranteeExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.ReportGuarantee> => {
  const secondaryCredential = block.Credential.create({
    validatorIndex: validatorIndex(1),
    signature: ed25519Signature(44),
  });

  return block.ReportGuarantee.create({
    report: workReportExample(spec),
    slot: timeSlot(20),
    credentials: asKnownSize([credentialExample(spec), secondaryCredential]),
  });
};
