import type { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { signedTicketExample } from "./signedTicket";

export const ticketExtrinsicExample: readonly ClassInstance<typeof block.tickets.SignedTicket>[] = [
  signedTicketExample,
];
