"use client";
import {
  NewDesertFigure,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";

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
  });

  function onSubmit(values: NewDesertFigure) {
    console.log(values);
  }

  return (
    <>
      <h1>hello form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
