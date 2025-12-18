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
import { useExcerptActionButtonContext } from "@/hooks/use-excerpt-action-button-context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewRevisionRequest,
  newRevisionRequestSchema,
} from "@/lib/database/schema";
import { useServerAction } from "zsa-react";
import { postRevisionRequest } from "@/app/excerpt/[excerptId]/action";

export default function FlagButton() {
  const { doc } = useExcerptActionButtonContext();
  const action = useServerAction(postRevisionRequest);
  const form = useForm<NewRevisionRequest>({
    resolver: zodResolver(newRevisionRequestSchema),
    defaultValues: {
      revise: true,
      targetId: doc.excerptId,
    },
  });

  async function onRevise(formData: NewRevisionRequest) {
    await action.execute(formData);
    //1 create the proper schema in order to upload the revision request
    //2 upload the request in the DB
    //3 set the status of the excerpt to REVISE
    //4 refresh the excerpt docs table
    //5 reload page
  }
  async function onDelete(formData: NewRevisionRequest) {
    formData.revise = false;
    await action.execute(formData);
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
                name="description"
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
