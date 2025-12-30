import { block, bytes, collections, type config, state } from "@typeberry/lib";

import { bandersnatchKey, clampByte, ed25519Key } from "../objects/helpers";
import type { ClassInstance } from "../types";
import { getStateDimensions, resolveStateSpec } from "./common";

const VALIDATOR_META_BYTES = 128 as state.VALIDATOR_META_BYTES;

const createValidatorData = (seed: number) =>
  state.ValidatorData.create({
    bandersnatch: bandersnatchKey(seed),
    ed25519: ed25519Key(seed + 10),
    bls: bytes.Bytes.fill(144, clampByte(seed)).asOpaque<"BlsKey">(),
    metadata: bytes.Bytes.fill(VALIDATOR_META_BYTES, clampByte(seed)),
  });

export const safroleDataExample = (spec?: config.ChainSpec): ClassInstance<typeof state.SafroleData> => {
  const resolvedSpec = resolveStateSpec(spec);
  const { validatorsCount, epochLength } = getStateDimensions(resolvedSpec);

  const nextValidatorData = block.tryAsPerValidator(
    Array.from({ length: validatorsCount }, (_, index) => createValidatorData(index + 1)),
    resolvedSpec,
  );

  const sealingKeySeries = state.SafroleSealingKeysData.keys(
    block.tryAsPerEpochBlock(
      Array.from({ length: epochLength }, (_, index) => bandersnatchKey(30 + index)),
      resolvedSpec,
    ),
  );

  const ticketsAccumulator = collections.asKnownSize([
    block.tickets.Ticket.create({
      id: bytes.Bytes.fill(32, 80),
      attempt: block.tickets.tryAsTicketAttempt(0),
    }),
    block.tickets.Ticket.create({
      id: bytes.Bytes.fill(32, 81),
      attempt: block.tickets.tryAsTicketAttempt(1),
    }),
  ]);

  return state.SafroleData.create({
    nextValidatorData,
    epochRoot: bytes.Bytes.fill(144, clampByte(5)).asOpaque<"BandersnatchRingRoot">(),
    sealingKeySeries,
    ticketsAccumulator,
  });
};
