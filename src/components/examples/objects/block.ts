import { block, codec, config } from "@typeberry/lib";
import { extrinsicExample } from "./extrinsic";
import { headerExample } from "./header";

const blockExampleObject = block.Block.create({
  header: headerExample as block.Header,
  extrinsic: extrinsicExample as block.Extrinsic,
});

const blockExampleEncoded = codec.Encoder.encodeObject(block.Block.Codec, blockExampleObject, config.tinyChainSpec);

export const blockExample: unknown = blockExampleObject;

export const TEST_BLOCK = blockExampleEncoded.toString();
