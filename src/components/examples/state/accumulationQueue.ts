import { block, state } from "@typeberry/lib";

import { asKnownSize, filledHash } from "../objects/helpers";
import { workReportExample } from "../objects/workReport";
import { epochLength, stateExampleSpec } from "./common";

const workReportValue = workReportExample;

const pendingReport = state.NotYetAccumulatedReport.create({
  report: workReportValue,
  dependencies: asKnownSize([filledHash(200)]),
});

export const accumulationQueueExample: state.AccumulationQueue = block.tryAsPerEpochBlock(
  Array.from({ length: epochLength }, (_, index): state.NotYetAccumulatedReport[] =>
    index === 0 ? [pendingReport] : [],
  ),
  stateExampleSpec,
);
