import type * as config from "@typeberry/lib/config";

import { timeSlot } from "../objects/helpers";

export const timeslotExample = (_spec?: config.ChainSpec) => timeSlot(256);
