import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function NewIconPage() {
  await handleProtectedRoute("/icons/new");

  return (
    <div>
      <h1>New Icon Page restricted</h1>
    </div>
  );
}
