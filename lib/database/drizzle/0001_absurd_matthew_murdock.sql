CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `desert_figure` DROP FOREIGN KEY `fk_df_user`;
--> statement-breakpoint
ALTER TABLE `excerpt` DROP FOREIGN KEY `fk_excerpt_df`;
--> statement-breakpoint
ALTER TABLE `excerpt` DROP FOREIGN KEY `fk_excerpt_user`;
--> statement-breakpoint
ALTER TABLE `excerpt_tag` DROP FOREIGN KEY `fk_et_excerpt`;
--> statement-breakpoint
ALTER TABLE `excerpt_tag` DROP FOREIGN KEY `fk_et_tag`;
--> statement-breakpoint
ALTER TABLE `icon` DROP FOREIGN KEY `fk_icon_df`;
--> statement-breakpoint
ALTER TABLE `icon` DROP FOREIGN KEY `fk_icon_user`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `fk_session_user`;
--> statement-breakpoint
ALTER TABLE `tag` DROP FOREIGN KEY `fk_tag_user`;
--> statement-breakpoint
ALTER TABLE `session` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `image` varchar(255);--> statement-breakpoint
ALTER TABLE `session` ADD PRIMARY KEY(`sessionToken`);--> statement-breakpoint
ALTER TABLE `user` DROP INDEX `email`;--> statement-breakpoint
ALTER TABLE `session` ADD `sessionToken` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `expires` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `emailVerified` timestamp(3) DEFAULT (now());--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `token`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `expires_at`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `provider_id`;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;