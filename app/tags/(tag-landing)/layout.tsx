import LayoutWithSearch from "@/components/layouts/layout-with-search";

export default function TagsLayout({ children }: React.PropsWithChildren) {
  return <LayoutWithSearch title="Tags">{children}</LayoutWithSearch>;
}
