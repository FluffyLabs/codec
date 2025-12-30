import { collections, type config, state } from "@typeberry/lib";

import { filledHash } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

const AUTH_QUEUE_SIZE = 80 as state.AUTHORIZATION_QUEUE_SIZE;

const makeQueue = (offset: number) =>
  collections.FixedSizeArray.fill((index) => filledHash(offset + index), AUTH_QUEUE_SIZE);

export const authQueuesExample = (spec?: config.ChainSpec): state.PerCore<state.AuthorizationQueue> => {
  const resolvedSpec = resolveStateSpec(spec);
  const { coresCount } = getStateDimensions(resolvedSpec);

  return state.tryAsPerCore(
    Array.from({ length: coresCount }, (_, coreIndex) => makeQueue(coreIndex * 2 + 10)),
    resolvedSpec,
  );
};
