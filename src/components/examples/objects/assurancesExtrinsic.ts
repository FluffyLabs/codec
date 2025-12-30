import { config } from "@typeberry/lib";

import { availabilityAssuranceExample } from "./availabilityAssurance";
import { asKnownSize } from "./helpers";

const assurancesExtrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec) =>
  asKnownSize([availabilityAssuranceExample(spec)]);

export { assurancesExtrinsicExample };
