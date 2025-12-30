import type { config } from "@typeberry/lib";

import { u32 } from "../objects/helpers";

export const lookupHistoryItemExample = (_spec?: config.ChainSpec) => [u32(1), u32(5), u32(9)];
