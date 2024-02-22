import {
  mysqlTable,
  primaryKey,
  unique,
  bigint,
  varchar,
  int,
  timestamp,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const desertFigure = mysqlTable(
  "desert_figure",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    fullName: varchar("full_name", { length: 255 }),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    type: int("type").notNull(),
    dateOfBirth: timestamp("date_of_birth", { mode: "string" }),
    dateOfDeath: timestamp("date_of_death", { mode: "string" }),
    dateAdded: timestamp("date_added", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastUpdated: timestamp("last_updated", { mode: "string" }),
    createdBy: bigint("created_by", { mode: "number" })
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      desertFigureId: primaryKey({
        columns: [table.id],
        name: "desert_figure_id",
      }),
      fullName: unique("full_name").on(table.fullName),
    };
  },
);

export const excerpt = mysqlTable(
  "excerpt",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    body: text("body").notNull(),
    type: int("type").notNull(),
    referenceTitle: varchar("reference_title", { length: 1024 }),
    referencePage: int("reference_page"),
    referenceUrl: varchar("reference_url", { length: 2048 }),
    desertFigure: bigint("desert_figure", { mode: "number" })
      .notNull()
      .references(() => desertFigure.id),
    dateAdded: timestamp("date_added", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastUpdated: timestamp("last_updated", { mode: "string" }),
    createdBy: bigint("created_by", { mode: "number" })
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      excerptId: primaryKey({ columns: [table.id], name: "excerpt_id" }),
    };
  },
);

export const excerptTag = mysqlTable(
  "excerpt_tag",
  {
    excerptId: bigint("excerpt_id", { mode: "number" })
      .notNull()
      .references(() => excerpt.id),
    tagId: bigint("tag_id", { mode: "number" })
      .notNull()
      .references(() => tag.id),
  },
  (table) => {
    return {
      excerptTagExcerptIdTagId: primaryKey({
        columns: [table.excerptId, table.tagId],
        name: "excerpt_tag_excerpt_id_tag_id",
      }),
    };
  },
);

export const icon = mysqlTable(
  "icon",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    url: varchar("url", { length: 2048 }).notNull(),
    description: varchar("description", { length: 255 }),
    createdBy: bigint("created_by", { mode: "number" })
      .notNull()
      .references(() => user.id),
    desertFigure: bigint("desert_figure", { mode: "number" })
      .notNull()
      .references(() => desertFigure.id),
    dateAdded: timestamp("date_added", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastUpdated: timestamp("last_updated", { mode: "string" }),
  },
  (table) => {
    return {
      iconId: primaryKey({ columns: [table.id], name: "icon_id" }),
    };
  },
);

export const schemaMigrations = mysqlTable(
  "schema_migrations",
  {
    version: bigint("version", { mode: "number" }).notNull(),
    dirty: tinyint("dirty").notNull(),
  },
  (table) => {
    return {
      schemaMigrationsVersion: primaryKey({
        columns: [table.version],
        name: "schema_migrations_version",
      }),
    };
  },
);

export const session = mysqlTable(
  "session",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    token: text("token").notNull(),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      sessionId: primaryKey({ columns: [table.id], name: "session_id" }),
    };
  },
);

export const tag = mysqlTable(
  "tag",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    dateAdded: timestamp("date_added", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: bigint("created_by", { mode: "number" })
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      tagId: primaryKey({ columns: [table.id], name: "tag_id" }),
      name: unique("name").on(table.name),
    };
  },
);

export const user = mysqlTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).autoincrement().notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    image: varchar("image", { length: 2048 }),
  },
  (table) => {
    return {
      userId: primaryKey({ columns: [table.id], name: "user_id" }),
      email: unique("email").on(table.email),
    };
  },
);

