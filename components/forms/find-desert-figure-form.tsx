"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findDesertFigure } from "@/app/excerpt/new/action";
import Lottie from "react-lottie-player";
import lottieLoader from "@/assets/loading.json";
import { FindDesertFigureFormStatus } from "@/lib/enums";

export default function FindDesertFigureForm() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [result, setResult] = React.useState<string>("");
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");
  const debounceSearchValue = useDebounce(searchValue, 300);

  async function callServerAction(s: string) {
    setFormStatus("loading");
    const res = await findDesertFigure(s);
    setResult(res);
    setFormStatus("init");
  }

  React.useEffect(() => {
    if (debounceSearchValue) callServerAction(debounceSearchValue);
  }, [debounceSearchValue]);

  return (
    <div className="space-y-4">
      <form className="space-y-2">
        <Label>Desert Figure</Label>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a Desert Figure"
        />
      </form>
      {formStatus == "init" && <InitializePlaceHolder />}
      {formStatus == "loading" && <FormLoader />}
    </div>
  );
}

function InitializePlaceHolder() {
  return (
    <div className="border border-border rounded min-h-64 w-full flex flex-col justify-center items-center gap-2">
      <Search height={50} width={50} strokeWidth={1} />
      <h4>Who are you looking for?</h4>
    </div>
  );
}

function FormLoader() {
  return (
    <div className="border border-border rounded min-h-64 w-full flex justify-center items-end">
      <Lottie loop animationData={lottieLoader} play />
    </div>
  );
}
