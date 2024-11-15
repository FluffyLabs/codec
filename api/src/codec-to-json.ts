import { bytes, codec, context } from "@typeberry/block";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createErrorResponse } from "./error";
import { kinds } from "./kinds";

type Req = { Params: { id: string }; Body: { codec: string } };
type SuccessRes = { data: { json: string } };
type Res = { Body: SuccessRes };

export function codecToJson(req: FastifyRequest<Req>, reply: FastifyReply<Res>) {
  const descriptorId = req.params.id;
  const descriptor = kinds.find((x) => x.name === descriptorId)?.clazz;
  if (!descriptor) {
    reply.status(400).send(createErrorResponse("Wrong descriptor id", `Descriptor ${descriptorId} does not exist.`));
    return;
  }

  const decoded = codec.Decoder.decodeObject(
    descriptor.Codec,
    bytes.BytesBlob.parseBlob(req.body.codec),
    context.tinyChainSpec,
  );

  try {
    const decodedAsString = JSON.stringify(decoded, (_key, value) => {
      if (value instanceof bytes.BytesBlob) {
        return value.toString();
      }
      if (value instanceof bytes.Bytes) {
        return value.toString();
      }
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    });

    return { data: { json: decodedAsString } };
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send(createErrorResponse("Incorrect input data", e.message));
      return;
    }
    req.log.error(e);
    reply.status(500).send(createErrorResponse("An unexpected error occurred", "We do not know yet ¯_(ツ)_/¯"));
  }
}
