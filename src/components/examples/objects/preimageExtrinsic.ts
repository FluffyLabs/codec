import type { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { preimageExample } from "./preimage";

export const preimageExtrinsicExample: readonly ClassInstance<typeof block.preimage.Preimage>[] = [preimageExample];
