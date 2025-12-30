import type { config } from "@typeberry/lib";

import { timeSlot } from "../objects/helpers";

export const timeslotExample = (_spec?: config.ChainSpec) => timeSlot(256);
