import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { filledHash } from "./helpers";

export const importSpecExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workItem.ImportSpec> =>
  block.workItem.ImportSpec.create({
    treeRoot: filledHash(32),
    index: block.tryAsSegmentIndex(1),
  });
