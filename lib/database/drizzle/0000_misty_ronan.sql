CREATE TABLE IF NOT EXISTS "excerpt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"type" smallint DEFAULT 1 NOT NULL,
	"title" text NOT NULL,
	"reference_id" uuid,
	"article_url" text,
	"desert_figure_id" uuid NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now(),
	"added_by" text,
	"status_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "desert_figure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"title" text,
	"epithet" text,
	"full_name" text NOT NULL,
	"type" smallint DEFAULT 1 NOT NULL,
	"thumbnail" text,
	"date_added" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"added_by" text,
	"status_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date_added" timestamp DEFAULT now(),
	"added_by" text,
	"status_id" uuid NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text NOT NULL,
	"source" text DEFAULT 'open_library' NOT NULL,
	"title" text NOT NULL,
	"sub_title" text,
	"author" text NOT NULL,
	"cover" text,
	"date_added" timestamp DEFAULT now(),
	CONSTRAINT "reference_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "excerpt_tag" (
	"excerpt_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "excerpt_tag_tag_id_excerpt_id_pk" PRIMARY KEY("tag_id","excerpt_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "icon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file" text NOT NULL,
	"title" text,
	"description" text,
	"desert_figure_id" uuid,
	"date_added" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"added_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"role" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_reference_id_reference_id_fk" FOREIGN KEY ("reference_id") REFERENCES "public"."reference"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_desert_figure_id_desert_figure_id_fk" FOREIGN KEY ("desert_figure_id") REFERENCES "public"."desert_figure"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_status_id_content_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."content_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "desert_figure" ADD CONSTRAINT "desert_figure_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "desert_figure" ADD CONSTRAINT "desert_figure_status_id_content_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."content_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_status_id_content_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."content_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_tag" ADD CONSTRAINT "excerpt_tag_excerpt_id_excerpt_id_fk" FOREIGN KEY ("excerpt_id") REFERENCES "public"."excerpt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_tag" ADD CONSTRAINT "excerpt_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icon" ADD CONSTRAINT "icon_desert_figure_id_desert_figure_id_fk" FOREIGN KEY ("desert_figure_id") REFERENCES "public"."desert_figure"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icon" ADD CONSTRAINT "icon_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_role_user_role_id_fk" FOREIGN KEY ("role") REFERENCES "public"."user_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."excerpt_document" AS (select "excerpt"."id" as "excerptId", "excerpt"."body", "excerpt"."title" as "excerptTitle", "desert_figure"."full_name", "desert_figure"."id" as "desertFigureId", "reference"."title" as "referenceTitle", "reference"."id" as "referenceId", "reference"."source", "reference"."cover", "content_status"."name" as "statusName", "content_status"."id" as "statusId", "excerpt"."added_by" as "excerptCreatedBy", 
          json_agg(
            json_build_object(
              'tagID', "tag"."id",
              'tag', "tag"."name"
            )
          )
         as "tags", 
          string_agg("tag"."name", ', ')
         as "tagsSearchable" from "excerpt" left join "desert_figure" on "desert_figure"."id" = "excerpt"."desert_figure_id" left join "reference" on "reference"."id" = "excerpt"."reference_id" left join "content_status" on "content_status"."id" = "excerpt"."status_id" left join "excerpt_tag" on "excerpt_tag"."excerpt_id" = "excerpt"."id" left join "tag" on "excerpt_tag"."tag_id" = "tag"."id" group by "excerpt"."id", "excerpt"."body", "excerpt"."title", "desert_figure"."full_name", "desert_figure"."id", "reference"."title", "reference"."id", "reference"."source", "reference"."cover", "content_status"."name", "content_status"."id");