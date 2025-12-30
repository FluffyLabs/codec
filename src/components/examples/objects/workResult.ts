import { block, bytes, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { filledHash, serviceGas, serviceId, u32 } from "./helpers";
import { workExecResultExample } from "./workExecResult";

export const workResultExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workResult.WorkResult> => {
  const loadExample = block.workResult.WorkRefineLoad.create({
    gasUsed: serviceGas(5_000n),
    importedSegments: u32(1),
    extrinsicCount: u32(1),
    extrinsicSize: u32(256),
    exportedSegments: u32(0),
  });

  return block.workResult.WorkResult.create({
    serviceId: serviceId(10),
    codeHash: filledHash(41),
    payloadHash: bytes.Bytes.fill(32, 3),
    gas: serviceGas(1_000n),
    result: workExecResultExample(spec),
    load: loadExample,
  });
};
