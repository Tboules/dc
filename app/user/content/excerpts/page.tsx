import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/content/layout";

export default async function UserContentExcerptPage() {
  await handleProtectedRoute("/user/content/excerpts");
  return (
    <div>
      <UserContentSidebarHeader title="User Excerpts" />
    </div>
  );
}
