import { block, config } from "@typeberry/lib";

import { extrinsicExample } from "./extrinsic";
import { headerExample } from "./header";
import { encodeWithExampleSpec } from "./helpers";

export const blockExample = (spec: config.ChainSpec = config.tinyChainSpec): block.Block =>
  block.Block.create({
    header: headerExample(spec),
    extrinsic: extrinsicExample(spec),
  });

export const TEST_BLOCK = encodeWithExampleSpec(
  block.Block.Codec,
  blockExample(config.tinyChainSpec),
  config.tinyChainSpec,
).toString();
