import { config } from "@typeberry/lib";
import { preimageExample } from "./preimage";

export const preimageExtrinsicExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ReturnType<typeof preimageExample>[] => [preimageExample(spec)];
