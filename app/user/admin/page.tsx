import { selectUnpublishedExcerpts } from "@/lib/database/handlers/excerpts";
import { USER_ROLES } from "@/lib/enums";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserAdminRoot() {
  await handleProtectedRoute("/user/admin", USER_ROLES.admin);

  const res = await selectUnpublishedExcerpts();

  return (
    <div>
      <h1>Hello Admin, welcome!</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
