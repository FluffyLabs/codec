import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { ed25519Key, ed25519Signature, filledHash } from "./helpers";

export const culpritExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.disputes.Culprit> =>
  block.disputes.Culprit.create({
    workReportHash: filledHash(61),
    key: ed25519Key(14),
    signature: ed25519Signature(52),
  });
