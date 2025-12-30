import type { block } from "@typeberry/lib";
import { availabilityAssuranceExample } from "./availabilityAssurance";
import { asKnownSize } from "./helpers";

const assurancesExtrinsicExample: readonly ReturnType<typeof block.assurances.AvailabilityAssurance.create>[] =
  asKnownSize([availabilityAssuranceExample]);

export { assurancesExtrinsicExample };
