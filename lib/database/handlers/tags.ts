import db from "@/lib/database";
import { tags } from "@/lib/database/schema/tags";
import { count, sql, eq } from "drizzle-orm";
import { Option } from "@/components/ui/multi-select";
import { handleProtectedHandler } from "@/lib/utils/auth";

export async function searchForTagHandler(searchValue: string) {
  const results = await db.execute(
    sql`
      WITH similarity_scores as (
        select *, similarity(${tags.name}, ${searchValue}) as sim_score
        from tag
      ) select *
      from similarity_scores
      where sim_score > 0.1
      order by sim_score desc;
    `,
  );

  return results.rows.map((row: any) => ({
    value: row.id,
    label: row.name,
  })) as Option[];
}

export async function selectUserTagsCount(): Promise<number> {
  const session = await handleProtectedHandler();

  const countQueryResult = await db
    .select({ count: count() })
    .from(tags)
    .where(eq(tags.createdBy, session?.user.id ?? ""));

  return countQueryResult[0].count;
}
