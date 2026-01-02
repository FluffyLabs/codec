import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { filledHash, timeSlot } from "./helpers";

export const refineContextExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.refineContext.RefineContext> =>
  block.refineContext.RefineContext.create({
    anchor: filledHash(20),
    stateRoot: filledHash(21),
    beefyRoot: filledHash(22),
    lookupAnchor: filledHash(23),
    lookupAnchorSlot: timeSlot(12),
    prerequisites: [filledHash(24)],
  });
