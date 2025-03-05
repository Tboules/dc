import PostFigureForm from "@/components/forms/post-figure";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function NewDesertFigurePage() {
  //the session is available if you need it
  await handleProtectedRoute("/desert-figures/new");

  return (
    <div className="flex flex-col items-center">
      <PostFigureForm />
    </div>
  );
}
