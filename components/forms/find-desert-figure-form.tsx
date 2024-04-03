"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { CircleSlash, Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findDesertFigure } from "@/app/excerpt/new/action";
import Lottie from "react-lottie-player";
import lottieLoader from "@/assets/loading.json";
import { FindDesertFigureFormStatus } from "@/lib/enums";
import { Button } from "../ui/button";
import PostFigureForm from "./post-figure";

export default function FindDesertFigureForm() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  // const [result, setResult] = React.useState<string>("");
  const [formStatus, setFormStatus] =
    React.useState<FindDesertFigureFormStatus>("init");
  const debounceSearchValue = useDebounce(searchValue, 300);

  async function callServerAction(s: string) {
    setFormStatus("loading");
    await findDesertFigure(s);
    // setResult(res);
    setFormStatus("empty");
  }

  React.useEffect(() => {
    if (debounceSearchValue) callServerAction(debounceSearchValue);
  }, [debounceSearchValue]);

  function openNewFigureForm() {
    setFormStatus("new figure");
  }

  if (formStatus == "new figure") {
    return <PostFigureForm />;
  }

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
      {formStatus == "empty" && (
        <EmptyResultPlaceholder cb={openNewFigureForm} />
      )}
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

function EmptyResultPlaceholder({ cb }: { cb: () => void }) {
  return (
    <div className="border border-border rounded min-h-64 w-full flex flex-col justify-center items-center gap-2">
      <CircleSlash height={50} width={50} strokeWidth={1} />
      <h4>Unable to find what you&apos;re looking for?</h4>
      <Button className="mt-2" onClick={cb}>
        Add a Desert Figure
      </Button>
    </div>
  );
}
