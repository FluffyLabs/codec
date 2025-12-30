import { collections, state } from "@typeberry/lib";
import { filledHash } from "../objects/helpers";
import { stateExampleSpec } from "./common";

const makePool = (...seeds: number[]) => collections.asKnownSize(seeds.map((seed) => filledHash(seed)));

export const authPoolsExample = state.tryAsPerCore([makePool(1, 2, 3), makePool(4, 5)], stateExampleSpec);
