import { handleProtectedRoute } from "@/lib/utils/auth";
import { CURRENT_PATH_IN_HEADER } from "@/lib/utils/constants";
import { headers } from "next/headers";
import { Route } from "nextjs-routes";

export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const currentPath = headersList.get(CURRENT_PATH_IN_HEADER);

  await handleProtectedRoute(currentPath as Route["pathname"]);

  return (
    <>
      <h1>User Content Page</h1>
      {children}
    </>
  );
}
