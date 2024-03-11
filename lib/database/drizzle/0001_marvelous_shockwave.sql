CREATE TABLE IF NOT EXISTS "desert_figure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"title" text,
	"epithet" text,
	"type" smallint DEFAULT 1 NOT NULL,
	"thumbnail" text,
	"date_added" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"added_by" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "desert_figure" ADD CONSTRAINT "desert_figure_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
