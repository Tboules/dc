import { handleProtectedRoute } from "@/lib/utils/auth";

export default async function UserContentDFPage() {
  await handleProtectedRoute("/user/content/desert-figures");

  return (
    <div>
      <h1>Hello User Desert Figure</h1>
    </div>
  );
}
