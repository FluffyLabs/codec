import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@fluffylabs/shared-ui";
import { ChevronDownIcon } from "lucide-react";
import { ALL_CHAIN_SPECS } from "./constants";

type ChainSpecSelectProps = {
  chainSpec: string;
  setChainSpec: (spec: string) => void;
};

export function ChainSpecSelect({ setChainSpec, chainSpec }: ChainSpecSelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Parameters: {chainSpec}
          <ChevronDownIcon className="w-4 h-4 m-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Choose Protocol Parameters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={chainSpec} onValueChange={setChainSpec}>
          {ALL_CHAIN_SPECS.map((k) => (
            <DropdownMenuRadioItem key={k.name} value={k.name}>
              {k.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
