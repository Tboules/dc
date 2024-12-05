"use client";
import { postExcerptAction } from "@/app/excerpt/new/action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchForTagHandler } from "@/lib/database/handlers/tags";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { FormExcerpt, formExcerptSchema } from "@/lib/database/schema/excerpts";
import { EXCERPT_TYPE, INTERNAL_FORM_STATE_STATUS } from "@/lib/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm, useFormContext } from "react-hook-form";

type Props = {
  desertFigure?: DesertFigure;
};

export default function NewExcerptForm({ desertFigure }: Props) {
  //TODO -- Integrate with server action to submit excerpt
  const [state, formAction] = useFormState(postExcerptAction, {
    status: INTERNAL_FORM_STATE_STATUS.PENDING,
  });

  const form = useForm<FormExcerpt>({
    resolver: zodResolver(formExcerptSchema),
    defaultValues: {
      desertFigureID: desertFigure?.id,
      title: "",
      reference: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit((v) => {
      const d = new FormData(formRef.current!);

      // Mapping non input values into form
      if (v.desertFigureID) {
        d.append("desertFigureID", v.desertFigureID?.toString());
      }
      if (v.tags.length > 0) {
        d.append("tags", JSON.stringify(v.tags));
      }
      d.append("body", v.body);

      console.log(d);
      formAction(d);
    })(e);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        action={formAction}
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
              <ControlledTipTap field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/*
          TODO add on create function for new tag
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

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide a link to the site or text..."
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt Type</FormLabel>
              <Select name={field.name}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Story or Quote?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={JSON.stringify(EXCERPT_TYPE.QUOTE)}>
                    Quote
                  </SelectItem>
                  <SelectItem value={JSON.stringify(EXCERPT_TYPE.STORY)}>
                    Story
                  </SelectItem>
                </SelectContent>
              </Select>
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
  const { setValue } = useFormContext<FormExcerpt>();

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
