import {
  block,
  codec,
  config,
  jam_host_calls as jam,
  state,
  state_merkleization as stateSer,
  state_vectors,
} from "@typeberry/lib";

type Clazz = {
  // biome-ignore lint/suspicious/noExplicitAny: we can't properly name the type here.
  Codec: codec.Codec<any>;
};

function newKind(
  name: string,
  clazz: Clazz,
  fullName: string = name,
): {
  name: string;
  fullName: string;
  clazz: Clazz;
} {
  return { name, fullName, clazz };
}

const headerKind = newKind("Header", block.Header);
const blockKind = newKind("Block", block.Block);

export const kinds = [
  headerKind,
  blockKind,
  newKind("Extrinsic", block.Extrinsic),
  newKind("EpochMarker", block.EpochMarker),
  newKind("AvailabilityAssurance", block.assurances.AvailabilityAssurance),
  newKind(
    "AssurancesExtrinsic",
    class AssurancesExtrinsic extends Array {
      static Codec = block.assurances.assurancesExtrinsicCodec;
    },
  ),
  newKind("Culprit", block.disputes.Culprit),
  newKind("Fault", block.disputes.Fault),
  newKind("Judgement", block.disputes.Judgement),
  newKind("Verdict", block.disputes.Verdict),
  newKind("DisputesExtrinsic", block.disputes.DisputesExtrinsic),
  newKind("Credential", block.guarantees.Credential),
  newKind("ReportGuarantee", block.guarantees.ReportGuarantee),
  newKind(
    "GuaranteesExtrinsic",
    class GuaranteesExtrinsic extends Array {
      static Codec = block.guarantees.guaranteesExtrinsicCodec;
    },
  ),
  newKind("Preimage", block.preimage.Preimage),
  newKind(
    "PreimageExtrinsic",
    class PreimageExtrinsic extends Array {
      static Codec = block.preimage.preimagesExtrinsicCodec;
    },
  ),
  newKind("RefineContext", block.refineContext.RefineContext),
  newKind("SignedTicket", block.tickets.SignedTicket),
  newKind("Ticket", block.tickets.Ticket),
  newKind(
    "TicketExtrinsic",
    class TicketExtrinsic extends Array {
      static Codec = block.tickets.ticketsExtrinsicCodec;
    },
  ),
  newKind("ImportSpec", block.workItem.ImportSpec),
  newKind("WorkItem", block.workItem.WorkItem),
  newKind("WorkItemExtrinsicSpec", block.workItem.WorkItemExtrinsicSpec),
  newKind("WorkPackage", block.workPackage.WorkPackage),
  newKind("WorkPackageSpec", block.workReport.WorkPackageSpec),
  newKind("WorkReport", block.workReport.WorkReport),
  newKind("WorkExecResult", block.workResult.WorkExecResult),
  newKind("WorkResult", block.workResult.WorkResult),
  newKind("u8", { Codec: codec.codec.u8 }),
  newKind("u16", { Codec: codec.codec.u16 }),
  newKind("u24", { Codec: codec.codec.u24 }),
  newKind("u32", { Codec: codec.codec.u32 }),
  newKind("varU32", { Codec: codec.codec.varU32 }),
  newKind("varU64", { Codec: codec.codec.varU64 }),
  newKind("i8", { Codec: codec.codec.i8 }),
  newKind("i16", { Codec: codec.codec.i16 }),
  newKind("i24", { Codec: codec.codec.i24 }),
  newKind("i32", { Codec: codec.codec.i32 }),
  newKind("Bytes<32>", { Codec: codec.codec.bytes(32) }),
  newKind("BytesBlob", { Codec: codec.codec.blob }),
  newKind("BitVec<?>", { Codec: codec.codec.bitVecVarLen }),
  // state stuff
  newKind("C1", stateSer.serialize.authPools, "Authorization Pools"),
  newKind("C2", stateSer.serialize.authQueues, "Authorization Queues"),
  newKind("C3", stateSer.serialize.recentBlocks, "Recent Blocks"),
  newKind("C4", stateSer.serialize.safrole, "Safrole Data"),
  newKind("C5", stateSer.serialize.disputesRecords, "Disputes Records"),
  newKind("C6", stateSer.serialize.entropy, "Entropy"),
  newKind("C7", stateSer.serialize.designatedValidators, "Designated Validators"),
  newKind("C8", stateSer.serialize.currentValidators, "Current Validators"),
  newKind("C9", stateSer.serialize.previousValidators, "Previous Validators"),
  newKind("C10", stateSer.serialize.availabilityAssignment, "Availability Assignment"),
  newKind("C11", stateSer.serialize.timeslot, "Timeslot"),
  newKind("C12", stateSer.serialize.privilegedServices, "Privileged Services"),
  newKind("C13", stateSer.serialize.statistics, "Statistics"),
  newKind("C14", stateSer.serialize.accumulationQueue, "Accumulation Queue"),
  newKind("C15", stateSer.serialize.accumulationQueue, "Recently Accumulated"),
  newKind("C16", stateSer.serialize.accumulationQueue, "Accumulation Output Log"),
  newKind("C255", state.ServiceAccountInfo, "Service Account"),
  newKind(
    "Cl",
    class LookupHistoryItem extends Array {
      static Codec = codec.codec.sequenceVarLen(codec.codec.u32);
    },
    "Lookup History Item",
  ),
  // host calls stuff
  newKind(
    "Host Call - Info: Account",
    class HostCallInfoAccount extends Object {
      static Codec = jam.hostCallInfoAccount;
    },
  ),
  // test stuff
  newKind("STF Genesis", state_vectors.StateTransitionGenesis),
  newKind("STF Vector", state_vectors.StateTransition),
];

type Spec = {
  readonly name: string;
  readonly spec: config.ChainSpec;
};

export const tinyChainSpec: Spec = {
  name: "Tiny",
  spec: config.tinyChainSpec,
};

export const ALL_CHAIN_SPECS: Spec[] = [
  tinyChainSpec,
  {
    name: "Full",
    spec: config.fullChainSpec,
  },
] as const;

export { headerKind, blockKind };
