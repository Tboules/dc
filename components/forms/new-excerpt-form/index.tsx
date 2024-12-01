"use client";
import FindFigureAsyncInput from "@/components/find-figure-async-combo-box";
import ControlledTipTap from "@/components/tiptap/controlled-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { NewExcerpt, newExcerptSchema } from "@/lib/database/schema/excerpts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, useFormContext } from "react-hook-form";

type Props = {
  desertFigure?: DesertFigure;
};

export default function NewExcerptForm({ desertFigure }: Props) {
  const form = useForm<NewExcerpt>({
    resolver: zodResolver(newExcerptSchema),
    defaultValues: {
      desertFigureID: desertFigure?.id,
      title: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log(d))}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="desertFigureID"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Desert Figure</FormLabel>
              <FindFigureAsyncInput field={field} desertFigure={desertFigure} />
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt Title</FormLabel>
              <FormControl>
                <Input placeholder="Give your excerpt a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <ControlledTipTap field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*
          TODO add on create function for new tag
          TODO incorporate tag selections into excerpt form
          TODO test on submit with tags
          TODO add type selector (story or quote)
          TODO add reference http link
          TODO bulk update excerpttags table on submit of excerpt
        */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt Tags</FormLabel>
              <FormControl>
                <TagSelector />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link href="/">
          <Button className="w-full" variant="outline">
            <ArrowLeft className="mr-1" />
            Back
          </Button>
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function TagSelector() {
  const { setValue } = useFormContext<NewExcerpt>();

  async function handleTagSearch(value: string) {
    let res: Option[] = [];
    try {
      res = await searchForTagHandler(value);
      return res;
    } catch (error) {
      console.error(error);
    }

    return res;
  }

  return (
    <MultipleSelector
      defaultOptions={[]}
      onChange={(v) => setValue("tags", v)}
      onSearch={handleTagSearch}
      creatable
      placeholder="Select three labels to describe this excerpt..."
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  );
}
