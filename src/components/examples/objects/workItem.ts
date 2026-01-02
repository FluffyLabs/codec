import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { asKnownSize, bytesBlobFrom, filledHash, serviceGas, serviceId, u16 } from "./helpers";
import { importSpecExample } from "./importSpec";
import { workItemExtrinsicSpecExample } from "./workItemExtrinsicSpec";

export const workItemExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workItem.WorkItem> =>
  block.workItem.WorkItem.create({
    service: serviceId(10),
    codeHash: filledHash(34),
    payload: bytesBlobFrom("work item payload"),
    refineGasLimit: serviceGas(5_000n),
    accumulateGasLimit: serviceGas(2_000n),
    importSegments: asKnownSize([importSpecExample(spec)]),
    extrinsic: [workItemExtrinsicSpecExample(spec)],
    exportCount: u16(1),
  });
