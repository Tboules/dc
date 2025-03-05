import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserContentExcerptPage() {
  await handleProtectedRoute("/user/content/excerpts");
  return (
    <div>
      <h1>Hello User Excerpt</h1>
    </div>
  );
}
