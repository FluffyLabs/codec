import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { bytesBlobFrom } from "./helpers";

export const workExecResultExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workResult.WorkExecResult> =>
  new block.workResult.WorkExecResult(block.workResult.WorkExecResultKind.ok, bytesBlobFrom("work result"));
