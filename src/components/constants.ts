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

type ExampleFactory<T> = (spec?: config.ChainSpec) => T;

type KindDescriptor<T> = {
  readonly name: string;
  readonly fullName: string;
  readonly example: ExampleFactory<T>;
  readonly encode: (value: T, context: config.ChainSpec) => bytes.BytesBlob;
  readonly decode: (blob: bytes.BytesBlob, context: config.ChainSpec) => T;
};

const newKind = <Value, F extends ExampleFactory<Value>>(
  name: string,
  codecValue: codec.Codec<Value>,
  example: F,
  fullName: string = name,
): KindDescriptor<unknown> => ({
  name,
  fullName,
  example,
  encode: (value: unknown, context: config.ChainSpec) =>
    codec.Encoder.encodeObject(codecValue, value as Value, context),
  decode: (blob: bytes.BytesBlob, context: config.ChainSpec) => codec.Decoder.decodeObject(codecValue, blob, context),
});

export const headerKind = newKind("Header", block.Header.Codec, headerExample);
const blockKindInternal = newKind("Block", block.Block.Codec, blockExample);

const extrinsicKind = newKind("Extrinsic", block.Extrinsic.Codec, extrinsicExample);
const epochMarkerKind = newKind("EpochMarker", block.EpochMarker.Codec, epochMarkerExample);
const availabilityAssuranceKind = newKind(
  "AvailabilityAssurance",
  block.assurances.AvailabilityAssurance.Codec,
  availabilityAssuranceExample,
);
const assurancesExtrinsicKind = newKind(
  "AssurancesExtrinsic",
  block.assurances.assurancesExtrinsicCodec,
  assurancesExtrinsicExample,
);
const culpritKind = newKind("Culprit", block.disputes.Culprit.Codec, culpritExample);
const faultKind = newKind("Fault", block.disputes.Fault.Codec, faultExample);
const judgementKind = newKind("Judgement", block.disputes.Judgement.Codec, judgementExample);
const verdictKind = newKind("Verdict", block.disputes.Verdict.Codec, verdictExample);
const disputesExtrinsicKind = newKind(
  "DisputesExtrinsic",
  block.disputes.DisputesExtrinsic.Codec,
  disputesExtrinsicExample,
);
const credentialKind = newKind("Credential", block.guarantees.Credential.Codec, credentialExample);
const reportGuaranteeKind = newKind("ReportGuarantee", block.guarantees.ReportGuarantee.Codec, reportGuaranteeExample);
const guaranteesExtrinsicKind = newKind(
  "GuaranteesExtrinsic",
  block.guarantees.guaranteesExtrinsicCodec,
  guaranteesExtrinsicExample,
);
const preimageKind = newKind("Preimage", block.preimage.Preimage.Codec, preimageExample);
const preimageExtrinsicKind = newKind(
  "PreimageExtrinsic",
  block.preimage.preimagesExtrinsicCodec,
  preimageExtrinsicExample,
);
const refineContextKind = newKind("RefineContext", block.refineContext.RefineContext.Codec, refineContextExample);
const signedTicketKind = newKind("SignedTicket", block.tickets.SignedTicket.Codec, signedTicketExample);
const ticketKind = newKind("Ticket", block.tickets.Ticket.Codec, ticketExample);
const ticketExtrinsicKind = newKind("TicketExtrinsic", block.tickets.ticketsExtrinsicCodec, ticketExtrinsicExample);
const importSpecKind = newKind("ImportSpec", block.workItem.ImportSpec.Codec, importSpecExample);
const workItemKind = newKind("WorkItem", block.workItem.WorkItem.Codec, workItemExample);
const workItemExtrinsicSpecKind = newKind(
  "WorkItemExtrinsicSpec",
  block.workItem.WorkItemExtrinsicSpec.Codec,
  workItemExtrinsicSpecExample,
);
const workPackageKind = newKind("WorkPackage", block.workPackage.WorkPackage.Codec, workPackageExample);
const workPackageSpecKind = newKind("WorkPackageSpec", block.workReport.WorkPackageSpec.Codec, workPackageSpecExample);
const workReportKind = newKind("WorkReport", block.workReport.WorkReport.Codec, workReportExample);
const workExecResultKind = newKind("WorkExecResult", block.workResult.WorkExecResult.Codec, workExecResultExample);
const workResultKind = newKind("WorkResult", block.workResult.WorkResult.Codec, workResultExample);
const u8Kind = newKind("u8", codec.codec.u8, numericExamples.u8);
const u16Kind = newKind("u16", codec.codec.u16, numericExamples.u16);
const u24Kind = newKind("u24", codec.codec.u24, numericExamples.u24);
const u32Kind = newKind("u32", codec.codec.u32, numericExamples.u32);
const varU32Kind = newKind("varU32", codec.codec.varU32, numericExamples.varU32);
const varU64Kind = newKind("varU64", codec.codec.varU64, numericExamples.varU64);
const i8Kind = newKind("i8", codec.codec.i8, numericExamples.i8);
const i16Kind = newKind("i16", codec.codec.i16, numericExamples.i16);
const i24Kind = newKind("i24", codec.codec.i24, numericExamples.i24);
const i32Kind = newKind("i32", codec.codec.i32, numericExamples.i32);
const bytes32Kind = newKind("Bytes<32>", codec.codec.bytes(32), bytes32Example);
const bytesBlobKind = newKind("BytesBlob", codec.codec.blob, bytesBlobExample);
const bitVecKind = newKind("BitVec<?>", codec.codec.bitVecVarLen, bitVecExample);
const c1Kind = newKind("C1", stateSer.serialize.authPools.Codec, authPoolsExample, "Authorization Pools");
const c2Kind = newKind("C2", stateSer.serialize.authQueues.Codec, authQueuesExample, "Authorization Queues");
const c3Kind = newKind("C3", stateSer.serialize.recentBlocks.Codec, recentBlocksExample, "Recent Blocks");
const c4Kind = newKind("C4", stateSer.serialize.safrole.Codec, safroleDataExample, "Safrole Data");
const c5Kind = newKind("C5", stateSer.serialize.disputesRecords.Codec, disputesRecordsExample, "Disputes Records");
const c6Kind = newKind("C6", stateSer.serialize.entropy.Codec, entropyExample, "Entropy");
const c7Kind = newKind(
  "C7",
  stateSer.serialize.designatedValidators.Codec,
  designatedValidatorsExample,
  "Designated Validators",
);
const c8Kind = newKind(
  "C8",
  stateSer.serialize.currentValidators.Codec,
  currentValidatorsExample,
  "Current Validators",
);
const c9Kind = newKind(
  "C9",
  stateSer.serialize.previousValidators.Codec,
  previousValidatorsExample,
  "Previous Validators",
);
const c10Kind = newKind(
  "C10",
  stateSer.serialize.availabilityAssignment.Codec,
  availabilityAssignmentExample,
  "Availability Assignment",
);
const c11Kind = newKind("C11", stateSer.serialize.timeslot.Codec, timeslotExample, "Timeslot");
const c12Kind = newKind(
  "C12",
  stateSer.serialize.privilegedServices.Codec,
  privilegedServicesExample,
  "Privileged Services",
);
const c13Kind = newKind("C13", stateSer.serialize.statistics.Codec, statisticsExample, "Statistics");
const c14Kind = newKind(
  "C14",
  stateSer.serialize.accumulationQueue.Codec,
  accumulationQueueExample,
  "Accumulation Queue",
);
const c15Kind = newKind(
  "C15",
  stateSer.serialize.recentlyAccumulated.Codec,
  recentlyAccumulatedExample,
  "Recently Accumulated",
);
const c16Kind = newKind(
  "C16",
  stateSer.serialize.accumulationOutputLog.Codec,
  accumulationOutputLogExample,
  "Accumulation Output Log",
);
const c255Kind = newKind("C255", state.ServiceAccountInfo.Codec, serviceAccountExample, "Service Account");
const clKind = newKind(
  "Cl",
  codec.codec.sequenceVarLen(codec.codec.u32),
  lookupHistoryItemExample,
  "Lookup History Item",
);
const hostInfoAccountKind = newKind("Host Call - Info: Account", jam.hostCallInfoAccount, hostCallInfoAccountExample);
const stfGenesisKind = newKind("STF Genesis", state_vectors.StateTransitionGenesis.Codec, stfGenesisExample);
const stfVectorKind = newKind("STF Vector", state_vectors.StateTransition.Codec, stfVectorExample);

export const kinds = [
  headerKind,
  blockKindInternal,
  extrinsicKind,
  epochMarkerKind,
  availabilityAssuranceKind,
  assurancesExtrinsicKind,
  culpritKind,
  faultKind,
  judgementKind,
  verdictKind,
  disputesExtrinsicKind,
  credentialKind,
  reportGuaranteeKind,
  guaranteesExtrinsicKind,
  preimageKind,
  preimageExtrinsicKind,
  refineContextKind,
  signedTicketKind,
  ticketKind,
  ticketExtrinsicKind,
  importSpecKind,
  workItemKind,
  workItemExtrinsicSpecKind,
  workPackageKind,
  workPackageSpecKind,
  workReportKind,
  workExecResultKind,
  workResultKind,
  u8Kind,
  u16Kind,
  u24Kind,
  u32Kind,
  varU32Kind,
  varU64Kind,
  i8Kind,
  i16Kind,
  i24Kind,
  i32Kind,
  bytes32Kind,
  bytesBlobKind,
  bitVecKind,
  // state stuff
  c1Kind,
  c2Kind,
  c3Kind,
  c4Kind,
  c5Kind,
  c6Kind,
  c7Kind,
  c8Kind,
  c9Kind,
  c10Kind,
  c11Kind,
  c12Kind,
  c13Kind,
  c14Kind,
  c15Kind,
  c16Kind,
  c255Kind,
  clKind,
  // host calls stuff
  hostInfoAccountKind,
  // test stuff
  stfGenesisKind,
  stfVectorKind,
  // ensure exhaustive coverage of example union
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
