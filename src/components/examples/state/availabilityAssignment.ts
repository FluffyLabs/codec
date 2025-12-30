import { state } from "@typeberry/lib";

import { timeSlot } from "../objects/helpers";
import { workReportExample } from "../objects/workReport";
import { stateExampleSpec } from "./common";

const workReportValue = workReportExample;

export const availabilityAssignmentExample: object = state.tryAsPerCore(
  [
    state.AvailabilityAssignment.create({
      workReport: workReportValue,
      timeout: timeSlot(64),
    }),
    null,
  ],
  stateExampleSpec,
);
