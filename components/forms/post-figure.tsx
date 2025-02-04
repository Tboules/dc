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
import { useRef, useActionState } from "react";
import {
  INTERNAL_FORM_STATE_STATUS,
  DESERT_FIGURE_TITLE,
  DESERT_FIGURE_TYPE,
} from "@/lib/enums";
import lottieLoader from "@/assets/loading.json";
import { Label } from "../ui/label";
import FileInputWithPreview from "@/components/FileInputWithPreview";
import { postDesertFigureAction } from "@/app/desert-figures/new/action";
import { useSearchParams } from "next/navigation";
import { getAllParams } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "./form-header";

export default function PostFigureForm() {
  const params = useSearchParams();
  const [state, formAction] = useActionState(postDesertFigureAction, {
    status: INTERNAL_FORM_STATE_STATUS.PENDING,
    params: getAllParams(params.entries()),
  });

  const form = useForm<NewDesertFigure>({
    resolver: zodResolver(newDesertFigureSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      epithet: "",
      type: DESERT_FIGURE_TYPE.AUTHOR,
      ...(state?.fields ?? {}),
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.status == INTERNAL_FORM_STATE_STATUS.LOADING) {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded flex justify-center items-end">
        <Lottie loop animationData={lottieLoader} play />
      </div>
    );
  }

  if (state?.status == INTERNAL_FORM_STATE_STATUS.SUCCESS) {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1 className="md:col-span-2">Thank You!</h1>
        <Button
          className="md:col-span-2"
          onClick={() => {
            form.reset();
            state.status = INTERNAL_FORM_STATE_STATUS.PENDING;
          }}
        >
          Add Another Figure
        </Button>
      </div>
    );
  }

  if (state?.status == INTERNAL_FORM_STATE_STATUS.FAILURE) {
    return (
      <div className="min-w-72 w-full md:w-3/4 border border-border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1>{state.message}</h1>
        <Button
          onClick={() => {
            form.reset();
            state.status = INTERNAL_FORM_STATE_STATUS.PENDING;
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
          ref={formRef}
          className="max-w-screen-lg mt-2 w-full rounded grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(() => {
              state.status = INTERNAL_FORM_STATE_STATUS.LOADING;
              const d = new FormData(formRef.current!);
              formAction(d);
            })(e);
          }}
          action={formAction}
        >
          <FormHeader
            title="Add a Desert Figure"
            message={state.message}
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
