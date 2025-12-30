import { block, bytes, collections, state } from "@typeberry/lib";
import { bandersnatchKey, ed25519Key } from "../objects/helpers";
import type { ClassInstance } from "../types";
import { epochLength, stateExampleSpec, validatorsCount } from "./common";

const VALIDATOR_META_BYTES = 128 as state.VALIDATOR_META_BYTES;

const createValidatorData = (seed: number) =>
  state.ValidatorData.create({
    bandersnatch: bandersnatchKey(seed),
    ed25519: ed25519Key(seed + 10),
    bls: bytes.Bytes.fill(144, seed).asOpaque<"BlsKey">(),
    metadata: bytes.Bytes.fill(VALIDATOR_META_BYTES, seed),
  });

const nextValidatorData = block.tryAsPerValidator(
  Array.from({ length: validatorsCount }, (_, index) => createValidatorData(index + 1)),
  stateExampleSpec,
);

const sealingKeySeries = state.SafroleSealingKeysData.keys(
  block.tryAsPerEpochBlock(
    Array.from({ length: epochLength }, (_, index) => bandersnatchKey(30 + index)),
    stateExampleSpec,
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

export const safroleDataExample: ClassInstance<typeof state.SafroleData> = state.SafroleData.create({
  nextValidatorData,
  epochRoot: bytes.Bytes.fill(144, 5).asOpaque<"BandersnatchRingRoot">(),
  sealingKeySeries,
  ticketsAccumulator,
});
