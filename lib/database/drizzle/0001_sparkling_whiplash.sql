CREATE TABLE IF NOT EXISTS "excerpt_tag" (
	"excerpt_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "excerpt_tag_tag_id_excerpt_id_pk" PRIMARY KEY("tag_id","excerpt_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date_added" timestamp DEFAULT now(),
	"added_by" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_tag" ADD CONSTRAINT "excerpt_tag_excerpt_id_excerpt_id_fk" FOREIGN KEY ("excerpt_id") REFERENCES "excerpt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_tag" ADD CONSTRAINT "excerpt_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
