import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { filledHash, u32 } from "./helpers";

export const workItemExtrinsicSpecExample: ClassInstance<typeof block.workItem.WorkItemExtrinsicSpec> =
  block.workItem.WorkItemExtrinsicSpec.create({
    hash: filledHash(33),
    len: u32(32),
  });
