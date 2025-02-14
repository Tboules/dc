ALTER TABLE "desert_figure" ADD COLUMN "status_id" uuid DEFAULT 'e3884d7e-2b30-40b0-bc77-c075ae4739cb' NOT NULL;--> statement-breakpoint
ALTER TABLE "excerpt" ADD COLUMN "status_id" uuid DEFAULT 'e3884d7e-2b30-40b0-bc77-c075ae4739cb' NOT NULL;--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "status_id" uuid DEFAULT 'e3884d7e-2b30-40b0-bc77-c075ae4739cb' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "desert_figure" ADD CONSTRAINT "desert_figure_status_id_content_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."content_status"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "tag" ADD CONSTRAINT "tag_status_id_content_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."content_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
