import { selectTags } from "@/lib/database/handlers/tags";
import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function TagsRoot({ searchParams }: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);

  const tags = await selectTags(params);

  return (
    <div>
      <pre>{JSON.stringify(tags, null, 2)}</pre>
    </div>
  );
}
