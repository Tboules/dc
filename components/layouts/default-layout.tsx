export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return <div className="max-w-screen-lg mx-auto p-4">{children}</div>;
}
