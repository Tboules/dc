import DefaultLayout from "@/components/layouts/default-layout";
import { selectUnpublishedExcerpts } from "@/lib/database/handlers/excerpts";
import { USER_ROLES } from "@/lib/enums";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserAdminRoot() {
  await handleProtectedRoute("/user/admin", USER_ROLES.admin);

  const res = await selectUnpublishedExcerpts();

  return (
    <DefaultLayout>
      <h1 className="font-medium text-lg md:text-2xl mb-8">Excerpt Requests</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </DefaultLayout>
  );
}
