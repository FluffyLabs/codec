import { block, type config, state } from "@typeberry/lib";

import { asKnownSize, filledHash } from "../objects/helpers";
import { workReportExample } from "../objects/workReport";
import { getStateDimensions, resolveStateSpec } from "./common";

export const accumulationQueueExample = (spec?: config.ChainSpec): state.AccumulationQueue => {
  const resolvedSpec = resolveStateSpec(spec);
  const { epochLength } = getStateDimensions(resolvedSpec);
  const workReportValue = workReportExample(resolvedSpec);

  const pendingReport = state.NotYetAccumulatedReport.create({
    report: workReportValue,
    dependencies: asKnownSize([filledHash(200)]),
  });

  return block.tryAsPerEpochBlock(
    Array.from({ length: epochLength }, (_, index): state.NotYetAccumulatedReport[] =>
      index === 0 ? [pendingReport] : [],
    ),
    resolvedSpec,
  );
};
