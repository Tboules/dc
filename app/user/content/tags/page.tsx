import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";

export default async function UserContentTagsPage() {
  await handleProtectedRoute("/user/content/tags");
  return (
    <div>
      <UserContentSidebarHeader title="User Tags" />
    </div>
  );
}
