import { Badge } from "@/components/ui/badge";
import { selectTags } from "@/lib/database/handlers/tags";
import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function TagsRoot({ searchParams }: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);

  const tags = await selectTags(params);

  return (
    <section>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            className="px-4 py-2 text-md text-white bg-zinc-600"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
