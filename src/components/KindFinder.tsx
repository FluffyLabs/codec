import { Button } from "@fluffylabs/shared-ui";
import { bytes, codec } from "@typeberry/lib";
import { InfoIcon } from "lucide-react";
import { useMemo } from "react";
import { ALL_CHAIN_SPECS, kinds } from "./constants";

export function KindFinder({
  value,
  setKind,
  chainSpec,
}: { value: string; chainSpec: string; setKind: (name: string) => void }) {
  const foundKind = useMemo(() => {
    const spec = ALL_CHAIN_SPECS.find((v) => v.name === chainSpec);
    let blob: bytes.BytesBlob;
    try {
      blob = bytes.BytesBlob.parseBlob(value);
    } catch (e) {
      return null;
    }
    for (const kind of kinds) {
      try {
        codec.Decoder.decodeObject<unknown>(kind.clazz.Codec, blob, spec?.spec);
        return kind;
      } catch {}
    }
    return null;
  }, [value, chainSpec]);

  if (!foundKind) {
    return (
      <div className="p-4 bg-amber-100 border-1 border-amber-400 flex rounded-sm items-center gap-2 text-neutral-700">
        Unable to detect the type of input. Perhaps choose different chain spec?
      </div>
    );
  }

  return (
    <div className="p-4 bg-brand/20 text-neutral-700 border-1 border-brand flex rounded-sm items-center gap-2">
      <InfoIcon />
      The input looks a lot like
      <Button variant="outline" onClick={() => setKind(foundKind.name)}>
        {foundKind.name}
      </Button>
    </div>
  );
}
