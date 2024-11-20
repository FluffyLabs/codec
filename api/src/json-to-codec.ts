import { codec, config } from "@typeberry/block";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createErrorResponse } from "./error";
import { parse } from "./json-parser";
import { kinds } from "./kinds";

type Req = { Params: { id: string }; Body: { json: string } };
type SuccessRes = { data: { codec: string } };
type Res = { Body: SuccessRes };

export function jsonToCodec(req: FastifyRequest<Req>, reply: FastifyReply<Res>) {
  const descriptorId = req.params.id;
  const descriptor = kinds.find((x) => x.name === descriptorId)?.clazz;
  if (!descriptor) {
    reply.status(400).send(new Error("Incorrect descriptorId!"));
    return;
  }

  const rawJson = JSON.stringify(req.body.json);
  const parsedData = parse(rawJson);
  try {
    const encoded = codec.Encoder.encodeObject(descriptor.Codec, parsedData, config.tinyChainSpec);

    return { data: { codec: encoded.toString() } };
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send(createErrorResponse("Incorrect input data", e.message));
      return;
    }

    reply.status(500).send(createErrorResponse("An unexpected error occurred", "We do not know yet ¯_(ツ)_/¯"));
  }
}
