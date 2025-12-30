import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { bytesBlobFrom, FixedSizeArray, filledHash } from "./helpers";
import { refineContextExample } from "./refineContext";
import { workItemExample } from "./workItem";

export const workPackageExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workPackage.WorkPackage> =>
  block.workPackage.WorkPackage.create({
    authorization: bytesBlobFrom("authorization"),
    authCodeHost: block.tryAsServiceId(99),
    authCodeHash: filledHash(40),
    parametrization: bytesBlobFrom("params"),
    context: refineContextExample(spec),
    items: FixedSizeArray.new([workItemExample(spec)], block.workPackage.tryAsWorkItemsCount(1)),
  });
