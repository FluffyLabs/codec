import { block, config } from "@typeberry/lib";

import type { ClassInstance } from "../types";
import { asKnownSize, ed25519Signature, filledHash, resolveExampleSpec, validatorIndex } from "./helpers";

export const verdictExample = (
  spec: config.ChainSpec = config.tinyChainSpec,
): ClassInstance<typeof block.disputes.Verdict> => {
  const resolvedSpec = resolveExampleSpec(spec);
  const votesCount = Number(resolvedSpec.validatorsSuperMajority);

  const votes = asKnownSize(
    Array.from({ length: votesCount }, (_, idx) =>
      block.disputes.Judgement.create({
        isWorkReportValid: idx % 2 === 0,
        index: validatorIndex(idx),
        signature: ed25519Signature(60 + idx),
      }),
    ),
  );

  return block.disputes.Verdict.create({
    workReportHash: filledHash(62),
    votesEpoch: block.tryAsEpoch(1),
    votes,
  });
};
