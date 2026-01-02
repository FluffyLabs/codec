import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { bandersnatchKey, ed25519Key } from "./helpers";

export const validatorKeysExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.ValidatorKeys> =>
  block.ValidatorKeys.create({
    bandersnatch: bandersnatchKey(5),
    ed25519: ed25519Key(6),
  });
