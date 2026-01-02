import { Block } from "@typeberry/lib/block";
import type { ChainSpec } from "@typeberry/lib/config";
import { tinyChainSpec } from "@typeberry/lib/config";
import { extrinsicExample } from "./extrinsic";
import { headerExample } from "./header";
import { encodeWithExampleSpec } from "./helpers";

export const blockExample = (spec: ChainSpec = tinyChainSpec): Block =>
  Block.create({
    header: headerExample(spec),
    extrinsic: extrinsicExample(spec),
  });

export const TEST_BLOCK = encodeWithExampleSpec(Block.Codec, blockExample(tinyChainSpec), tinyChainSpec).toString();
