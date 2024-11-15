import Fastify from "fastify";
const OpenApiGlue = import("fastify-openapi-glue"); // dynamic import is needed because it is esm module
import path from "node:path";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { codecToJson } from "./codec-to-json";
import { jsonToCodec } from "./json-to-codec";
import { getTypes } from "./types";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const SWAGGER_PATH = "/docs";

const options = {
  specification: path.join(__dirname, "../api.yaml"),
  serviceHandlers: { getTypes, codecToJson, jsonToCodec },
  noAdditional: true,
  prefix: "api/v1",
};

const start = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(fastifySwagger, {
    mode: "static",
    specification: {
      path: "./api.yaml",
      baseDir: __dirname,
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: SWAGGER_PATH,
  });

  await fastify.register(OpenApiGlue, options);

  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
