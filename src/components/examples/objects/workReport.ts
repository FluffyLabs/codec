import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bytesBlobFrom, coreIndex, FixedSizeArray, filledHash, serviceGas } from "./helpers";
import { refineContextExample } from "./refineContext";
import { workPackageSpecExample } from "./workPackageSpec";
import { workResultExample } from "./workResult";

const workPackageSpec = workPackageSpecExample;
const segmentInfo = block.refineContext.WorkPackageInfo.create({
  workPackageHash: workPackageSpec.hash,
  segmentTreeRoot: workPackageSpec.exportsRoot,
});

const workReportExample: ClassInstance<typeof block.workReport.WorkReport> = block.workReport.WorkReport.create({
  workPackageSpec,
  context: refineContextExample,
  coreIndex: coreIndex(3),
  authorizerHash: filledHash(42),
  authorizationOutput: bytesBlobFrom("auth output"),
  segmentRootLookup: [segmentInfo],
  results: FixedSizeArray.new([workResultExample], block.workPackage.tryAsWorkItemsCount(1)),
  authorizationGasUsed: serviceGas(7_500n),
});

export { workReportExample };
