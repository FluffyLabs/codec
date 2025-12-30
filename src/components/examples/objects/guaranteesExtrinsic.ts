import type { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { asKnownSize } from "./helpers";
import { reportGuaranteeExample } from "./reportGuarantee";

export const guaranteesExtrinsicExample: readonly ClassInstance<typeof block.guarantees.ReportGuarantee>[] =
  asKnownSize([reportGuaranteeExample]);
