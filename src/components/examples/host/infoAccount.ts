import { type codec, type jam_host_calls as jam, state } from "@typeberry/lib";

import { filledHash, serviceGas, serviceId, timeSlot, u32, u64 } from "../objects/helpers";

const thresholdBalance = state.ServiceAccountInfo.calculateThresholdBalance(u32(3), u64(1_024n), u64(128n));

export const hostCallInfoAccountExample: codec.DescribedBy<typeof jam.hostCallInfoAccount> = {
  codeHash: filledHash(120),
  balance: u64(50_000n),
  thresholdBalance,
  accumulateMinGas: serviceGas(9_000n),
  onTransferMinGas: serviceGas(11_000n),
  storageUtilisationBytes: u64(1_024n),
  storageUtilisationCount: u32(6),
  gratisStorage: u64(128n),
  created: timeSlot(12),
  lastAccumulation: timeSlot(18),
  parentService: serviceId(99),
};
