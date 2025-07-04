import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import {
  selectUserDesertFigureCount,
  selectUserDesertFigures,
} from "@/lib/database/handlers/desert-figures";
import { UserContentDataTable } from "../../_components/user-content-data-table";
import { USER_DESERT_FIGURE_COLUMNS } from "../../_components/columns";
import {
  PagePropsWithParams,
  userContentSearchParamsLoader,
} from "@/lib/utils/params";

export default async function UserContentDFPage({
  searchParams,
}: PagePropsWithParams) {
  await handleProtectedRoute("/user/content/desert-figures");

  const params = await userContentSearchParamsLoader(searchParams);
  const desertFigures = await selectUserDesertFigures(params);

  const desertFiguresCount = await selectUserDesertFigureCount();

  return (
    <div>
      <UserContentSidebarHeader title="User Desert Figures" />

      <UserContentDataTable
        totalDataCount={desertFiguresCount}
        columns={USER_DESERT_FIGURE_COLUMNS}
        data={desertFigures}
      />
    </div>
  );
}
