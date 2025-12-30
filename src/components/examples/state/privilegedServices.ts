import { state } from "@typeberry/lib";

import { serviceGas, serviceId } from "../objects/helpers";
import { stateExampleSpec } from "./common";

export const privilegedServicesExample = state.PrivilegedServices.create({
  manager: serviceId(10),
  delegator: serviceId(20),
  registrar: serviceId(30),
  assigners: state.tryAsPerCore([serviceId(40), serviceId(50)], stateExampleSpec),
  autoAccumulateServices: new Map([
    [serviceId(60), serviceGas(2_000n)],
    [serviceId(70), serviceGas(3_000n)],
  ]),
});
