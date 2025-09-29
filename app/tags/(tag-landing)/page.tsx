import TagBadgeLink from "@/components/tag-badge-link";
import { selectTags } from "@/lib/database/handlers/tags";
import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function TagsRoot({ searchParams }: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);

  const tags = await selectTags(params);
  console.log(tags);

  return (
    <section>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <TagBadgeLink key={tag.id} tag={tag} />
        ))}
      </div>
    </section>
  );
}
