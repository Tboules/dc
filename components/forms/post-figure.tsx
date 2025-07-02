"use client";

import Lottie from "react-lottie-player";
import {
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
import { DESERT_FIGURE_TITLE, DESERT_FIGURE_TYPE } from "@/lib/enums";
import lottieLoader from "@/assets/loading.json";
import { Label } from "../ui/label";
import FileInputWithPreview from "@/components/FileInputWithPreview";
import { postDesertFigureZsaAction } from "@/app/desert-figures/new/action";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "./form-header";
import { useServerAction } from "zsa-react";

export default function PostFigureForm() {
  const params = useSearchParams();

  const { reset, execute, status } = useServerAction(postDesertFigureZsaAction);
  const form = useForm<NewDesertFigure>({
    resolver: zodResolver(newDesertFigureSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      epithet: "",
      type: DESERT_FIGURE_TYPE.AUTHOR,
    },
  });

  // Finish implementation of new form submission process
  async function handleFormSubmission(formData: NewDesertFigure) {
    const [, err] = await execute(formData);
    if (err) {
      console.log(err);
      return;
    }
  }

  if (status == "pending") {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded flex justify-center items-end">
        <Lottie loop animationData={lottieLoader} play />
      </div>
    );
  }

  if (status == "success") {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1 className="md:col-span-2">Thank You!</h1>
        <Button
          className="md:col-span-2"
          onClick={() => {
            form.reset();
            reset();
          }}
        >
          Add Another Figure
        </Button>
      </div>
    );
  }

  if (status == "error") {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1>Something went wrong...</h1>
        <Button
          onClick={() => {
            form.reset();
            reset();
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          className="max-w-(--breakpoint-lg) mt-2 w-full rounded grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(handleFormSubmission)}
        >
          <FormHeader
            title="Add a Desert Figure"
            wrapperClass="md:col-span-2"
          />

          <div className="md:col-start-1 md:col-end-2 space-y-2">
            <Label>Desert Figure Image</Label>
            <FileInputWithPreview {...form.register("thumbnail")} />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                    name={field.name}
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
          </div>
          <Separator className="md:col-span-2 mb-2" />
          <div className="md:col-span-2 flex gap-2 flex-col md:flex-row justify-between items-center">
            {params.has("fromExcerpt") && (
              <Link className="w-full" href="/excerpt/new">
                <Button className="w-full" variant="outline">
                  <ArrowLeft className="mr-1" />
                  Back
                </Button>
              </Link>
            )}
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
