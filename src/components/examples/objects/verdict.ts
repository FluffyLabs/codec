import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { asKnownSize, ed25519Signature, exampleChainSpec, filledHash, validatorIndex } from "./helpers";

const votesCount = Number(exampleChainSpec.validatorsSuperMajority);

const votes = asKnownSize(
  Array.from({ length: votesCount }, (_, idx) =>
    block.disputes.Judgement.create({
      isWorkReportValid: idx % 2 === 0,
      index: validatorIndex(idx),
      signature: ed25519Signature(60 + idx),
    }),
  ),
);

export const verdictExample: ClassInstance<typeof block.disputes.Verdict> = block.disputes.Verdict.create({
  workReportHash: filledHash(62),
  votesEpoch: block.tryAsEpoch(1),
  votes,
});
