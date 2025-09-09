import DefaultLayout from "@/components/layouts/default-layout";
import { selectUnpublishedExcerpts } from "@/lib/database/handlers/excerpts";
import { USER_ROLES } from "@/lib/enums";
import { handleProtectedRoute } from "@/lib/utils/auth";
import AdminExcerptDocCard from "../_components/admin_excerpt_cards";

export default async function UserAdminRoot() {
  await handleProtectedRoute("/user/admin", USER_ROLES.admin);

  const unpublishedExcerpts = await selectUnpublishedExcerpts();

  return (
    <DefaultLayout>
      <h1 className="font-medium text-lg md:text-2xl mb-8">Excerpt Requests</h1>
      <div className="flex flex-col gap-8">
        {unpublishedExcerpts.map((ue) => (
          <AdminExcerptDocCard key={ue.excerptId} {...ue} />
        ))}
      </div>
    </DefaultLayout>
  );
}
