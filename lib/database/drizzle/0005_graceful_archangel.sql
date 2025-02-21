CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "desert_figure" ALTER COLUMN "status_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "excerpt" ALTER COLUMN "status_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "status_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role" DEFAULT 'user';