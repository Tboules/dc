"use client";
import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  SetStateAction,
  Dispatch,
} from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewReference } from "@/lib/database/schema/references";
import BookThumbnailHandler from "../book-thumbnail-handler";

type AutoCompleteProps = {
  options: NewReference[];
  emptyMessage: string;
  value?: NewReference;
  onValueChange?: (value: NewReference) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string | undefined>>;
};

export const BookAsyncAutoComp = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  inputValue,
  setInputValue,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<NewReference>(value as NewReference);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.title === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.title);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: NewReference) => {
      setInputValue(selectedOption.title);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <CommandPrimitive shouldFilter={false} onKeyDown={handleKeyDown}>
      <div className="border border-input rounded-md">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="text-base focus-visible:outline-none ring-offset-background focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-default outline-none",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList className="bg-background rounded-lg ring-1 ring-secondary">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1 flex flex-col bg-background gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.externalId === option.externalId;
                  return (
                    <CommandItem
                      key={option.externalId}
                      value={option.externalId}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "w-full flex items-center",
                        !isSelected ? "pl-8" : null,
                      )}
                    >
                      {isSelected ? <Check className="flex-none w-4" /> : null}
                      <BookThumbnailHandler url={option.cover} />
                      <div className="flex-1 flex flex-col w-full gap-2 items-start">
                        <h4 className="text-lg">{option.title}</h4>
                        <p>- {option.author}</p>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
