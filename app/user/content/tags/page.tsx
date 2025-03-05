import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserContentTagsPage() {
  await handleProtectedRoute("/user/content/tags");
  return (
    <div>
      <h1>Hello User Tags</h1>
    </div>
  );
}
