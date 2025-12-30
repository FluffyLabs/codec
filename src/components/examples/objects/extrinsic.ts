import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { availabilityAssuranceExample } from "./availabilityAssurance";
import { disputesExtrinsicExample } from "./disputesExtrinsic";
import { asKnownSize } from "./helpers";
import { preimageExample } from "./preimage";
import { reportGuaranteeExample } from "./reportGuarantee";
import { signedTicketExample } from "./signedTicket";

const tickets = signedTicketExample;
const preimage = preimageExample;
const reportGuarantee = reportGuaranteeExample;
const assurance = availabilityAssuranceExample;
const disputes = disputesExtrinsicExample;

export const extrinsicExample: ClassInstance<typeof block.Extrinsic> = block.Extrinsic.create({
  tickets: asKnownSize([tickets]),
  preimages: [preimage],
  guarantees: asKnownSize([reportGuarantee]),
  assurances: asKnownSize([assurance]),
  disputes,
});
