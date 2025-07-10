import db from "@/lib/database";
import { tags } from "@/lib/database/schema/tags";
import { count, and, sql, eq } from "drizzle-orm";
import { Option } from "@/components/ui/multi-select";
import { handleProtectedHandler } from "@/lib/utils/auth";
import {
  GlobalSearchParams,
  UserContentSearchParams,
} from "@/lib/utils/params";
import { contentStatus, excerpts, excerptTags } from "../schema";
import { CONTENT_STATUS } from "@/lib/enums";

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

export async function selectUserTags({
  page,
  pageLimit,
  q,
}: UserContentSearchParams) {
  const session = await handleProtectedHandler();

  const hasSearch = q.trim().length > 0;

  const tags = await db.query.tags.findMany({
    with: {
      status: true,
    },
    where: (tags, { eq }) => eq(tags.createdBy, session.user.id ?? ""),
    orderBy: hasSearch
      ? (tags) => sql`similarity(${tags.name}, ${q}) DESC`
      : undefined,
    limit: pageLimit,
    offset: pageLimit * page,
  });

  return tags;
}

export type UserTag = Awaited<ReturnType<typeof selectUserTags>>[number];

export async function selectUserTagsCount(): Promise<number> {
  const session = await handleProtectedHandler();

  const countQueryResult = await db
    .select({ count: count() })
    .from(tags)
    .where(eq(tags.createdBy, session?.user.id ?? ""));

  return countQueryResult[0].count;
}

// FUNCTION TO QUERY ALL TAGS

export async function selectTags({ q }: GlobalSearchParams) {
  const hasSearch = q.trim().length > 0;

  let queryResults = db
    .select({
      name: tags.name,
      id: tags.id,
    })
    .from(tags)
    .leftJoin(contentStatus, eq(tags.statusId, contentStatus.id))
    .where(eq(contentStatus.name, CONTENT_STATUS.PUBLISHED))
    .$dynamic();

  if (hasSearch) {
    queryResults = queryResults
      .orderBy(sql`similarity(${tags.name}, ${q}) DESC`)
      .limit(10);
  }

  return await queryResults;
}

export type TagFromSelectTagsFunc = Awaited<
  ReturnType<typeof selectTags>
>[number];

// FUNCTION TO QUERY A SINGLE TAG

export async function selectTagExcerpts(id: string) {
  // obviously now I need to include all of the other joins for this excerpt
  // I think I should create a view for excerpts that refreshes every night, or that at least refreshes after every publish?
  const queryResults = await db
    .select()
    .from(excerpts)
    .leftJoin(excerptTags, eq(excerptTags.excerptId, excerpts.id))
    .leftJoin(tags, eq(excerptTags.tagId, tags.id))
    .leftJoin(contentStatus, eq(excerpts.statusId, contentStatus.id))
    .where(
      and(eq(tags.id, id), eq(contentStatus.name, CONTENT_STATUS.PUBLISHED)),
    );

  return queryResults;
}
