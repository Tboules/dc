"use client";

import { findDesertFigure } from "@/app/excerpt/new/action";
import AsyncAutoComplete from "@/components/ui/async-auto-complete";
import { useDebounce } from "@/hooks/use-debounce";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { FormExcerpt } from "@/lib/database/schema/excerpts";
import { useQuery } from "@tanstack/react-query";
import { Options } from "nuqs";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  setSelectedFigureIDAction: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
};

export default function DesertFigureAutoComplete({
  setSelectedFigureIDAction,
}: Props) {
  const { setValue, watch } = useFormContext<FormExcerpt>();
  const selectedFigure = watch("desertFigure");
  const [inputValue, setInputValue] = React.useState<string | undefined>(
    selectedFigure?.fullName ?? "",
  );

  const debounceValue = useDebounce(inputValue, 500);

  const desertFigures = useQuery({
    queryKey: ["desertFigures", debounceValue],
    queryFn: () => findDesertFigure(debounceValue ?? ""),
    enabled: debounceValue ? debounceValue.length > 3 : true,
  });

  function handleSelectFigure(figure: DesertFigure) {
    setSelectedFigureIDAction(figure.id);
    setValue("desertFigure", figure);
    setValue("desertFigureID", figure.id);
  }

  return (
    <>
      <AsyncAutoComplete<DesertFigure>
        inputValue={inputValue ?? ""}
        setInputValue={setInputValue}
        onValueChange={handleSelectFigure}
        placeholder="Please select a Desert Figure"
        options={desertFigures.data ?? []}
        emptyMessage="Look for your favorite desert figure, if we are unable to find them, please add them and then come back."
        isLoading={desertFigures.isLoading}
        labelKey={"fullName"}
        valueKey={"id"}
      />
    </>
  );
}
