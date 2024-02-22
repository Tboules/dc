-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `desert_figure` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255),
	`first_name` varchar(255),
	`last_name` varchar(255),
	`type` int NOT NULL,
	`date_of_birth` timestamp,
	`date_of_death` timestamp,
	`date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_updated` timestamp,
	`created_by` bigint NOT NULL,
	CONSTRAINT `desert_figure_id` PRIMARY KEY(`id`),
	CONSTRAINT `full_name` UNIQUE(`full_name`)
);
--> statement-breakpoint
CREATE TABLE `excerpt` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`body` text NOT NULL,
	`type` int NOT NULL,
	`reference_title` varchar(1024),
	`reference_page` int,
	`reference_url` varchar(2048),
	`desert_figure` bigint NOT NULL,
	`date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_updated` timestamp,
	`created_by` bigint NOT NULL,
	CONSTRAINT `excerpt_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `excerpt_tag` (
	`excerpt_id` bigint NOT NULL,
	`tag_id` bigint NOT NULL,
	CONSTRAINT `excerpt_tag_excerpt_id_tag_id` PRIMARY KEY(`excerpt_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `icon` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`url` varchar(2048) NOT NULL,
	`description` varchar(255),
	`created_by` bigint NOT NULL,
	`desert_figure` bigint NOT NULL,
	`date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_updated` timestamp,
	CONSTRAINT `icon_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `schema_migrations` (
	`version` bigint NOT NULL,
	`dirty` tinyint NOT NULL,
	CONSTRAINT `schema_migrations_version` PRIMARY KEY(`version`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`token` text NOT NULL,
	`user_id` bigint NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` bigint NOT NULL,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`),
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`provider_id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`image` varchar(2048),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `desert_figure` ADD CONSTRAINT `fk_df_user` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `excerpt` ADD CONSTRAINT `fk_excerpt_df` FOREIGN KEY (`desert_figure`) REFERENCES `desert_figure`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `excerpt` ADD CONSTRAINT `fk_excerpt_user` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `excerpt_tag` ADD CONSTRAINT `fk_et_excerpt` FOREIGN KEY (`excerpt_id`) REFERENCES `excerpt`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `excerpt_tag` ADD CONSTRAINT `fk_et_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `icon` ADD CONSTRAINT `fk_icon_df` FOREIGN KEY (`desert_figure`) REFERENCES `desert_figure`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `icon` ADD CONSTRAINT `fk_icon_user` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `fk_session_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `fk_tag_user` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
*/