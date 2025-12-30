import { bytes, config, type state_vectors } from "@typeberry/lib";

import { headerExample } from "../objects/header";
import { bytesBlobFrom, filledHash } from "../objects/helpers";

const genesisState = {
  state_root: filledHash(130),
  keyvals: [
    {
      key: bytes.Bytes.fill(31, 1),
      value: bytesBlobFrom("genesis: value"),
    },
  ],
};

export const stfGenesisExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): state_vectors.StateTransitionGenesis => ({
  header: headerExample(spec),
  state: genesisState,
});
