export default async function UserContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>User Content Page</h1>
      {children}
    </>
  );
}
