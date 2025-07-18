"use client";

import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
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
import { Options } from "nuqs";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { FormExcerpt } from "@/lib/database/schema/excerpts";
import { FormControl } from "./ui/form";
import Link from "next/link";
import { RouteLiteral } from "nextjs-routes";

type Props = {
  setSelectedFigureID: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
};

export default function FindFigureAsyncInput({ setSelectedFigureID }: Props) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const { setValue, watch } = useFormContext<FormExcerpt>();
  const selectedFigure = watch("desertFigure");
  const [figures, setFigures] = React.useState<DesertFigure[]>([]);
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");

  const debounceValue = useDebounce(inputValue, 300);

  async function callServerAction(s: string) {
    setFormStatus("loading");

    const incomingFigures = await findDesertFigure(s);
    if (incomingFigures && incomingFigures.length > 0) {
      setFormStatus("success");
      setFigures(incomingFigures);
      return;
    }
    setFormStatus("empty");
  }

  React.useEffect(() => {
    if (debounceValue) {
      callServerAction(debounceValue);
    }
  }, [debounceValue]);

  function handleModal(isOpen: boolean) {
    setInputValue("");
    setFormStatus("init");
    setOpen(isOpen);
  }

  function handleSelectFigure(figure: DesertFigure) {
    setSelectedFigureID(figure.id);
    setValue("desertFigure", figure);
    setValue("desertFigureID", figure.id);
    handleModal(false);
  }

  return (
    <Popover open={open} onOpenChange={handleModal}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedFigure
              ? selectedFigure.fullName
              : "Select a Desert Figure..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="md:w-152">
        <Command shouldFilter={false}>
          <CommandList>
            <CommandInput
              value={inputValue}
              onValueChange={(v) => setInputValue(v)}
              placeholder="Type a command or search..."
            />
            <SearchResults
              formStatus={formStatus}
              figures={figures}
              callback={handleSelectFigure}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SearchResults({
  figures,
  formStatus,
  callback,
}: {
  figures: DesertFigure[];
  formStatus: FindDesertFigureFormStatus;
  callback: (value: DesertFigure) => void;
}) {
  if (formStatus == "init") {
    return <CommandEmpty>Look for your favorite Desert Figure</CommandEmpty>;
  }

  if (formStatus == "empty") {
    return (
      <CommandEmpty>
        We appologize but we could not find that one. Would you like to add a
        Desert Figure?
        <Link
          className="w-full"
          href={`/desert-figures/new?fromExcerpt=1` as RouteLiteral}
        >
          <Button className="mt-4">Add a Desert Figure</Button>
        </Link>
      </CommandEmpty>
    );
  }

  if (formStatus == "loading") {
    return <CommandEmpty>loading...</CommandEmpty>;
  }

  return (
    <>
      {figures.map((figure) => (
        <CommandItem
          key={figure.id}
          onSelect={() => callback(figure)}
          value={figure.id}
        >
          {figure.fullName}
        </CommandItem>
      ))}
    </>
  );
}
