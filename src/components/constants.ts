import {
  block,
  type bytes,
  codec,
  config,
  jam_host_calls as jam,
  state,
  state_vectors,
  state_merkleization as stateSer,
} from "@typeberry/lib";
import { hostCallInfoAccountExample } from "./examples/host/infoAccount";
import { assurancesExtrinsicExample } from "./examples/objects/assurancesExtrinsic";
import { availabilityAssuranceExample } from "./examples/objects/availabilityAssurance";
import { blockExample } from "./examples/objects/block";
import { credentialExample } from "./examples/objects/credential";
import { culpritExample } from "./examples/objects/culprit";
import { disputesExtrinsicExample } from "./examples/objects/disputesExtrinsic";
import { epochMarkerExample } from "./examples/objects/epochMarker";
import { extrinsicExample } from "./examples/objects/extrinsic";
import { faultExample } from "./examples/objects/fault";
import { guaranteesExtrinsicExample } from "./examples/objects/guaranteesExtrinsic";
import { headerExample } from "./examples/objects/header";
import { importSpecExample } from "./examples/objects/importSpec";
import { judgementExample } from "./examples/objects/judgement";
import { preimageExample } from "./examples/objects/preimage";
import { preimageExtrinsicExample } from "./examples/objects/preimageExtrinsic";
import { refineContextExample } from "./examples/objects/refineContext";
import { reportGuaranteeExample } from "./examples/objects/reportGuarantee";
import { signedTicketExample } from "./examples/objects/signedTicket";
import { ticketExample } from "./examples/objects/ticket";
import { ticketExtrinsicExample } from "./examples/objects/ticketExtrinsic";
import { verdictExample } from "./examples/objects/verdict";
import { workExecResultExample } from "./examples/objects/workExecResult";
import { workItemExample } from "./examples/objects/workItem";
import { workItemExtrinsicSpecExample } from "./examples/objects/workItemExtrinsicSpec";
import { workPackageExample } from "./examples/objects/workPackage";
import { workPackageSpecExample } from "./examples/objects/workPackageSpec";
import { workReportExample } from "./examples/objects/workReport";
import { workResultExample } from "./examples/objects/workResult";
import { bitVecExample, bytes32Example, bytesBlobExample } from "./examples/primitives/data";
import { numericExamples } from "./examples/primitives/numerics";
import { accumulationOutputLogExample } from "./examples/state/accumulationOutputLog";
import { accumulationQueueExample } from "./examples/state/accumulationQueue";
import { authPoolsExample } from "./examples/state/authPools";
import { authQueuesExample } from "./examples/state/authQueues";
import { availabilityAssignmentExample } from "./examples/state/availabilityAssignment";
import { currentValidatorsExample } from "./examples/state/currentValidators";
import { designatedValidatorsExample } from "./examples/state/designatedValidators";
import { disputesRecordsExample } from "./examples/state/disputesRecords";
import { entropyExample } from "./examples/state/entropy";
import { lookupHistoryItemExample } from "./examples/state/lookupHistoryItem";
import { previousValidatorsExample } from "./examples/state/previousValidators";
import { privilegedServicesExample } from "./examples/state/privilegedServices";
import { recentBlocksExample } from "./examples/state/recentBlocks";
import { recentlyAccumulatedExample } from "./examples/state/recentlyAccumulated";
import { safroleDataExample } from "./examples/state/safroleData";
import { serviceAccountExample } from "./examples/state/serviceAccount";
import { statisticsExample } from "./examples/state/statistics";
import { timeslotExample } from "./examples/state/timeslot";
import { stfGenesisExample } from "./examples/stf/genesis";
import { stfVectorExample } from "./examples/stf/transition";

type ExampleValue = object | string | number | bigint | boolean | null;

type KindDescriptor = {
  readonly name: string;
  readonly fullName: string;
  readonly example: ExampleValue;
  readonly encode: (value: ExampleValue, context?: config.ChainSpec) => bytes.BytesBlob;
  readonly decode: (blob: bytes.BytesBlob, context?: config.ChainSpec) => ExampleValue;
};

const encodeWithContext = codec.Encoder.encodeObject as (
  encode: codec.Encode<never>,
  value: never,
  context?: config.ChainSpec,
) => bytes.BytesBlob;

const decodeWithContext = codec.Decoder.decodeObject as (
  decode: codec.Decode<ExampleValue>,
  blob: bytes.BytesBlob,
  context?: config.ChainSpec,
) => ExampleValue;

const newKind = <T>(
  name: string,
  clazz: { Codec: codec.Codec<T> },
  example: ExampleValue,
  fullName: string = name,
): KindDescriptor => ({
  name,
  fullName,
  example,
  encode: (value, context) => encodeWithContext(clazz.Codec as codec.Encode<never>, value as never, context),
  decode: (blob, context) => decodeWithContext(clazz.Codec as codec.Decode<ExampleValue>, blob, context),
});

const headerKind = newKind("Header", block.Header, headerExample);
const blockKind = newKind("Block", block.Block, blockExample);

export const kinds: KindDescriptor[] = [
  headerKind,
  blockKind,
  newKind("Extrinsic", block.Extrinsic, extrinsicExample),
  newKind("EpochMarker", block.EpochMarker, epochMarkerExample),
  newKind("AvailabilityAssurance", block.assurances.AvailabilityAssurance, availabilityAssuranceExample),
  newKind(
    "AssurancesExtrinsic",
    class AssurancesExtrinsic extends Array {
      static Codec = block.assurances.assurancesExtrinsicCodec;
    },
    assurancesExtrinsicExample,
  ),
  newKind("Culprit", block.disputes.Culprit, culpritExample),
  newKind("Fault", block.disputes.Fault, faultExample),
  newKind("Judgement", block.disputes.Judgement, judgementExample),
  newKind("Verdict", block.disputes.Verdict, verdictExample),
  newKind("DisputesExtrinsic", block.disputes.DisputesExtrinsic, disputesExtrinsicExample),
  newKind("Credential", block.guarantees.Credential, credentialExample),
  newKind("ReportGuarantee", block.guarantees.ReportGuarantee, reportGuaranteeExample),
  newKind(
    "GuaranteesExtrinsic",
    class GuaranteesExtrinsic extends Array {
      static Codec = block.guarantees.guaranteesExtrinsicCodec;
    },
    guaranteesExtrinsicExample,
  ),
  newKind("Preimage", block.preimage.Preimage, preimageExample),
  newKind(
    "PreimageExtrinsic",
    class PreimageExtrinsic extends Array {
      static Codec = block.preimage.preimagesExtrinsicCodec;
    },
    preimageExtrinsicExample,
  ),
  newKind("RefineContext", block.refineContext.RefineContext, refineContextExample),
  newKind("SignedTicket", block.tickets.SignedTicket, signedTicketExample),
  newKind("Ticket", block.tickets.Ticket, ticketExample),
  newKind(
    "TicketExtrinsic",
    class TicketExtrinsic extends Array {
      static Codec = block.tickets.ticketsExtrinsicCodec;
    },
    ticketExtrinsicExample,
  ),
  newKind("ImportSpec", block.workItem.ImportSpec, importSpecExample),
  newKind("WorkItem", block.workItem.WorkItem, workItemExample),
  newKind("WorkItemExtrinsicSpec", block.workItem.WorkItemExtrinsicSpec, workItemExtrinsicSpecExample),
  newKind("WorkPackage", block.workPackage.WorkPackage, workPackageExample),
  newKind("WorkPackageSpec", block.workReport.WorkPackageSpec, workPackageSpecExample),
  newKind("WorkReport", block.workReport.WorkReport, workReportExample),
  newKind("WorkExecResult", block.workResult.WorkExecResult, workExecResultExample),
  newKind("WorkResult", block.workResult.WorkResult, workResultExample),
  newKind("u8", { Codec: codec.codec.u8 }, numericExamples.u8),
  newKind("u16", { Codec: codec.codec.u16 }, numericExamples.u16),
  newKind("u24", { Codec: codec.codec.u24 }, numericExamples.u24),
  newKind("u32", { Codec: codec.codec.u32 }, numericExamples.u32),
  newKind("varU32", { Codec: codec.codec.varU32 }, numericExamples.varU32),
  newKind("varU64", { Codec: codec.codec.varU64 }, numericExamples.varU64),
  newKind("i8", { Codec: codec.codec.i8 }, numericExamples.i8),
  newKind("i16", { Codec: codec.codec.i16 }, numericExamples.i16),
  newKind("i24", { Codec: codec.codec.i24 }, numericExamples.i24),
  newKind("i32", { Codec: codec.codec.i32 }, numericExamples.i32),
  newKind("Bytes<32>", { Codec: codec.codec.bytes(32) }, bytes32Example),
  newKind("BytesBlob", { Codec: codec.codec.blob }, bytesBlobExample),
  newKind("BitVec<?>", { Codec: codec.codec.bitVecVarLen }, bitVecExample),
  // state stuff
  newKind("C1", stateSer.serialize.authPools, authPoolsExample, "Authorization Pools"),
  newKind("C2", stateSer.serialize.authQueues, authQueuesExample, "Authorization Queues"),
  newKind("C3", stateSer.serialize.recentBlocks, recentBlocksExample, "Recent Blocks"),
  newKind("C4", stateSer.serialize.safrole, safroleDataExample, "Safrole Data"),
  newKind("C5", stateSer.serialize.disputesRecords, disputesRecordsExample, "Disputes Records"),
  newKind("C6", stateSer.serialize.entropy, entropyExample, "Entropy"),
  newKind("C7", stateSer.serialize.designatedValidators, designatedValidatorsExample, "Designated Validators"),
  newKind("C8", stateSer.serialize.currentValidators, currentValidatorsExample, "Current Validators"),
  newKind("C9", stateSer.serialize.previousValidators, previousValidatorsExample, "Previous Validators"),
  newKind("C10", stateSer.serialize.availabilityAssignment, availabilityAssignmentExample, "Availability Assignment"),
  newKind("C11", stateSer.serialize.timeslot, timeslotExample, "Timeslot"),
  newKind("C12", stateSer.serialize.privilegedServices, privilegedServicesExample, "Privileged Services"),
  newKind("C13", stateSer.serialize.statistics, statisticsExample, "Statistics"),
  newKind("C14", stateSer.serialize.accumulationQueue, accumulationQueueExample, "Accumulation Queue"),
  newKind("C15", stateSer.serialize.recentlyAccumulated, recentlyAccumulatedExample, "Recently Accumulated"),
  newKind("C16", stateSer.serialize.accumulationOutputLog, accumulationOutputLogExample, "Accumulation Output Log"),
  newKind("C255", state.ServiceAccountInfo, serviceAccountExample, "Service Account"),
  newKind(
    "Cl",
    class LookupHistoryItem extends Array {
      static Codec = codec.codec.sequenceVarLen(codec.codec.u32);
    },
    lookupHistoryItemExample,
    "Lookup History Item",
  ),
  // host calls stuff
  newKind(
    "Host Call - Info: Account",
    class HostCallInfoAccount extends Object {
      static Codec = jam.hostCallInfoAccount;
    },
    hostCallInfoAccountExample,
  ),
  // test stuff
  newKind("STF Genesis", state_vectors.StateTransitionGenesis, stfGenesisExample),
  newKind("STF Vector", state_vectors.StateTransition, stfVectorExample),
];

export type KindName = KindDescriptor["name"];
export type KindExampleValue = ExampleValue;

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
