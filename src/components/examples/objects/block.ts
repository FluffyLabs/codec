import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { extrinsicExample } from "./extrinsic";
import { headerExample } from "./header";
import { encodeWithExampleSpec } from "./helpers";

const blockExampleValue = block.Block.create({
  header: headerExample,
  extrinsic: extrinsicExample,
});

const blockExampleEncoded = encodeWithExampleSpec(block.Block.Codec, blockExampleValue);

export const blockExample: ClassInstance<typeof block.Block> = blockExampleValue;

export const TEST_BLOCK = blockExampleEncoded.toString();
