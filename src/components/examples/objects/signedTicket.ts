import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bandersnatchProof } from "./helpers";

export const signedTicketExample: ClassInstance<typeof block.tickets.SignedTicket> = block.tickets.SignedTicket.create({
  attempt: block.tickets.tryAsTicketAttempt(1),
  signature: bandersnatchProof(3),
});
