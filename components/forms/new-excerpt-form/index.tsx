"use client";
import FindFigureAsyncInput from "@/components/find-figure-async-combo-box";
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
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { DesertFigure } from "@/lib/database/schema/desertFigures";
import { useForm } from "react-hook-form";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro" },
];

type Props = {
  desertFigure?: DesertFigure;
};

export default function NewExcerptForm({ desertFigure }: Props) {
  // TODO : setup the form with a schema, context form, url params
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log(d))}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <div className="space-y-2 md:col-span-2">
          <Label>Desert Figure</Label>
          <FindFigureAsyncInput desertFigure={desertFigure} />
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

        <div className="md:col-span-2">
          <MultipleSelector
            defaultOptions={OPTIONS}
            placeholder="Select frameworks you like..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </div>
      </form>
    </Form>
  );
}
