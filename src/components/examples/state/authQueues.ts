import { collections, state } from "@typeberry/lib";
import { filledHash } from "../objects/helpers";
import { stateExampleSpec } from "./common";

const AUTH_QUEUE_SIZE = 80 as state.AUTHORIZATION_QUEUE_SIZE;

const makeQueue = (offset: number) =>
  collections.FixedSizeArray.fill((index) => filledHash(offset + index), AUTH_QUEUE_SIZE);

export const authQueuesExample = state.tryAsPerCore([makeQueue(10), makeQueue(30)], stateExampleSpec);
