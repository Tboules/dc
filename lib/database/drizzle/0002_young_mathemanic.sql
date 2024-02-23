ALTER TABLE `desert_figure` MODIFY COLUMN `created_by` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `excerpt` MODIFY COLUMN `created_by` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `icon` MODIFY COLUMN `created_by` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `tag` MODIFY COLUMN `created_by` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `desert_figure` ADD CONSTRAINT `desert_figure_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `excerpt` ADD CONSTRAINT `excerpt_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `icon` ADD CONSTRAINT `icon_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag` ADD CONSTRAINT `tag_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;