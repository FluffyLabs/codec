import { block, bytes, state } from "@typeberry/lib";

import { bandersnatchKey, ed25519Key } from "../objects/helpers";
import { stateExampleSpec, validatorsCount } from "./common";

const VALIDATOR_META_BYTES = 128 as state.VALIDATOR_META_BYTES;

export const createValidatorDataSet = (offset: number): block.PerValidator<state.ValidatorData> =>
  block.tryAsPerValidator(
    Array.from({ length: validatorsCount }, (_, index) =>
      state.ValidatorData.create({
        bandersnatch: bandersnatchKey(offset + index),
        ed25519: ed25519Key(offset + index + 5),
        bls: bytes.Bytes.fill(144, offset + index).asOpaque<"BlsKey">(),
        metadata: bytes.Bytes.fill(VALIDATOR_META_BYTES, offset + index),
      }),
    ),
    stateExampleSpec,
  );
