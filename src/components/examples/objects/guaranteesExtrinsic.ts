import * as config from "@typeberry/lib/config";
import { asKnownSize } from "./helpers";
import { reportGuaranteeExample } from "./reportGuarantee";

export const guaranteesExtrinsicExample = (spec: config.ChainSpec = config.tinyChainSpec) =>
  asKnownSize([reportGuaranteeExample(spec)]);
