import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/content/layout";

export default async function UserContentDFPage() {
  await handleProtectedRoute("/user/content/desert-figures");

  return (
    <div>
      <UserContentSidebarHeader title="User Desert Figures" />
    </div>
  );
}
