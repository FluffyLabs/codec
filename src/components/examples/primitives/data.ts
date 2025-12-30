import { bytes, type config } from "@typeberry/lib";

import { bitVecFrom } from "../objects/helpers";

export const bytes32Example = (_spec?: config.ChainSpec): bytes.Bytes<32> => bytes.Bytes.fill(32, 15);
export const bytesBlobExample = (_spec?: config.ChainSpec): bytes.BytesBlob =>
  bytes.BytesBlob.blobFromString("blob example");
export const bitVecExample = (_spec?: config.ChainSpec): bytes.BitVec => bitVecFrom(16, [1, 5, 9]);
