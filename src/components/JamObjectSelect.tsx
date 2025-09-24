import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@fluffylabs/shared-ui";
import { ChevronDownIcon } from "lucide-react";
import { kinds } from "./constants";

type JamObjectSelectProps = {
  setKind: (name: string) => void;
  kind: string;
};

export function JamObjectSelect({ setKind, kind }: JamObjectSelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          JAM Object: {kind}
          <ChevronDownIcon className="w-4 h-4 m-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={kind} onValueChange={setKind}>
          {kinds.map((k) => (
            <DropdownMenuRadioItem key={k.name} value={k.name}>
              {k.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
