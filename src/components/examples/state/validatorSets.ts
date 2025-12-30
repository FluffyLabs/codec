import { block, bytes, type config, state } from "@typeberry/lib";

import { bandersnatchKey, clampByte, ed25519Key } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

const VALIDATOR_META_BYTES = 128 as state.VALIDATOR_META_BYTES;

export const createValidatorDataSet = (
  offset: number,
  spec?: config.ChainSpec,
): block.PerValidator<state.ValidatorData> => {
  const resolvedSpec = resolveStateSpec(spec);
  const { validatorsCount } = getStateDimensions(resolvedSpec);

  return block.tryAsPerValidator(
    Array.from({ length: validatorsCount }, (_, index) =>
      state.ValidatorData.create({
        bandersnatch: bandersnatchKey(offset + index),
        ed25519: ed25519Key(offset + index + 5),
        bls: bytes.Bytes.fill(144, clampByte(offset + index)).asOpaque<"BlsKey">(),
        metadata: bytes.Bytes.fill(VALIDATOR_META_BYTES, clampByte(offset + index)),
      }),
    ),
    resolvedSpec,
  );
};
