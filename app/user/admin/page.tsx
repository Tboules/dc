import { USER_ROLES } from "@/lib/enums";
import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserAdminRoot() {
  await handleProtectedRoute("/user/admin", USER_ROLES.admin);

  return (
    <div>
      <h1>Hello Admin, welcome!</h1>
    </div>
  );
}
