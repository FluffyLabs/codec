import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { credentialExample } from "./credential";
import { asKnownSize, ed25519Signature, timeSlot, validatorIndex } from "./helpers";
import { workReportExample } from "./workReport";

const secondaryCredential = block.guarantees.Credential.create({
  validatorIndex: validatorIndex(1),
  signature: ed25519Signature(44),
});

export const reportGuaranteeExample: ClassInstance<typeof block.guarantees.ReportGuarantee> =
  block.guarantees.ReportGuarantee.create({
    report: workReportExample,
    slot: timeSlot(20),
    credentials: asKnownSize([credentialExample, secondaryCredential]),
  });
