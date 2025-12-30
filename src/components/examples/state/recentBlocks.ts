import { block, collections, type config, state } from "@typeberry/lib";

import { filledHash } from "../objects/helpers";
import type { ClassInstance } from "../types";

const makeReported = (seeds: number[]) =>
  collections.HashDictionary.fromEntries(
    seeds.map((seed) => {
      const info = block.refineContext.WorkPackageInfo.create({
        workPackageHash: filledHash(seed),
        segmentTreeRoot: filledHash(seed + 40),
      });
      return [info.workPackageHash, info] as const;
    }),
  );

export const recentBlocksExample = (_spec?: config.ChainSpec): ClassInstance<typeof state.RecentBlocks> =>
  state.RecentBlocks.create({
    blocks: collections.asKnownSize([
      state.BlockState.create({
        headerHash: filledHash(1),
        accumulationResult: filledHash(2),
        postStateRoot: filledHash(3),
        reported: makeReported([10, 11]),
      }),
      state.BlockState.create({
        headerHash: filledHash(4),
        accumulationResult: filledHash(5),
        postStateRoot: filledHash(6),
        reported: makeReported([12]),
      }),
    ]),
    accumulationLog: {
      peaks: [filledHash(20), null, filledHash(21)],
    },
  });
