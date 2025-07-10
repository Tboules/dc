import { sql } from "drizzle-orm";
import { timestamp, pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoles = pgTable("user_role", {
  id: serial().primaryKey().notNull(),
  name: text("name"),
});

export const newUserRoleSchema = createInsertSchema(userRoles);

export type NewUserRole = z.infer<typeof newUserRoleSchema>;

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: integer("role")
    .references(() => userRoles.id)
    .notNull(),
});
