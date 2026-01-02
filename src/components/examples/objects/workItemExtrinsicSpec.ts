import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { filledHash, u32 } from "./helpers";

export const workItemExtrinsicSpecExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workItem.WorkItemExtrinsicSpec> =>
  block.workItem.WorkItemExtrinsicSpec.create({
    hash: filledHash(33),
    len: u32(32),
  });
