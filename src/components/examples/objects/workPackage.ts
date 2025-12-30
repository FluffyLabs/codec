import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bytesBlobFrom, FixedSizeArray, filledHash } from "./helpers";
import { refineContextExample } from "./refineContext";
import { workItemExample } from "./workItem";

const workPackageExample: ClassInstance<typeof block.workPackage.WorkPackage> = block.workPackage.WorkPackage.create({
  authorization: bytesBlobFrom("authorization"),
  authCodeHost: block.tryAsServiceId(99),
  authCodeHash: filledHash(40),
  parametrization: bytesBlobFrom("params"),
  context: refineContextExample,
  items: FixedSizeArray.new([workItemExample], block.workPackage.tryAsWorkItemsCount(1)),
});

export { workPackageExample };
