CREATE TABLE IF NOT EXISTS "excerpt_love" (
	"excerpt_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_love" ADD CONSTRAINT "excerpt_love_excerpt_id_excerpt_id_fk" FOREIGN KEY ("excerpt_id") REFERENCES "public"."excerpt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt_love" ADD CONSTRAINT "excerpt_love_user_id_excerpt_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."excerpt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
