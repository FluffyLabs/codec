import { block, bytes } from "@typeberry/lib";
import type { ClassInstance } from "../types";

export const ticketExample: ClassInstance<typeof block.tickets.Ticket> = block.tickets.Ticket.create({
  id: bytes.Bytes.fill(32, 4),
  attempt: block.tickets.tryAsTicketAttempt(0),
});
