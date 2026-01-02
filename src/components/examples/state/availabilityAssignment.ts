import type * as config from "@typeberry/lib/config";
import * as state from "@typeberry/lib/state";

import { timeSlot } from "../objects/helpers";
import { workReportExample } from "../objects/workReport";
import { getStateDimensions, resolveStateSpec } from "./common";

export const availabilityAssignmentExample = (
  spec?: config.ChainSpec,
): state.PerCore<state.AvailabilityAssignment | null> => {
  const resolvedSpec = resolveStateSpec(spec);
  const { coresCount } = getStateDimensions(resolvedSpec);
  const workReportValue = workReportExample(resolvedSpec);

  const assignments = Array.from({ length: coresCount }, (_, index) =>
    index === 0
      ? state.AvailabilityAssignment.create({
          workReport: workReportValue,
          timeout: timeSlot(64),
        })
      : null,
  );

  return state.tryAsPerCore(assignments, resolvedSpec);
};
