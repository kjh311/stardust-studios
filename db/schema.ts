import { pgTable, text, timestamp, varchar, uuid, integer, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const movieStatusEnum = pgEnum("movie_status", ["processing", "completed", "failed"]);

// Tables
export const stories = pgTable("stories", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  authorId: uuid("author_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // Links to auth.users.id
  credits: integer("credits").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => profiles.id).notNull(),
  status: movieStatusEnum("status").default("processing").notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const scenes = pgTable("scenes", {
  id: uuid("id").primaryKey().defaultRandom(),
  movieId: uuid("movie_id").references(() => movies.id).notNull(),
  videoUrl: text("video_url"),
  sceneOrder: integer("scene_order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types
export type Story = typeof stories.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Movie = typeof movies.$inferSelect;
export type Scene = typeof scenes.$inferSelect;
