import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function DesertFiguresRoot({
  searchParams,
}: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);
  console.log(params);

  return (
    <div>
      <h1>Hello Desert Figures</h1>
    </div>
  );
}
