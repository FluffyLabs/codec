import * as config from "@typeberry/lib/config";

import { asKnownSize } from "./helpers";
import { signedTicketExample } from "./signedTicket";

export const ticketExtrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec) =>
  asKnownSize([signedTicketExample(spec)]);
