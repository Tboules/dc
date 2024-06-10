"use client";
import FindFigureAsyncInput from "@/components/find-figure-async-command";
import FindFigureDialogue from "@/components/find-figure-dialog";
import ControlledTipTap from "@/components/tiptap/controlled-tiptap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function NewExcerptForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log(d))}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <div className="space-y-2 md:col-span-2">
          <Label>Desert Figure</Label>
          <FindFigureAsyncInput />
        </div>

        <FormField
          name="title"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt Title</FormLabel>
              <FormControl>
                <Input placeholder="Give your excerpt a title" {...field} />
              </FormControl>
            </FormItem>
          )}
          defaultValue=""
        />

        <FormField
          name="body"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <ControlledTipTap
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
