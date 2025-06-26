import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import { selectUserTagsCount } from "@/lib/database/handlers/tags";

export default async function UserContentTagsPage() {
  await handleProtectedRoute("/user/content/tags");

  const userTagCount = await selectUserTagsCount();
  console.log(userTagCount);

  return (
    <div>
      <UserContentSidebarHeader title="User Tags" />
    </div>
  );
}
