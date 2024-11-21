import "json-bigint-patch";
import Fastify from "fastify";
const OpenApiGlue = import("fastify-openapi-glue"); // dynamic import is needed because it is esm module
import path from "node:path";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { areArraysEqual } from "./array-utils";
import { codecToJson } from "./codec-to-json";
import { jsonToCodec } from "./json-to-codec";
import { kindNames } from "./kinds";
import { getTypes } from "./types";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const SWAGGER_PATH = "/docs";

const start = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(import("fastify-raw-body"), {
    field: "rawBody",
    global: true,
    encoding: "utf8", // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true,
  });

  await fastify.register(fastifySwagger, {
    mode: "static",
    specification: {
      path: "./api.yaml",
      baseDir: __dirname,
      postProcessor: (spec) => {
        for (const path of Object.values(spec.paths)) {
          for (const properties of Object.values(path)) {
            if (!properties.parameters) {
              continue;
            }
            for (const param of properties.parameters) {
              if (
                param.description === "Type name" &&
                param.in === "path" &&
                !areArraysEqual(param.schema.enum, kindNames)
              ) {
                throw new Error("Type lists in kind.ts and api.yaml are different!");
              }
            }
          }
        }
        return spec;
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: SWAGGER_PATH,
  });

  await fastify.register(OpenApiGlue, {
    specification: path.join(__dirname, "../api.yaml"),
    serviceHandlers: { getTypes, codecToJson, jsonToCodec },
    noAdditional: true,
    prefix: "api/v1",
  });

  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
