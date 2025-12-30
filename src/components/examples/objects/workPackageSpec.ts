import { block, bytes, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { filledHash, u16, u32 } from "./helpers";

export const workPackageSpecExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workReport.WorkPackageSpec> =>
  block.workReport.WorkPackageSpec.create({
    hash: filledHash(30),
    length: u32(4),
    erasureRoot: bytes.Bytes.fill(32, 9),
    exportsRoot: filledHash(31),
    exportsCount: u16(2),
  });
