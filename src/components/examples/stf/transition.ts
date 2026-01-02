import * as bytes from "@typeberry/lib/bytes";
import * as config from "@typeberry/lib/config";
import type * as state_vectors from "@typeberry/lib/state-vectors";

import { blockExample } from "../objects/block";
import { bytesBlobFrom, filledHash } from "../objects/helpers";

const makeTestState = (seed: number) => ({
  state_root: filledHash(200 + seed),
  keyvals: [
    {
      key: bytes.Bytes.fill(31, seed),
      value: bytesBlobFrom(`state-${seed}`),
    },
  ],
});

export const stfVectorExample = (spec: config.ChainSpec = config.tinyChainSpec): state_vectors.StateTransition => ({
  pre_state: makeTestState(1),
  block: blockExample(spec),
  post_state: makeTestState(2),
});
