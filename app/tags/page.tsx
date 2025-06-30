import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function TagsRoot({ searchParams }: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);

  console.log(params);
  return (
    <div>
      <h1>Hello Tags Root </h1>
    </div>
  );
}
