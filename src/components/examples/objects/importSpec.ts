import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { filledHash } from "./helpers";

export const importSpecExample: ClassInstance<typeof block.workItem.ImportSpec> = block.workItem.ImportSpec.create({
  treeRoot: filledHash(32),
  index: block.tryAsSegmentIndex(1),
});
