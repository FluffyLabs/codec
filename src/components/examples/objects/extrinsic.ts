import { block, bytes, collections, numbers } from "@typeberry/lib";

const { asKnownSize, FixedSizeArray } = collections;

const zeroHash = () => bytes.Bytes.zero(32).asOpaque();
const zeroSignature = () => bytes.Bytes.zero(64).asOpaque();
const zeroBandersnatchProof = () => bytes.Bytes.zero(784).asOpaque();

const signedTicket = block.tickets.SignedTicket.create({
  attempt: block.tickets.tryAsTicketAttempt(1),
  signature: zeroBandersnatchProof(),
});

const preimage = block.preimage.Preimage.create({
  requester: block.tryAsServiceId(7),
  blob: bytes.BytesBlob.blobFromString("demo preimage payload"),
});

const bitfield = bytes.BitVec.empty(8);
bitfield.setBit(0, true);

const assurance = block.assurances.AvailabilityAssurance.create({
  anchor: zeroHash(),
  bitfield,
  validatorIndex: block.tryAsValidatorIndex(2),
  signature: zeroSignature(),
});

const workPackageSpec = block.workReport.WorkPackageSpec.create({
  hash: zeroHash(),
  length: numbers.tryAsU32(4),
  erasureRoot: bytes.Bytes.fill(32, 1),
  exportsRoot: zeroHash(),
  exportsCount: numbers.tryAsU16(2),
});

const refineContext = block.refineContext.RefineContext.create({
  anchor: zeroHash(),
  stateRoot: zeroHash(),
  beefyRoot: zeroHash(),
  lookupAnchor: zeroHash(),
  lookupAnchorSlot: block.tryAsTimeSlot(12),
  prerequisites: [zeroHash()],
});

const segmentInfo = block.refineContext.WorkPackageInfo.create({
  workPackageHash: zeroHash(),
  segmentTreeRoot: zeroHash(),
});

const workExecResult = new block.workResult.WorkExecResult(
  block.workResult.WorkExecResultKind.ok,
  bytes.BytesBlob.blobFromString("work result"),
);

const load = block.workResult.WorkRefineLoad.create({
  gasUsed: block.tryAsServiceGas(5_000),
  importedSegments: numbers.tryAsU32(1),
  extrinsicCount: numbers.tryAsU32(1),
  extrinsicSize: numbers.tryAsU32(256),
  exportedSegments: numbers.tryAsU32(0),
});

const workResult = block.workResult.WorkResult.create({
  serviceId: block.tryAsServiceId(10),
  codeHash: zeroHash(),
  payloadHash: bytes.Bytes.fill(32, 2),
  gas: block.tryAsServiceGas(1_000),
  result: workExecResult,
  load,
});

const workResults = FixedSizeArray.new([workResult], block.workPackage.tryAsWorkItemsCount(1));

const workReport = block.workReport.WorkReport.create({
  workPackageSpec,
  context: refineContext,
  coreIndex: block.tryAsCoreIndex(3),
  authorizerHash: zeroHash(),
  authorizationOutput: bytes.BytesBlob.blobFromString("auth output"),
  segmentRootLookup: [segmentInfo],
  results: workResults,
  authorizationGasUsed: block.tryAsServiceGas(7_500),
});

const credentials = asKnownSize([
  block.guarantees.Credential.create({
    validatorIndex: block.tryAsValidatorIndex(0),
    signature: zeroSignature(),
  }),
  block.guarantees.Credential.create({
    validatorIndex: block.tryAsValidatorIndex(1),
    signature: zeroSignature(),
  }),
]);

const reportGuarantee = block.guarantees.ReportGuarantee.create({
  report: workReport,
  slot: block.tryAsTimeSlot(20),
  credentials,
});

const extrinsicExampleObject = block.Extrinsic.create({
  tickets: asKnownSize([signedTicket]),
  preimages: [preimage],
  guarantees: asKnownSize([reportGuarantee]),
  assurances: asKnownSize([assurance]),
  disputes: block.disputes.DisputesExtrinsic.create({
    verdicts: [],
    culprits: [],
    faults: [],
  }),
});

export const extrinsicExample: unknown = extrinsicExampleObject;
