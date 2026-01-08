import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { ed25519Key, ed25519Signature, filledHash } from "./helpers";

export const faultExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.disputes.Fault> =>
  block.disputes.Fault.create({
    workReportHash: filledHash(60),
    wasConsideredValid: false,
    key: ed25519Key(13),
    signature: ed25519Signature(51),
  });
