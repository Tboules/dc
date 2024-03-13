ALTER TABLE "icon" ADD COLUMN "desert_figure_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icon" ADD CONSTRAINT "icon_desert_figure_id_desert_figure_id_fk" FOREIGN KEY ("desert_figure_id") REFERENCES "desert_figure"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
