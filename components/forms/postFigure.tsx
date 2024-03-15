"use client";
import {
  DESERT_FIGURE_TITLE,
  DESERT_FIGURE_TYPE,
  NewDesertFigure,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";

/*
  fields for ui:
  1. first name
  2. last name
  3. title (Desert Figure Title)
  4. epithet 
  5. type
  6. thumbnail
*/

export default function PostFigureForm() {
  const form = useForm<NewDesertFigure>({
    resolver: zodResolver(newDesertFigureSchema),
    defaultValues: {
      title: DESERT_FIGURE_TITLE.SAINT,
      firstName: "",
      lastName: "",
      epithet: "",
      type: DESERT_FIGURE_TYPE.AUTHOR,
    },
  });

  function onSubmit(values: NewDesertFigure) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          className="min-w-72 w-full md:w-3/4 border border-border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="md:col-span-2 mb-2 text-xl font-bold">
            Add a Desert Figure
          </h1>
          <Separator className="md:col-span-2 mb-2" />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(DESERT_FIGURE_TITLE).map((v) => (
                      <SelectItem value={v} key={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="epithet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epithet</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Epithet"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  eg. The Great or The Golden Mouth
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="md:col-span-2 mb-2" />
          <Button className="md:col-span-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
