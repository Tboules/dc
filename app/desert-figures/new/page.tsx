import PostFigureForm from "@/components/forms/post-figure";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function NewDesertFigurePage() {
  //the session is available if you need it
  await handleProtectedRoute("/desert-figures/new");

  return (
    <div className="max-w-screen-xl flex flex-col items-center m-auto p-4">
      <PostFigureForm />
    </div>
  );
}
