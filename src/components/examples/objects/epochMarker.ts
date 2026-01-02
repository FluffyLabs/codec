import * as block from "@typeberry/lib/block";
import * as config from "@typeberry/lib/config";

import { getStateDimensions } from "../state/common";
import type { ClassInstance } from "../types";
import { asKnownSize, bandersnatchKey, ed25519Key, filledHash } from "./helpers";

export const epochMarkerExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.EpochMarker> => {
  const { validatorsCount } = getStateDimensions(spec);
  const validatorSet = asKnownSize(
    Array.from({ length: validatorsCount }, (_, index) =>
      block.ValidatorKeys.create({
        bandersnatch: bandersnatchKey(index + 1),
        ed25519: ed25519Key(index + 11),
      }),
    ),
  );

  return block.EpochMarker.create({
    entropy: filledHash(7),
    ticketsEntropy: filledHash(8),
    validators: validatorSet,
  });
};
