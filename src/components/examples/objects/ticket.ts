import * as block from "@typeberry/lib/block";
import * as bytes from "@typeberry/lib/bytes";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";

export const ticketExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.tickets.Ticket> =>
  block.tickets.Ticket.create({
    id: bytes.Bytes.fill(32, 4),
    attempt: block.tickets.tryAsTicketAttempt(0),
  });
