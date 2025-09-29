import DefaultLayout from "@/components/layouts/default-layout";
import { selectUnpublishedExcerpts } from "@/lib/database/handlers/excerpts";
import { USER_ROLES } from "@/lib/enums";
import { handleProtectedRoute } from "@/lib/utils/auth";
import AdminExcerptDocCard from "../_components/admin_excerpt_cards";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { refreshExcerptDocuments } from "@/lib/database/handlers/excerpt-documents";
import RefreshExcerptDocsButton from "../_components/refresh-excerpt-docs";

export default async function UserAdminRoot() {
  await handleProtectedRoute("/user/admin", USER_ROLES.admin);

  const unpublishedExcerpts = await selectUnpublishedExcerpts();

  return (
    <DefaultLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="font-medium text-lg md:text-2xl">Excerpt Requests</h1>
        <RefreshExcerptDocsButton />
      </div>
      <div className="flex flex-col gap-8">
        {unpublishedExcerpts.map((ue) => (
          <AdminExcerptDocCard key={ue.excerptId} {...ue} />
        ))}
      </div>

      {unpublishedExcerpts.length == 0 && (
        <div className="flex flex-col gap-8 border border-border p-8 justify-center items-center rounded">
          <BadgeCheck height={100} width={100} />
          <p className="text-xl font-medium">
            There Are No Unpublished Excerpts For Review
          </p>
        </div>
      )}
    </DefaultLayout>
  );
}
