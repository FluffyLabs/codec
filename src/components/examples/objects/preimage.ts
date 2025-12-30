import { block } from "@typeberry/lib";
import type { ClassInstance } from "../types";
import { bytesBlobFrom, serviceId } from "./helpers";

export const preimageExample: ClassInstance<typeof block.preimage.Preimage> = block.preimage.Preimage.create({
  requester: serviceId(7),
  blob: bytesBlobFrom("demo preimage payload"),
});
