import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@fluffylabs/shared-ui";
import { ChevronDownIcon } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useCallback, useEffect, useState } from "react";
import { kinds } from "./constants";

type JamObjectSelectProps = {
  setKind: (name: string) => void;
  kind: string;
};

export function JamObjectSelect({ setKind, kind }: JamObjectSelectProps) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(kinds);
  const isKindName = useCallback((value: string) => kinds.some((k) => k.name === value), []);

  useEffect(() => {
    const s = search.trim().toLowerCase();
    if (s.length > 0) {
      setFiltered(kinds.filter((x) => x.name.toLowerCase().includes(s) || x.fullName.toLowerCase().includes(s)));
    } else {
      setFiltered(kinds);
    }
  }, [search]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);
  const handleKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab"];

    if (!allowedKeys.includes(e.key)) {
      e.stopPropagation();
    } else {
      const item = document.querySelector(
        e.key === "ArrowUp" ? "[data-radix-collection-item]:last-child" : "[data-radix-collection-item]",
      );
      if (item !== null) {
        (item as HTMLElement).focus();
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          JAM Object: {kind}
          <ChevronDownIcon className="w-4 h-4 m-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="w-full flex flex-row">
          <input
            autoFocus
            className="p-2 m-1 border-1 rounded-sm flex-1"
            type="text"
            onChange={handleChange}
            onKeyDown={handleKey}
            value={search}
            placeholder="search..."
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={kind}
          onValueChange={(value) => {
            if (isKindName(value)) {
              setKind(value);
            }
          }}
        >
          {filtered.map((k) => (
            <DropdownMenuRadioItem key={k.name} value={k.name} tabIndex={-1}>
              {k.fullName !== k.name ? `${k.fullName} (${k.name})` : `${k.name}`}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
