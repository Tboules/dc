import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/content/layout";
import { selectUserExcerpts } from "@/lib/database/handlers/excerpts";
import PaginationTester from "@/components/pagination-tester";
import { createLoader, parseAsInteger, SearchParams } from "nuqs/server";
import { UserContentDataTable } from "@/app/user/_components/user-content-data-table";
import { USER_EXCERPT_COLUMNS } from "@/app/user/_components/columns";

const offsetSearchParams = createLoader({
  offset: parseAsInteger.withDefault(0),
});

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UserContentExcerptPage({
  searchParams,
}: PageProps) {
  await handleProtectedRoute("/user/content/excerpts");

  const { offset } = await offsetSearchParams(searchParams);
  const excerpts = await selectUserExcerpts(10, offset);

  return (
    <div>
      <UserContentSidebarHeader title="User Excerpts" />
      <PaginationTester />

      <UserContentDataTable columns={USER_EXCERPT_COLUMNS} data={excerpts} />
    </div>
  );
}
