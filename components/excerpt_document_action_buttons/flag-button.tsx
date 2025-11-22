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
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";

type RevisionRequestForm = {
  revisionDescription: string;
  revise: boolean;
};

export default function FlagButton() {
  const form = useForm<RevisionRequestForm>({
    defaultValues: {
      revise: true,
    },
  });

  async function onRevise(formData: RevisionRequestForm) {
    console.log(formData);
  }
  async function onDelete(formData: RevisionRequestForm) {
    formData.revise = false;
    console.log(formData);
  }

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
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="revisionDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Please explain why you wish to remove or revise this excerpt"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button onClick={form.handleSubmit(onRevise)}>Revise Excerpt</Button>
          <Button onClick={form.handleSubmit(onDelete)} variant="destructive">
            Take Down Excerpt Completely
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
