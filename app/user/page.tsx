import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserRoot() {
  await handleProtectedRoute("/user");

  return (
    <div>
      <h1>Hello User Page</h1>
    </div>
  );
}
