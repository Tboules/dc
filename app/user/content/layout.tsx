import { headers } from "next/headers";

export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // user the following to get this done
  //https://www.propelauth.com/post/getting-url-in-next-server-components
  const headersList = await headers();
  console.log(headersList.get("referrer"));
  // await handleProtectedRoute(slug as Route["pathname"]);

  return (
    <>
      <h1>User Content Page</h1>
      {children}
    </>
  );
}
