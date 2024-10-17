import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Block,
  EpochMarker,
  Extrinsic,
  Header,
  assurances,
  bytes,
  codec,
  context,
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
import { Banner } from "./components/Banner/Banner";
import { Resizable } from "./components/Resizable/Resizable";

const kinds = [
  Header,
  Block,
  Extrinsic,
  EpochMarker,
  assurances.AvailabilityAssurance,
  class AssurancesExtrinsic extends Array {
    static Codec = assurances.assurancesExtrinsicCodec;
  },
  disputes.Culprit,
  disputes.Fault,
  disputes.Judgement,
  disputes.Verdict,
  disputes.DisputesExtrinsic,
  gaurantees.Credential,
  gaurantees.ReportGuarantee,
  class GuaranteesExtrinsic extends Array {
    static Codec = gaurantees.guaranteesExtrinsicCodec;
  },
  preimage.Preimage,
  class PreimageExtrinsic extends Array {
    static Codec = preimage.preimagesExtrinsicCodec;
  },
  refineContext.RefineContext,
  tickets.SignedTicket,
  tickets.Ticket,
  class TicketExtrinsic extends Array {
    static Codec = tickets.ticketsExtrinsicCodec;
  },
  workItem.ImportSpec,
  workItem.WorkItem,
  workItem.WorkItemExtrinsicSpec,
  workPackage.WorkPackage,
  workReport.WorkPackageSpec,
  workReport.WorkReport,
  workResult.WorkExecResult,
  workResult.WorkResult,
];

const chainSpecs = [
  {
    name: "Tiny",
    spec: context.tinyChainSpec,
  },
];

export function App() {
  const [input, setInput] = useState(TEST_HEADER);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState(0);
  const [result, setResult] = useState("");
  const [chainSpec, setChainSpec] = useState(0);

  useEffect(() => {
    try {
      const clazz = kinds[kind];
      if (!clazz) {
        throw new Error(`Invalid codec kind: ${kind}`);
      }
      const spec = chainSpecs[chainSpec];
      const decoded = codec.Decoder.decodeObject(clazz.Codec, bytes.BytesBlob.parseBlob(input), spec.spec);
      setResult(
        JSON.stringify(
          decoded,
          (_key, value) => {
            if (value instanceof bytes.BytesBlob) {
              return value.toString();
            }
            if (value instanceof bytes.Bytes) {
              return value.toString();
            }
            if (typeof value === "bigint") {
              return value.toString();
            }
            return value;
          },
          2,
        ),
      );
      setError(null);
    } catch (e) {
      setResult("");
      setError(`${e}`);
    }
    // decode
  }, [input, kind, chainSpec]);

  return (
    <>
      <Banner />
      <Resizable
        left={
          <CodecInput
            onChange={setInput}
            value={input}
            error={error}
            kind={kind}
            setKind={setKind}
            chainSpec={chainSpec}
            setChainSpec={setChainSpec}
          />
        }
        right={<Json result={result} />}
      />
    </>
  );
}

type CodecInputProps = {
  onChange: (v: string) => void;
  value: string;
  error: string | null;
  kind: number;
  setKind: (idx: number) => void;
  chainSpec: number;
  setChainSpec: (idx: number) => void;
};
function CodecInput({ onChange, value, error, kind, setKind, chainSpec, setChainSpec }: CodecInputProps) {
  const setBlock = useCallback(() => {
    onChange(TEST_BLOCK);
    setKind(kinds.indexOf(Block));
  }, [onChange, setKind]);
  const setHeader = useCallback(() => {
    onChange(TEST_HEADER);
    setKind(kinds.indexOf(Header));
  }, [onChange, setKind]);

  const load = useCallback(() => {
    const $input = document.createElement("input");
    $input.type = "file";
    $input.accept = ".bin";
    $input.click();
    $input.addEventListener("change", (ev) => {
      const target = ev.target as HTMLInputElement | null;
      const file = target?.files?.[0]; // Get the selected file

      if (file) {
        const reader = new FileReader();

        // Define the onload event, which is triggered when file reading is complete
        reader.onload = (e) => {
          const fileContent = e.target?.result as ArrayBuffer;
          onChange(bytes.BytesBlob.fromBlob(new Uint8Array(fileContent)).toString());
        };

        // Read the file as text (you can also read as data URL, binary, etc.)
        reader.readAsArrayBuffer(file);
      }
    });
  }, [onChange]);

  return (
    <div className="codecInput">
      <fieldset className="configuration">
        <legend>Configuration</legend>
        <label>
          JAM Object &nbsp;
          <select onChange={(e) => setKind(Number(e.target.value))} value={kind}>
            {kinds.map((k, idx) => (
              <option key={k.name} value={idx}>
                {k.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Chain Spec &nbsp;
          <select onChange={(e) => setChainSpec(Number(e.target.value))} value={chainSpec}>
            {chainSpecs.map((k, idx) => (
              <option key={k.name} value={idx}>
                {k.name}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <p />
      <fieldset>
        <legend>Data</legend>
        <label>
          Bytes blob as hex string
          <br />
          <textarea
            rows={4}
            className={error !== null ? "hasError" : ""}
            onChange={(ev) => onChange(ev.target.value)}
            value={value}
          />
        </label>
        <p className="error">{error}</p>
        {error && <KindFinder value={value} chainSpec={chainSpec} setKind={setKind} />}
      </fieldset>

      <p className="buttons">
        <button className="primary" onClick={load}>
          Load codec test vector
        </button>
        <button onClick={setBlock}>Block Example</button>
        <button onClick={setHeader}>Header Example</button>
      </p>
    </div>
  );
}

function KindFinder({
  value,
  setKind,
  chainSpec,
}: { value: string; chainSpec: number; setKind: (idx: number) => void }) {
  const foundKind = useMemo(() => {
    const spec = chainSpecs[chainSpec].spec;
    const blob = bytes.BytesBlob.parseBlob(value);
    for (const kind of kinds) {
      try {
        codec.Decoder.decodeObject(kind.Codec, blob, spec);
        return kind;
      } catch {}
    }
    return null;
  }, [value, chainSpec]);

  if (!foundKind) {
    return <p>Unable to detect the type of input. Perhaps choose different chain spec?</p>;
  }

  return (
    <p>
      The input looks a lot like{" "}
      <a href="#" onClick={() => setKind(kinds.indexOf(foundKind))}>
        {foundKind.name}
      </a>
      .
    </p>
  );
}

function Json({ result }: { result: string }) {
  return <pre>{result}</pre>;
}
const TEST_HEADER =
  "0x5c743dbc514284b2ea57798787c5a155ef9d7ac1e9499ec65910a7a3d65897b72591ebd047489f1006361a4254731466a946174af02fe1d86681d254cfd4a00b74a9e79d2618e0ce8720ff61811b10e045c02224a09299f04e404a9656e85c812a00000001ae85d6635e9ae539d0846b911ec86a27fe000f619b78bcac8a74b77e36f6dbcf5e465beb01dbafe160ce8216047f2155dd0569f058afd52dcea601025a8d161d3d5e5a51aab2b048f8686ecd79712a80e3265a114cc73f14bdb2a59233fb66d0aa2b95f7572875b0d0f186552ae745ba8222fc0b5bd456554bfe51c68938f8bc7f6190116d118d643a98878e294ccf62b509e214299931aad8ff9764181a4e3348e5fcdce10e0b64ec4eebd0d9211c7bac2f27ce54bca6f7776ff6fee86ab3e3f16e5352840afb47e206b5c89f560f2611835855cf2e6ebad1acc9520a72591d00013b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da290300ae85d6635e9ae539d0846b911ec86a27fe000f619b78bcac8a74b77e36f6dbcf49a52360f74a0233cea0775356ab0512fafff0683df08fae3cb848122e296cbc50fed22418ea55f19e55b3c75eb8b0ec71dcae0d79823d39920bf8d6a2256c5f31dc5b1e9423eccff9bccd6549eae8034162158000d5be9339919cc03d14046e6431c14cbb172b3aed702b9e9869904b1f39a6fe1f3e904b0fd536f13e8cac496682e1c81898e88e604904fa7c3e496f9a8771ef1102cc29d567c4aad283f7b0";

const TEST_BLOCK =
  "0x5c743dbc514284b2ea57798787c5a155ef9d7ac1e9499ec65910a7a3d65897b72591ebd047489f1006361a4254731466a946174af02fe1d86681d254cfd4a00b74a9e79d2618e0ce8720ff61811b10e045c02224a09299f04e404a9656e85c812a00000001ae85d6635e9ae539d0846b911ec86a27fe000f619b78bcac8a74b77e36f6dbcf5e465beb01dbafe160ce8216047f2155dd0569f058afd52dcea601025a8d161d3d5e5a51aab2b048f8686ecd79712a80e3265a114cc73f14bdb2a59233fb66d0aa2b95f7572875b0d0f186552ae745ba8222fc0b5bd456554bfe51c68938f8bc7f6190116d118d643a98878e294ccf62b509e214299931aad8ff9764181a4e3348e5fcdce10e0b64ec4eebd0d9211c7bac2f27ce54bca6f7776ff6fee86ab3e3f16e5352840afb47e206b5c89f560f2611835855cf2e6ebad1acc9520a72591d00013b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da290300ae85d6635e9ae539d0846b911ec86a27fe000f619b78bcac8a74b77e36f6dbcf49a52360f74a0233cea0775356ab0512fafff0683df08fae3cb848122e296cbc50fed22418ea55f19e55b3c75eb8b0ec71dcae0d79823d39920bf8d6a2256c5f31dc5b1e9423eccff9bccd6549eae8034162158000d5be9339919cc03d14046e6431c14cbb172b3aed702b9e9869904b1f39a6fe1f3e904b0fd536f13e8cac496682e1c81898e88e604904fa7c3e496f9a8771ef1102cc29d567c4aad283f7b003008c25c063c631c0d4cd0206159b3495deb761cc057e06192fe5497dc9b3744c7b9e975801b14185ebe44f91704eb45f652ed1913c35bd733813a32bca7f7d02bec508724e0bc643989f015d7f4bc483fb6c10f01a8279ab75067316fd3463bcc215f1b0dc85250b15bc42aa7473561204bd8aae566d506e2b0cfd7adbc44ca17d94226eb0cfc09c2180acd27d184f272af2bd2d9c57fb54b134eebccecab7dec04483bb191cf889a5e2852ade92ada839cdad17b7dc9525ecb2e134c5dc415743f8f564c386a7c4d7bca8bc6a5dc125308fbb274c44f5bbe911d9ce5c670044e3343986cf66900c198bb377b53a607a0b23ac9caac9ef751a7850488854381bc2ad3cdec73e3be1cc7d014cf92b4ef289b1bfa15124e147b3c4d902c89bf1195d15452e4bde9599392a3099b783dca00dcfb6540d2eda3c05cbf5415608105e60181da8f9d7729c3cc22228a2f1dbd562ee6400c0aa74d17cab13f7014febebecaed9c3a079cbaa92fc71443635d4149ca39e89c7d157e238f856a0701a664e1ff99a7b8b0a18fb9733d1e9255bff6a5345896d0696c2094e24f8b5eeb7538a96edf09830291df328d633d098ee2e4ad1b037590390c393c7ec85f0308b198f5a7f0d0d171ba7d1623f2c7c4131f8fd76ce67c1fe363d029099d454e316e842785f6bac40e7bba10217e3f457755c0fd35251a99ea180df1c7a6ba824166243109de8bb00b2aeb7436d15ebd2d1fbf40d389158903a1d95344a0492909bce4719ae43c4c8623ad733a9621e87b8f737b8ee1af9fb4180eccb9716804afaf59393113d3b10a359b65ff7b9ead5cb36bc576ad8c58a5c8750403971347f9a27c7022b8c56f754f7d5b353cce72b12fc9f317307d6a2999daf1de765f56bcf6859792fc208a1458902a7255c3ea59c172238236dc5e7e10b1b96d657c2d5f0c13afa9c8ff7288c6349ede216e8069a26b1d4254e0ac4c783f54922976b8430464a4f7bec582750820276cda6deac10dece627b1def68f02160bcc98add96b4198e279eafdc5f4fc54f074e2011ddb4faa336960cd3cf4bbcbbe7015632fb800298d8484e05430bf95773da1d76bef380a1f4012f24ea5c5cfc5631ea3b7799222ca555250b8591751fd1d59df4abeb690d66e634aceeaf381ac13f60ee9dcd6c4645385b029b8776d7c0d8edddba0f039e3e7efca4d9c13fe75b27834585d9ac0e8f427efa5ed25d13d9f42a34c834ec1a5c2f07076e2677a80977884012425bfe958b306e2deb61b677bd4e4952df117fab2a3d2bdf4be8e7bae62f1415dd86adeb8bfa5bcf7a329ed19cb770750c1ee3901502ac3d44882f3cb85c78dd1164cdf48f9742ed80dc644c4a6117e95b90b4403f2cbcb44856c7aeae36aa64ee19c671350a1fffa4c0eead5863430c72d9681d80a66a95e083051eabe71518efb861c9a2316d949b177b8d415855625996c2322183506053ed443a24107e8826f2f30f1d0196df96edf78718a587f89e5aa52ca187a7e04ed51433fb030af5633510042de1e904ec2478743c58d3535151b430452e82e77608d6ee7f56a1a1446b4fa6d89aa979a90422233a05b82564695ff4b6361d920a22c441c6f0505fa260a71b7e1f278711f27ebd9c00b4885a671021d0d75bc9a9c95ceb73cadb1c301f1da2111a86a5f87a8a7d5153ebbc98bf3a83ef65e5d7aedec99927bc5138dacbc75e8391f91537417ee7f8d72869df185a333d081423f4222c114a04727e0de4169b0e32f3b85b9cdab701208a2b39c7fb0892e09b01186f76ea73bd927fcef68886433ca15f4c968581d50fabed92a7dd7f005fb99c5d5fafbacd763c2c401dbbd3e89eee769ff41ed06b771675070242405e5ac7bae5f547b7e64ee82aca2e32977453da4c5651038e51420c33dfeb24f8a6ea1271de70e1dc8100dbf0df3d71cb30915cb8937cc31caa7cfc0ed5bca03de30ab2e67e55feffcc0c8db7e98414ef85896b9b881958527a9f2d0cc68b02795f4131c3812b1393ce9f6f0617d1aec9a3cd51be4bddb7a75cc8bc710197e618407fe4a1b8908dac4b8031d22e8f7591304c8641daf97abcbc55e81de7b935b94ef074fcb19808e7c3fa0ce827f70a3feb301da33af34fb9a4ad21acc7dcabcabe06f9fba188eeb9e30badc43fda3030fb8f888a41a8822c7fa32ff8fe0dd2abfc7d6323ebcdd0092d5f82c5d94e6ea29600036479afe8e29f97741a1e3c2b59c217dc67d8a25f7ce12bf1febf6b4a5b2646fd81cdf0a75e20fc0de981f48471527728b0c4d151fbdd9b32e6c6b3c6cd71db9b51d1cca8eef4a128d63f542bdb129c6edca628e1276d8376347bd2071d949b7ec5d1bfc18ebc61753a5f24544d1ae75b6f6f35a5707fc99e787b86cb5a17138069f5bac8d16e08b20781b8841ff928a49ec7bf09f5f39159cb44370a5ce16b93b2d4325445bfd641f2ef750e1971690a4f11e815d418a4dca01f8d039f4543a59665dcea27a24dbb1fddca0a2e90b4e3292dfc7a5cee69c1e707cd491742f3d3015d9499b07bbf6ddc2342e48522c149089311cf6ccc9bf957b509e52df550f06e70f4f601c01c1326e0ce7e7ce2547fcc16509b8bdb1577b15adb042f1e393c01bc010ba3460119ab738e58e39297278315b0825b8b798835a7a0b133a0d890a24018f0797c3ba43d62dcda03320215c5734bc1b10e8bef5003aefb5513ce9cd1964db23b1a143c4da8142676e254f00f84cfc15fa1a3bab78536f5f9e2cbce7560be876142a8655b8c1fdf0ffab7e187ace3c37ed2c6dfc4590e658ad2efc8cdec6140452493e2693e682946d1c99a62cca529f46a6e9874ef72955e4d855881e35ef53fd95e307f9ebf94542860711bdd288ab13d8dec1fecd82fc9a2eb97e67ae38ec859034473972157b819b3215e359bf17952b95aaa2932f09e2a8c8e0fea82de9c6c2612766ed50702667520fbd5089c0cc300e9d32893799cf73520f5a925bdfb791a419e80e118d2ba69031566da30c06f5e83e74f4eae8a886018a4c1269a97217851bcb4bb945dbf1309d1d2e59d78474f5e52702536761eed0d9fd01e46261b61dca3fc85a0b4bdfa315edb0972fed80399909eef35ed10cda0e1a66680eedcf15b400d404dadf77cda5641412c20a465cea4411820ee491678821eef8dca745a2ffd8a787837d22b486342499ad84a51d4093655947185bfe72018c16b8fe622ab58c7d965e8dac3b1d5c9cedfb27f562d077ab85e1293496d69f6bafd8468855b50255788b430ed6e6ef8c0fde28651b005a91dbb0fd4d0635108d5ff9e4527fefa66817221b76f02dd1b65c036547750d2f84ff4c6fac7de56944658530a62e81c6cc290087440d003000000010000c072848f5bc77d85a09dc4e69f3420293891163406ec3a49ccf31a5ff8c063042a9c8c59e5f83d4d276ab4110af0ca85d7a713434694f8c6b391b122c303aadb010100cb021d8507925eb2d49040cc08cbcca0af197c5f3eb7aad639a82497a8d6046780da26d4cbc113b375c34298bc5be500eb088a33a099f86e428154c9f6724d8c01020028e928fc44c1bf90f9c68001e59d89e855f5db43a75b256d89e2008e2d472bf57e3f7743e52ebde917b12f51135f8918cfdcba29115cc4856a9dc984efe9fe5e0103004a7237797e717725fbc0f43a5bbc50b318db3e59f5f536776a189bf65c6508100eedbb2bae1e2ed123c2fb025ca8e8b7f306ced32b03fd98c1045aef4153a1ae010400c20960a26a917aa7376623c7612c50741ed3442172c62edce97c5c8c9ced29179d1d5cb8aa8fbb8d6f42d49761f85ec4705b054c76f82a9d31dc05fec139b5102bdbba473648c1414a534e2cd362571cfb340151d6bb268db379c5997b08dc6103000000000000cb0d510da863ab88970035c564818ed98b1a3243e2ea7de5f3f9b91e8379296746d96d19de9e4f536170c9fcea20bb325472d44b922a34ad7a27743631bfd0240001001a509d06dad9740f09a2c3fea342a172167708819b731c0df4df8a6b890def37b2d9a6c05e044d169e32dfbece42c74f2271fed95592f4c2b36aa23da88968820002000fe8a4cd86dd6d4e1fa6c9ed4baa11cdd793f0af31b177d17337cd11e2e91a15c0a098cabd79911c2572896500ce82a98519c4f937e462feb80e01f182b0a8cb000300bac9cf0c23a6bca795a71cc4f7432e41eeab1e864176c2dd499c547e6c501e490fe0ad051e7c165b4264ae6c167ef85ebf1191d664f7f1c53fa53c6c798bc6cb000400b47e1f3145a2f4a6221f5072197cb87316d38e44bc8363272cac8b87397629bac5092bbae7c4738079cecc2b2468e23b281e5c833435ed5918c3b0aa150472360299841f584606ab31badcdf38e8122874a699e0cb3989d8ddc7c0874b8f5f76bf3b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da2999841f584606ab31badcdf38e8122874a699e0cb3989d8ddc7c0874b8f5f76bfc87c17f29dfbde33cfe599f3fb71d0fc211140801080ec105fbf435a977f784ad0e1f11843bda78bec027cd2046488ec6c54bbbfa8170442c988768eb006a16a22351e22105a19aabb42589162ad7f1ea0df1c25cebf0e4a9fcd261301274862d0e1f11843bda78bec027cd2046488ec6c54bbbfa8170442c988768eb006a16ad1d7e7fd185aebad9fd4ddbd0a8707eeb17bf9e70509aaf7b176da7a72e2e54a01536fd52c4f4b1330e67d49717974435bf1c18edd91b69d343186a784844415bc003b6a27bcceb6a42d62a3a8d02a6f0d73653215771de243a63ac048a18b59da29557e5ee3660be9247c4908c74a46c91eebd713925dd7f2ede3ef4900ba277039f7d46ec15432116176cce8ce39d8ae21eabafdf71796eeb724ee7e4ff1dd1fd703040302011081095e6122e3bc9d961e00014a7fc8330503020110d257bc7d93a55be3561d720d40a6a342060302011038db056c7c3065fadb630ce6ccbc7385020cffbf67aae50aeed3c6f8f0d9bf7d854ffd87cef8358cbbaa587a9e3bd1a7760100002d8ec7b235be3b3cbe9be3d5ff36f082942102d64a0dc5953709a95cca55b58b1af297f534d464264be77477b547f3c596b947edbca33f6631f1aa188d25a38b2398ce69c3585e1b1b574a5a7185a2a086350abd4606d15aace8b4610b494772010100dda7a577f150ee83afedc9d3b50a4f00fcf21248e6f73097abcc4bb634f854aedc53769838d294b09c0184fb0e66f09bae8cc243f842a6cc401488591e9ffdb10130466e0ae1b05dde5249872475f6beeac368fd014b5a3413ceb32d38721432842a0000007af11fdaa717c398e223211842b41392f18df4bbc4ea0f4cfb972f19c7a64949e8e52949f6e4fb1d943248df48c3f2b538200fddfea22388e5e061be8ebf21a7c0564c5e0de0942589df4343ad1956da66797240e2a2f2d6f8116b5047768986f6967658df626fa39cbfb6014b50196d23bc2cfbfa71a7591ca7715472dd2b489329de635d4bbb8c47cdccbbc1285e48bf9dbad365af44b205343e99dea298f360751ab5b251361fbfd3ad5b0e84f051ccece6b00830aed31a5354e00b20b9ed21000000000300022e5e165cc8bd586404257f5cd6f5a31177b5c951eb076c7c10174f90006eef050102030405020403020170a50829851e8f6a8c80f92806ae0e95eb7c06ad064e311cc39107b3219e532efa99b97e72fcfaef616108de981a59dc3310e2a9f5e73cd44d702ecaaccd86962a000000000000000003aabbcc08070605fcfc857dab216daf41f409c2012685846e4d34aedfeacaf84d9adfebda73fae6d55e07438aeeeb0d6509ab28af8a758d1fb70424db6b27c7e1ef6473e721c3282100000000000000022a0000000200005f6e74d204c2490e71be4451963d7d7da797d4fd37d6e0bda56927d02a3302ca3b3a0e08c961e7580e97a0f08c269f549728f52d9c7de3affe850a037138001201003a6813f7691895a444d72cad60e3d54d64266fbaf567d7a5816a6623edcdbafed304517e4de88a399ed4d3faa2fc86e38243acbf480a652a236c27e515939032";
