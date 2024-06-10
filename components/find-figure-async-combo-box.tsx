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

export default function FindFigureAsyncInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");
  const debounceValue = useDebounce(value, 300);

  async function callServerAction(s: string) {
    setFormStatus("loading");
    await findDesertFigure(s);
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
          Select framework...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[38rem]">
        <Command>
          <CommandInput
            value={value}
            onValueChange={(v) => setValue(v)}
            placeholder="Type a command or search..."
          />
          <CommandList>
            <CommandEmpty>
              {formStatus == "init" && "Look for a figure."}
              {formStatus == "loading" && <div>searching...</div>}
              {formStatus == "empty" && (
                <div>couldn't find what you were looking for</div>
              )}
            </CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
