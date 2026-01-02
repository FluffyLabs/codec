import type * as config from "@typeberry/lib/config";
import * as state from "@typeberry/lib/state";

import { ed25519Key, filledHash } from "../objects/helpers";

const sortedHashes = (seeds: number[]) => {
  const hashes = seeds.map((seed) => filledHash(seed));
  return hashes.slice().sort((a, b) => state.hashComparator(a, b).value);
};

const punishers = [ed25519Key(1), ed25519Key(2)];

export const disputesRecordsExample = (_spec?: config.ChainSpec): state.DisputesRecords =>
  state.DisputesRecords.fromSortedArrays({
    goodSet: sortedHashes([1, 2]),
    badSet: sortedHashes([3]),
    wonkySet: sortedHashes([4]),
    punishSet: punishers.slice().sort((a, b) => state.hashComparator(a, b).value),
  });
