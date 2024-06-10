"use client";

import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { FindDesertFigureFormStatus } from "@/lib/enums";
import { findDesertFigure } from "@/app/excerpt/new/action";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { CommandGroup, CommandItem } from "cmdk";

export default function FindFigureAsyncInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [figures, setFigures] = React.useState<DesertFigure[]>([]);
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");
  const debounceValue = useDebounce(value, 300);

  async function callServerAction(s: string) {
    setFormStatus("loading");

    const incomingFigures = await findDesertFigure(s);
    if (incomingFigures) {
      setFigures(incomingFigures);
      return;
    }
    // setResult(res);
    setFormStatus("empty");
  }

  React.useEffect(() => {
    if (debounceValue) {
      callServerAction(debounceValue);
    }
  }, [debounceValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          Select a Desert Figure...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[38rem]">
        <Command shouldFilter={false}>
          <CommandInput
            value={value}
            onValueChange={(v) => setValue(v)}
            placeholder="Type a command or search..."
          />
          <SearchResults loading={formStatus == "loading"} figures={figures} />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SearchResults({
  figures,
  loading,
}: {
  figures: DesertFigure[];
  loading: boolean;
}) {
  if (loading) {
    return <CommandEmpty>loading...</CommandEmpty>;
  }

  return (
    <CommandList>
      {figures.map((figure) => (
        <CommandItem
          key={figure.id}
          onSelect={(v) => console.log(v)}
          value={figure.id}
        >
          {figure.firstName}
        </CommandItem>
      ))}
    </CommandList>
  );
}
