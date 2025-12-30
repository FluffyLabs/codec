import { block } from "@typeberry/lib";
import { validatorsCount } from "../state/common";
import type { ClassInstance } from "../types";
import { asKnownSize, bandersnatchKey, ed25519Key, filledHash } from "./helpers";

const validatorSet = asKnownSize(
  Array.from({ length: validatorsCount }, (_, index) =>
    block.ValidatorKeys.create({
      bandersnatch: bandersnatchKey(index + 1),
      ed25519: ed25519Key(index + 11),
    }),
  ),
);

export const epochMarkerExample: ClassInstance<typeof block.EpochMarker> = block.EpochMarker.create({
  entropy: filledHash(7),
  ticketsEntropy: filledHash(8),
  validators: validatorSet,
});
