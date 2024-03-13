CREATE TABLE IF NOT EXISTS "icon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file" text NOT NULL,
	"title" text,
	"description" text,
	"date_added" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"added_by" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icon" ADD CONSTRAINT "icon_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
