import * as bytes from "@typeberry/lib/bytes";
import * as config from "@typeberry/lib/config";

import { headerExample } from "../objects/header";
import { bytesBlobFrom, filledHash } from "../objects/helpers";
import {StateTransitionGenesis} from "@typeberry/lib/state-vectors";

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
): StateTransitionGenesis => ({
  header: headerExample(spec),
  state: genesisState,
});
