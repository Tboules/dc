"use client";

import {
  postExcerptZsaAction,
  handleTagSearch,
} from "@/app/excerpt/new/action";
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
import MultipleSelector from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { FormExcerpt, formExcerptSchema } from "@/lib/database/schema/excerpts";
import { EXCERPT_TYPE } from "@/lib/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useServerAction } from "zsa-react";
import BookSearchAutoComplete from "./book-search-autocomplete";
import DesertFigureAutoComplete from "./desert-figure-autocomplete";

type Props = {
  desertFigure?: DesertFigure;
};

export default function NewExcerptForm({ desertFigure }: Props) {
  const [, setSelectedFigureID] = useQueryState("desertFigure");

  const { reset, execute, status } = useServerAction(postExcerptZsaAction);

  const form = useForm<FormExcerpt>({
    resolver: zodResolver(formExcerptSchema),
    defaultValues: {
      title: "",
      articleUrl: "",
      desertFigure: desertFigure,
      desertFigureID: desertFigure?.id ?? undefined,
    },
  });

  async function handleSubmit(formData: FormExcerpt) {
    const [, err] = await execute(formData);
    if (err) {
      console.log({ err });
      return;
    }
  }

  function resetForm(withoutFigure: boolean) {
    if (withoutFigure) {
      setSelectedFigureID(null);
      form.reset({ desertFigureID: "" });
    } else {
      const tempFigure = desertFigure
        ? desertFigure
        : form.getValues("desertFigure");

      form.reset({
        desertFigure: tempFigure,
        desertFigureID: tempFigure.id,
        title: "",
        articleUrl: "",
      });
    }

    reset();
  }

  if (status == "error") {
    return (
      <div>
        <h1>Something seems to have gone wrong...</h1>
        <Button onClick={() => resetForm(true)}>Try Again</Button>
      </div>
    );
  }

  if (status == "success") {
    return (
      <div className="py-4 max-w-lg m-auto">
        <h1 className="text-2xl font-medium">
          Thank You for Submitting an Excerpt
        </h1>
        <p className="mb-6">It will be reviewed and then published shortly</p>
        <div className="flex gap-4">
          <Button className="flex-1" onClick={() => resetForm(true)}>
            START FRESH
          </Button>
          {form.getValues("desertFigure") && (
            <Button className="flex-1" onClick={() => resetForm(false)}>
              Add Another for {form.getValues("desertFigure")?.fullName}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="desertFigure"
          render={() => (
            <FormItem className="md:col-span-2">
              <FormLabel>Desert Figure</FormLabel>
              <DesertFigureAutoComplete
                setSelectedFigureIDAction={setSelectedFigureID}
              />
              <FormMessage />
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

        <Tabs defaultValue="book" className="md:col-span-2">
          <TabsList>
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="article">Article</TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            <FormField
              control={form.control}
              name="reference"
              render={() => (
                <FormItem>
                  <FormLabel>Reference Text</FormLabel>
                  <FormControl>
                    <BookSearchAutoComplete />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="article">
            <FormField
              control={form.control}
              name="articleUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provide a link to the article site."
                      {...field}
                      value={field.value ?? undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Excerpt Type</FormLabel>
              <Select
                name={field.name}
                value={
                  field.value
                    ? JSON.stringify(field.value)
                    : EXCERPT_TYPE.QUOTE.toString()
                }
                onValueChange={(v) => field.onChange(JSON.parse(v))}
              >
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
          <Button className="w-full" variant="outline" type="button">
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

  return (
    <MultipleSelector
      inputProps={{
        maxLength: 20,
      }}
      defaultOptions={[]}
      onChange={(v) => setValue("tags", v)}
      onSearch={handleTagSearch}
      creatable
      maxSelected={3}
      placeholder="Select up to three labels to describe this excerpt..."
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  );
}
