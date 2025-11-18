"use client";

import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FlagButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary" className="size-8">
          <Flag />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flag This Excerpt</DialogTitle>
          <DialogDescription>
            You can either request for this excerpt to be revised, or if you
            feel that it is inappropriate or unorthodox you can request it be
            removed completely.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-8">
          <Textarea placeholder="Please explain why you wish to remove or revise this excerpt" />
          <Button>Revise Excerpt</Button>
          <Button variant="destructive">Take Down Excerpt Completely</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
