import { block, codec, config } from "@typeberry/lib";

type Clazz = {
  // biome-ignore lint/suspicious/noExplicitAny: we can't properly name the type here.
  Codec: codec.Codec<any>;
};

function newKind(
  name: string,
  clazz: Clazz,
): {
  name: string;
  clazz: Clazz;
} {
  return { name, clazz };
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
];

export const ALL_CHAIN_SPECS = [
  {
    name: "Tiny",
    spec: config.tinyChainSpec,
  },
  {
    name: "Full",
    spec: config.tinyChainSpec,
  },
];

export { headerKind, blockKind };
