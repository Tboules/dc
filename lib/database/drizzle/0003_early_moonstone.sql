CREATE TABLE IF NOT EXISTS "content_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_status_name_unique" UNIQUE("name")
);
