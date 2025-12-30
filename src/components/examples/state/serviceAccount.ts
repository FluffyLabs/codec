import { type config, state } from "@typeberry/lib";

import { filledHash, serviceGas, serviceId, timeSlot, u32, u64 } from "../objects/helpers";

export const serviceAccountExample = (_spec?: config.ChainSpec): state.ServiceAccountInfo =>
  state.ServiceAccountInfo.create({
    codeHash: filledHash(90),
    balance: u64(1_000_000n),
    accumulateMinGas: serviceGas(5_000n),
    onTransferMinGas: serviceGas(7_000n),
    storageUtilisationBytes: u64(2_048n),
    gratisStorage: u64(256n),
    storageUtilisationCount: u32(4),
    created: timeSlot(10),
    lastAccumulation: timeSlot(20),
    parentService: serviceId(2),
  });
