import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/content/layout";
import {
  selectUserExcerptCount,
  selectUserExcerpts,
} from "@/lib/database/handlers/excerpts";
import { SearchParams } from "nuqs/server";
import { UserContentDataTable } from "@/app/user/_components/user-content-data-table";
import { USER_EXCERPT_COLUMNS } from "@/app/user/_components/columns";
import { paginationSearchParams } from "@/lib/utils/params";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UserContentExcerptPage({
  searchParams,
}: PageProps) {
  await handleProtectedRoute("/user/content/excerpts");

  const { page, pageLimit } = await paginationSearchParams(searchParams);
  const excerpts = await selectUserExcerpts(pageLimit, page * pageLimit);

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
