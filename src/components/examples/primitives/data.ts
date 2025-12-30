import { bytes } from "@typeberry/lib";
import { bitVecFrom } from "../objects/helpers";

export const bytes32Example: bytes.Bytes<32> = bytes.Bytes.fill(32, 15);
export const bytesBlobExample: bytes.BytesBlob = bytes.BytesBlob.blobFromString("blob example");
export const bitVecExample: bytes.BitVec = bitVecFrom(16, [1, 5, 9]);
