import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import {
  selectUserExcerptCount,
  selectUserExcerpts,
} from "@/lib/database/handlers/excerpts";
import { UserContentDataTable } from "@/app/user/_components/user-content-data-table";
import { USER_EXCERPT_COLUMNS } from "@/app/user/_components/columns";
import {
  PagePropsWithParams,
  userContentSearchParamsLoader,
} from "@/lib/utils/params";

export default async function UserContentExcerptPage({
  searchParams,
}: PagePropsWithParams) {
  await handleProtectedRoute("/user/content/excerpts");

  const params = await userContentSearchParamsLoader(searchParams);
  const excerpts = await selectUserExcerpts(params);

  const excerptCount = await selectUserExcerptCount();

  return (
    <div>
      <UserContentSidebarHeader title="User Excerpts" />

      <UserContentDataTable
        totalDataCount={excerptCount}
        columns={USER_EXCERPT_COLUMNS}
        data={excerpts}
      />
    </div>
  );
}
