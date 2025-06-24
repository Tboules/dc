import { handleProtectedRoute } from "@/lib/utils/auth";
import { UserContentSidebarHeader } from "@/app/user/_components/user-content-header";
import { selectUserDesertFigures } from "@/lib/database/handlers/desert-figures";
import { UserContentDataTable } from "../../_components/user-content-data-table";
import { USER_DESERT_FIGURE_COLUMNS } from "../../_components/columns";

export default async function UserContentDFPage() {
  await handleProtectedRoute("/user/content/desert-figures");

  const desertFigures = await selectUserDesertFigures();

  return (
    <div>
      <UserContentSidebarHeader title="User Desert Figures" />

      <UserContentDataTable
        totalDataCount={10}
        columns={USER_DESERT_FIGURE_COLUMNS}
        data={desertFigures}
      />
    </div>
  );
}
