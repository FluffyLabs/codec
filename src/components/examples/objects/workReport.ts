import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { bytesBlobFrom, coreIndex, FixedSizeArray, filledHash, serviceGas } from "./helpers";
import { refineContextExample } from "./refineContext";
import { workPackageSpecExample } from "./workPackageSpec";
import { workResultExample } from "./workResult";

export const workReportExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.workReport.WorkReport> => {
  const workPackageSpec = workPackageSpecExample(spec);
  const segmentInfo = block.refineContext.WorkPackageInfo.create({
    workPackageHash: workPackageSpec.hash,
    segmentTreeRoot: workPackageSpec.exportsRoot,
  });

  return block.workReport.WorkReport.create({
    workPackageSpec,
    context: refineContextExample(spec),
    coreIndex: coreIndex(3),
    authorizerHash: filledHash(42),
    authorizationOutput: bytesBlobFrom("auth output"),
    segmentRootLookup: [segmentInfo],
    results: FixedSizeArray.new([workResultExample(spec)], block.workPackage.tryAsWorkItemsCount(1)),
    authorizationGasUsed: serviceGas(7_500n),
  });
};
