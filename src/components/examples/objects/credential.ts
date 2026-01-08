import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { ed25519Signature, validatorIndex } from "./helpers";

export const credentialExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.guarantees.Credential> =>
  block.guarantees.Credential.create({
    validatorIndex: validatorIndex(0),
    signature: ed25519Signature(12),
  });
