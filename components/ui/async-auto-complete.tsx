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
  JSX,
} from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type AutoCompleteSelectProps<T> = {
  option: T;
  isSelected: boolean;
  onSelect: (option: T) => void;
};

type AutoCompleteProps<T> = {
  options: T[];
  emptyMessage: string;
  value?: T;
  onValueChange?: (value: T) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string | undefined>>;
  labelKey: keyof T;
  valueKey: keyof T;
  SelectComponent?: (props: AutoCompleteSelectProps<T>) => JSX.Element;
};

function AsyncAutoComplete<T>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  inputValue,
  setInputValue,
  labelKey,
  valueKey,
  SelectComponent,
}: AutoCompleteProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<T>(value as T);

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
          (option) => option[labelKey] === input.value,
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
    if (selected) {
      setInputValue(selected[labelKey] as string);
    }
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: T) => {
      setInputValue(selectedOption[labelKey] as string);

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
          className="text-base focus-visible:outline-hidden ring-offset-background focus-visible:ring-3 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-default outline-hidden",
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
                  const isSelected = selected?.[valueKey] === option[valueKey];

                  if (SelectComponent) {
                    return (
                      <SelectComponent
                        key={option[valueKey] as string}
                        option={option}
                        onSelect={handleSelectOption}
                        isSelected={isSelected}
                      />
                    );
                  }

                  return (
                    <CommandItem
                      key={option[valueKey] as string}
                      value={option[valueKey] as string}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null,
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option[labelKey] as string}
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
}

export default AsyncAutoComplete;
