import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/content/layout";

export default async function UserContentTagsPage() {
  await handleProtectedRoute("/user/content/tags");
  return (
    <div>
      <UserContentSidebarHeader title="User Tags" />
    </div>
  );
}
