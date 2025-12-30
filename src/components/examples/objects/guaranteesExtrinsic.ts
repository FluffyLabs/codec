import { config } from "@typeberry/lib";
import { asKnownSize } from "./helpers";
import { reportGuaranteeExample } from "./reportGuarantee";

export const guaranteesExtrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec) =>
  asKnownSize([reportGuaranteeExample(spec)]);
