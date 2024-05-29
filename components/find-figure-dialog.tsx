import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronsUpDown, User } from "lucide-react";
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
    <div className="md:flex md:gap-4 space-y-4 md:space-y-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full justify-between" variant="outline">
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

      <Card className="w-full bg-background">
        <CardContent className="p-4 flex gap-4 items-end ">
          <div className="bg-card rounded p-4 w-28 h-28 border border-border">
            <User strokeWidth="1" className="w-full h-full font-thin" />
          </div>

          <h4 className="font-medium text-xl">Select a Desert Figure</h4>
        </CardContent>
      </Card>
    </div>
  );
}
