import DefaultLayout from "./default-layout";
import GlobalSearchInput from "@/components/global-search-input";

interface LayoutWithSearchProps extends React.PropsWithChildren {
  title: string;
}

export default function LayoutWithSearch({
  children,
  title,
}: LayoutWithSearchProps) {
  return (
    <DefaultLayout>
      <div className="p-4 md:p-16 ">
        <h1 className="text-3xl mb-4">Find {title}...</h1>
        <GlobalSearchInput />
      </div>
      {children}
    </DefaultLayout>
  );
}
