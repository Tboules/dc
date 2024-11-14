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
import { useQueryState } from "nuqs";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { NewExcerpt } from "@/lib/database/schema/excerpts";
import { FormControl } from "./ui/form";

type Props = {
  desertFigure?: DesertFigure;
  field: ControllerRenderProps<NewExcerpt, "desertFigureID">;
  form: UseFormReturn<NewExcerpt>;
};

export default function FindFigureAsyncInput({
  desertFigure,
  field,
  form,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedFigureID, setSelectedFigureID] = useQueryState("desertFigure");
  const [figures, setFigures] = React.useState<DesertFigure[]>(
    desertFigure ? [desertFigure] : [],
  );
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");

  //init form with url value
  React.useEffect(() => {
    console.log(desertFigure);
    if (desertFigure) {
      setFigures([desertFigure]);
      form.setValue("desertFigureID", desertFigure.id);
      field.value = desertFigure.id;
    }

    console.log(figures);
  }, []);

  const debounceValue = useDebounce(value, 300);

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
    // setFigures([]);
    setValue("");
    setFormStatus("init");

    setOpen(isOpen);
  }

  function handleSelectFigure(id: string) {
    setSelectedFigureID(id);

    form.setValue("desertFigureID", id);

    // what should happen on select?
    // 1. URL should update to reflect selected ID (done)
    // 2. react hook form should take the figure id (TODO)
    // 3. UI should update with figure full name (done)

    // close the modal
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
            {field.value
              ? figures.find((f) => f.id == field.value)?.fullName
              : "Select a Desert Figure..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="md:w-[38rem]">
        <Command shouldFilter={false}>
          <CommandList>
            <CommandInput
              value={value}
              onValueChange={(v) => setValue(v)}
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
  callback: (value: string) => void;
}) {
  if (formStatus == "init") {
    return <CommandEmpty>Look for your favorite Desert Figure</CommandEmpty>;
  }

  if (formStatus == "empty") {
    return (
      <CommandEmpty>
        We appologize but we could not find that one :/
      </CommandEmpty>
    );
  }

  if (formStatus == "loading") {
    return <CommandEmpty>loading...</CommandEmpty>;
  }

  // TODO handle on select callback. Set the Figure ID in form state
  // TODO handle unfound desert figure. add figure flow

  return (
    <>
      {figures.map((figure) => (
        <CommandItem
          key={figure.id}
          onSelect={(v) => callback(v)}
          value={figure.id}
        >
          {figure.fullName}
        </CommandItem>
      ))}
    </>
  );
}
