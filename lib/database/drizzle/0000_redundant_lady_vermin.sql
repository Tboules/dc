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
CREATE TABLE IF NOT EXISTS "excerpt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"type" smallint DEFAULT 1 NOT NULL,
	"title" text NOT NULL,
	"reference" text,
	"desert_figure_id" uuid,
	"date_added" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"added_by" text
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
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"date_added" timestamp DEFAULT now(),
	"added_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "desert_figure" ADD CONSTRAINT "desert_figure_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_desert_figure_id_desert_figure_id_fk" FOREIGN KEY ("desert_figure_id") REFERENCES "desert_figure"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excerpt" ADD CONSTRAINT "excerpt_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
 ALTER TABLE "icon" ADD CONSTRAINT "icon_desert_figure_id_desert_figure_id_fk" FOREIGN KEY ("desert_figure_id") REFERENCES "desert_figure"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "icon" ADD CONSTRAINT "icon_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
