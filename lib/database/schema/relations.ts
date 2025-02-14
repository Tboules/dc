import { relations } from "drizzle-orm";
import { desertFigures } from "@/lib/database/schema/desertFigures";
import { excerpts } from "@/lib/database/schema/excerpts";
import { users } from "@/lib/database/schema/users";
import { references } from "@/lib/database/schema/references";
import { excerptTags } from "@/lib/database/schema/excerptTags";
import { tags } from "@/lib/database/schema/tags";
import { contentStatus } from "./content_status";

export const contentStatusRelations = relations(contentStatus, ({ many }) => ({
  excerpts: many(excerpts),
  desertFigures: many(desertFigures),
  tags: many(tags),
}));

export const excerptRelations = relations(excerpts, ({ many, one }) => ({
  desertFigure: one(desertFigures, {
    fields: [excerpts.desertFigureID],
    references: [desertFigures.id],
  }),
  createdBy: one(users, {
    fields: [excerpts.createdBy],
    references: [users.id],
  }),
  reference: one(references, {
    fields: [excerpts.referenceId],
    references: [references.id],
  }),
  status: one(contentStatus, {
    fields: [excerpts.statusId],
    references: [contentStatus.id],
  }),
  excerptToTags: many(excerptTags),
}));

export const desertFigureRelations = relations(
  desertFigures,
  ({ many, one }) => ({
    excerpts: many(excerpts),
    createdBy: one(users, {
      fields: [desertFigures.createdBy],
      references: [users.id],
    }),
    status: one(contentStatus, {
      fields: [desertFigures.statusId],
      references: [contentStatus.id],
    }),
  }),
);

export const referenceRelations = relations(references, ({ many }) => ({
  excerpts: many(excerpts),
}));

export const tagRelations = relations(tags, ({ many, one }) => ({
  createdBy: one(users, {
    fields: [tags.createdBy],
    references: [users.id],
  }),
  excertsToTags: many(excerptTags),
  status: one(contentStatus, {
    fields: [tags.statusId],
    references: [contentStatus.id],
  }),
}));

export const excerptTagRelations = relations(excerptTags, ({ one }) => ({
  excerpt: one(excerpts, {
    fields: [excerptTags.excerptId],
    references: [excerpts.id],
  }),
  tag: one(tags, {
    fields: [excerptTags.tagId],
    references: [tags.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  excerpts: many(excerpts),
  desertFigures: many(desertFigures),
  tags: many(tags),
  references: many(references),
}));
