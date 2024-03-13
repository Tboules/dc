import {
  DESERT_FIGURE_TYPE,
  NewDesertFigure,
  newDesertFigureSchema,
} from "@/lib/database/schema/desertFigures";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

/*
  fields for ui:
  1. first name
  2. last name
  3. title (Desert Figure Title)
  4. epithet 
  5. type
  6. thumbnail
*/

export default async function NewExcerptFormPage() {
  const session = await getServerSession();
  if (!session) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/excerpt/new")}`,
    );
  }

  // can't use hooks in server comp
  // const form = useForm<NewDesertFigure>({
  //   resolver: zodResolver(newDesertFigureSchema),
  //   defaultValues: {
  //     title: "",
  //     firstName: "",
  //     lastName: "",
  //     epithet: "",
  //     thumbnail: "",
  //     type: DESERT_FIGURE_TYPE.AUTHOR,
  //   },
  // });
  //
  // function onSubmit(values: NewDesertFigure) {
  //   console.log(values);
  // }

  return (
    <div className="max-w-screen-xl m-auto bg-slate-800 p-4">
      <h1>hello add form</h1>
    </div>
  );
}
// <Form {...form}>
//   <form onSubmit={form.handleSubmit(onSubmit)}></form>
// </Form>
