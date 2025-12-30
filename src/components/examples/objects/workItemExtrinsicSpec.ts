import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { filledHash, u32 } from "./helpers";

export const workItemExtrinsicSpecExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workItem.WorkItemExtrinsicSpec> =>
  block.workItem.WorkItemExtrinsicSpec.create({
    hash: filledHash(33),
    len: u32(32),
  });
