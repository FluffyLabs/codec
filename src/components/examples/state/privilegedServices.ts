import type * as config from "@typeberry/lib/config";
import * as state from "@typeberry/lib/state";

import { serviceGas, serviceId } from "../objects/helpers";
import { getStateDimensions, resolveStateSpec } from "./common";

export const privilegedServicesExample = (spec?: config.ChainSpec): state.PrivilegedServices => {
  const resolvedSpec = resolveStateSpec(spec);
  const { coresCount } = getStateDimensions(resolvedSpec);

  const assigners = state.tryAsPerCore(
    Array.from({ length: coresCount }, (_, index) => serviceId(40 + index)),
    resolvedSpec,
  );

  return state.PrivilegedServices.create({
    manager: serviceId(10),
    delegator: serviceId(20),
    registrar: serviceId(30),
    assigners,
    autoAccumulateServices: new Map([
      [serviceId(60), serviceGas(2_000n)],
      [serviceId(70), serviceGas(3_000n)],
    ]),
  });
};
