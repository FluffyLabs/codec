import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import type { ClassInstance } from "../types";
import { bytesBlobFrom, serviceId } from "./helpers";

export const preimageExample = (
  _spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.preimage.Preimage> =>
  block.preimage.Preimage.create({
    requester: serviceId(7),
    blob: bytesBlobFrom("demo preimage payload"),
  });
