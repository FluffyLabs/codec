import { bytes, config, type state_vectors } from "@typeberry/lib";

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
