import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { filledHash } from "./helpers";

export const importSpecExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workItem.ImportSpec> =>
  block.workItem.ImportSpec.create({
    treeRoot: filledHash(32),
    index: block.tryAsSegmentIndex(1),
  });
