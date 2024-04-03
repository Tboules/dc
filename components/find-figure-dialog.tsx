"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronsUpDown, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";

/*
  1. Create Dialogue Button that takes dynamic value 
  2. Create dialogue that searches for desert figures
  3. Create display for display top 5 options
  4. If no options come from result, show add new figure button
  5. When figure is added, set it as the value and close form (perhaps form context)
*/

export default function FindFigureDialogue() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const debounceSearchValue = useDebounce(searchValue, 300);

  React.useEffect(() => {
    console.log(debounceSearchValue);
  }, [debounceSearchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] justify-between" variant="outline">
          Select Desert Figure
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find a Desert Figure</DialogTitle>
          <DialogDescription>
            Who is this passage by or about?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Desert Figure</Label>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a Desert Figure"
            />
          </div>
          <div className="border border-border rounded min-h-64 w-full flex flex-col justify-center items-center gap-2">
            <Search height={50} width={50} strokeWidth={1} />
            <h4>Who are you looking for?</h4>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
