import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import {
  selectUserTags,
  selectUserTagsCount,
} from "@/lib/database/handlers/tags";
import { SearchParams } from "nuqs/server";
import { userContentSearchParamsLoader } from "@/lib/utils/params";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UserContentTagsPage({ searchParams }: PageProps) {
  await handleProtectedRoute("/user/content/tags");

  const params = await userContentSearchParamsLoader(searchParams);
  const userTags = await selectUserTags(params);

  console.log(userTags);

  const userTagCount = await selectUserTagsCount();

  return (
    <div>
      <UserContentSidebarHeader title="User Tags" />
    </div>
  );
}
