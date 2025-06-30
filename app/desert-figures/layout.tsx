import LayoutWithSearch from "@/components/layouts/layout-with-search";

export default function DesertFiguresLayout({
  children,
}: React.PropsWithChildren) {
  return <LayoutWithSearch title="Desert Figures">{children}</LayoutWithSearch>;
}
