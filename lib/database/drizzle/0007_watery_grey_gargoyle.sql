ALTER TABLE "excerpt" ALTER COLUMN "date_added" SET NOT NULL;--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."excerpt_document" AS (select "excerpt"."id", "excerpt"."body", "excerpt"."title", "desert_figure"."full_name", "desert_figure"."id", "reference"."title", "reference"."id", "reference"."source", "reference"."cover", "content_status"."name", "content_status"."id", 
          json_agg(
            json_build_object(
              'tagID', "tag"."id",
              'tag', "tag"."name"
            )
          )
         as "tags" from "excerpt" left join "desert_figure" on "desert_figure"."id" = "excerpt"."desert_figure_id" left join "reference" on "reference"."id" = "excerpt"."reference_id" left join "content_status" on "content_status"."id" = "excerpt"."status_id" left join "excerpt_tag" on "excerpt_tag"."excerpt_id" = "excerpt"."id" left join "tag" on "excerpt_tag"."tag_id" = "tag"."id" group by "excerpt"."id", "excerpt"."body", "excerpt"."title", "desert_figure"."full_name", "desert_figure"."id", "reference"."title", "reference"."id", "reference"."source", "reference"."cover", "content_status"."name", "content_status"."id");