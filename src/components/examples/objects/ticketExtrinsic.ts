import { config } from "@typeberry/lib";

import { asKnownSize } from "./helpers";
import { signedTicketExample } from "./signedTicket";

export const ticketExtrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec) =>
  asKnownSize([signedTicketExample(spec)]);
