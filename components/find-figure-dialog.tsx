import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import FindDesertFigureForm from "./forms/find-desert-figure-form";

/*
  1. Create Dialogue Button that takes dynamic value 
  2. Create dialogue that searches for desert figures
  3. Create display for display top 5 options
  4. If no options come from result, show add new figure button
  5. When figure is added, set it as the value and close form (perhaps form context)
*/

export default function FindFigureDialogue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] justify-between" variant="outline">
          Select Desert Figure
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Find a Desert Figure</DialogTitle>
          <DialogDescription>
            Who is this passage by or about?
          </DialogDescription>
        </DialogHeader>

        <FindDesertFigureForm />
      </DialogContent>
    </Dialog>
  );
}
