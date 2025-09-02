export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-(--breakpoint-lg) mx-auto p-4 mb-16">{children}</div>
  );
}
