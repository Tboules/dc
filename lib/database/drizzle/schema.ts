import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  foreignKey,
  primaryKey,
  varchar,
  int,
  unique,
  bigint,
  timestamp,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const account = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 255 }),
    accessToken: varchar("access_token", { length: 255 }),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: varchar("id_token", { length: 2048 }),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => {
    return {
      accountProviderProviderAccountId: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId",
      }),
    };
  },
);

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
    createdBy: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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
    desertFigure: bigint("desert_figure", { mode: "number" }).notNull(),
    dateAdded: timestamp("date_added", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastUpdated: timestamp("last_updated", { mode: "string" }),
    createdBy: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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
    excerptId: bigint("excerpt_id", { mode: "number" }).notNull(),
    tagId: bigint("tag_id", { mode: "number" }).notNull(),
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
    createdBy: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    desertFigure: bigint("desert_figure", { mode: "number" }).notNull(),
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
    sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      sessionSessionToken: primaryKey({
        columns: [table.sessionToken],
        name: "session_sessionToken",
      }),
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
    createdBy: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
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
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      fsp: 3,
      mode: "string",
    }).defaultNow(),
    image: varchar("image", { length: 255 }),
  },
  (table) => {
    return {
      userId: primaryKey({ columns: [table.id], name: "user_id" }),
    };
  },
);

export const verificationToken = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      verificationTokenIdentifierToken: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token",
      }),
    };
  },
);

