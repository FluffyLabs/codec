import * as config from "@typeberry/lib/config";
import { preimageExample } from "./preimage";

export const preimageExtrinsicExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ReturnType<typeof preimageExample>[] => [preimageExample(spec)];
