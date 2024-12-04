import {
  Block,
  EpochMarker,
  Extrinsic,
  Header,
  assurances,
  codec,
  disputes,
  gaurantees,
  preimage,
  refineContext,
  tickets,
  workItem,
  workPackage,
  workReport,
  workResult,
} from "@typeberry/block";

function newKind<T>(name: string, clazz: T) {
  return { name, clazz };
}

export const kinds = [
  newKind("Header", Header),
  newKind("Block", Block),
  newKind("Extrinsic", Extrinsic),
  newKind("EpochMarker", EpochMarker),
  newKind("AvailabilityAssurance", assurances.AvailabilityAssurance),
  newKind(
    "AssurancesExtrinsic",
    class AssurancesExtrinsic extends Array {
      static Codec = assurances.assurancesExtrinsicCodec;
    },
  ),
  newKind("Culprit", disputes.Culprit),
  newKind("Fault", disputes.Fault),
  newKind("Judgement", disputes.Judgement),
  newKind("Verdict", disputes.Verdict),
  newKind("DisputesExtrinsic", disputes.DisputesExtrinsic),
  newKind("Credential", gaurantees.Credential),
  newKind("ReportGuarantee", gaurantees.ReportGuarantee),
  newKind(
    "GuaranteesExtrinsic",
    class GuaranteesExtrinsic extends Array {
      static Codec = gaurantees.guaranteesExtrinsicCodec;
    },
  ),
  newKind("Preimage", preimage.Preimage),
  newKind(
    "PreimageExtrinsic",
    class PreimageExtrinsic extends Array {
      static Codec = preimage.preimagesExtrinsicCodec;
    },
  ),
  newKind("RefineContext", refineContext.RefineContext),
  newKind("SignedTicket", tickets.SignedTicket),
  newKind("Ticket", tickets.Ticket),
  newKind(
    "TicketExtrinsic",
    class TicketExtrinsic extends Array {
      static Codec = tickets.ticketsExtrinsicCodec;
    },
  ),
  newKind("ImportSpec", workItem.ImportSpec),
  newKind("WorkItem", workItem.WorkItem),
  newKind("WorkItemExtrinsicSpec", workItem.WorkItemExtrinsicSpec),
  newKind("WorkPackage", workPackage.WorkPackage),
  newKind("WorkPackageSpec", workReport.WorkPackageSpec),
  newKind("WorkReport", workReport.WorkReport),
  newKind("WorkExecResult", workResult.WorkExecResult),
  newKind("WorkResult", workResult.WorkResult),
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
] as const;

export const kindNames = kinds.map((kind) => kind.name);
