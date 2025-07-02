export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return <div className="max-w-(--breakpoint-lg) mx-auto p-4">{children}</div>;
}
