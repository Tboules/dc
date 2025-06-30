import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import { UserContentDataTable } from "@/app/user/_components/user-content-data-table";
import {
  selectUserTags,
  selectUserTagsCount,
} from "@/lib/database/handlers/tags";
import {
  PagePropsWithParams,
  userContentSearchParamsLoader,
} from "@/lib/utils/params";
import { USER_TAGS_COLUMNS } from "../../_components/columns";

export default async function UserContentTagsPage({
  searchParams,
}: PagePropsWithParams) {
  await handleProtectedRoute("/user/content/tags");

  const params = await userContentSearchParamsLoader(searchParams);
  const userTags = await selectUserTags(params);

  const userTagCount = await selectUserTagsCount();

  return (
    <div>
      <UserContentSidebarHeader title="User Tags" />

      <UserContentDataTable
        totalDataCount={userTagCount}
        columns={USER_TAGS_COLUMNS}
        data={userTags}
      />
    </div>
  );
}
