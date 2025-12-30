import { Button } from "@fluffylabs/shared-ui";
import { bytes } from "@typeberry/lib";
import { InfoIcon } from "lucide-react";
import { useMemo } from "react";
import { ALL_CHAIN_SPECS, kinds, tinyChainSpec } from "./constants";

export function KindFinder({
  value,
  setKind,
  chainSpec,
}: {
  value: string;
  chainSpec: string;
  setKind: (name: string) => void;
}) {
  const foundKind = useMemo(() => {
    const spec = ALL_CHAIN_SPECS.find((v) => v.name === chainSpec) ?? tinyChainSpec;
    let blob: bytes.BytesBlob;
    try {
      blob = bytes.BytesBlob.parseBlob(value);
    } catch {
      return null;
    }
    for (const descriptor of kinds) {
      try {
        descriptor.decode(blob, spec.spec);
        return descriptor;
      } catch {
        // no-op
      }
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
      <Button variant="ghost" onClick={() => setKind(foundKind.name)}>
        {foundKind.name}
      </Button>
    </div>
  );
}
