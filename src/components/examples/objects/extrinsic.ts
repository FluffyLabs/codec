import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import { availabilityAssuranceExample } from "./availabilityAssurance";
import { disputesExtrinsicExample } from "./disputesExtrinsic";
import { asKnownSize } from "./helpers";
import { preimageExample } from "./preimage";
import { reportGuaranteeExample } from "./reportGuarantee";
import { signedTicketExample } from "./signedTicket";

export const extrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec): block.Extrinsic => {
  const tickets = signedTicketExample(spec);
  const preimage = preimageExample(spec);
  const reportGuarantee = reportGuaranteeExample(spec);
  const assurance = availabilityAssuranceExample(spec);
  const disputes = disputesExtrinsicExample(spec);

  return block.Extrinsic.create({
    tickets: asKnownSize([tickets]),
    preimages: [preimage],
    guarantees: asKnownSize([reportGuarantee]),
    assurances: asKnownSize([assurance]),
    disputes,
  });
};
