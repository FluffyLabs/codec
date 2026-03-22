import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { bandersnatchProof } from "./helpers";

export const signedTicketExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.SignedTicket> =>
  block.SignedTicket.create({
    attempt: block.tryAsTicketAttempt(1),
    signature: bandersnatchProof(3),
  });
