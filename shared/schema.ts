import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const mbtiTypes = pgTable("mbti_types", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // e.g., "ENFP"
  name: text("name").notNull(),
  description: text("description").notNull(),
  traits: jsonb("traits").notNull(), // personality traits
  datingStyle: jsonb("dating_style").notNull(),
  communicationStyle: jsonb("communication_style").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const compatibilityResults = pgTable("compatibility_results", {
  id: serial("id").primaryKey(),
  type1: text("type1").notNull(),
  type2: text("type2").notNull(),
  score: integer("score").notNull(), // 0-100
  analysis: jsonb("analysis").notNull(),
  strengths: jsonb("strengths").notNull(),
  challenges: jsonb("challenges").notNull(),
  advice: jsonb("advice").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const compatibilityTests = pgTable("compatibility_tests", {
  id: serial("id").primaryKey(),
  userType: text("user_type").notNull(),
  partnerType: text("partner_type").notNull(),
  score: integer("score").notNull(),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const balanceGameResults = pgTable("balance_game_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  gameType: text("game_type").notNull(), // dating-style, communication, etc.
  answers: jsonb("answers").notNull(),
  resultType: text("result_type"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMbtiTypeSchema = createInsertSchema(mbtiTypes).omit({
  id: true,
  createdAt: true,
});

export const insertCompatibilityResultSchema = createInsertSchema(compatibilityResults).omit({
  id: true,
  createdAt: true,
});

export const insertCompatibilityTestSchema = createInsertSchema(compatibilityTests).omit({
  id: true,
  createdAt: true,
});

export const insertBalanceGameResultSchema = createInsertSchema(balanceGameResults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type MbtiType = typeof mbtiTypes.$inferSelect;
export type InsertMbtiType = z.infer<typeof insertMbtiTypeSchema>;
export type CompatibilityResult = typeof compatibilityResults.$inferSelect;
export type InsertCompatibilityResult = z.infer<typeof insertCompatibilityResultSchema>;
export type CompatibilityTest = typeof compatibilityTests.$inferSelect;
export type InsertCompatibilityTest = z.infer<typeof insertCompatibilityTestSchema>;
export type BalanceGameResult = typeof balanceGameResults.$inferSelect;
export type InsertBalanceGameResult = z.infer<typeof insertBalanceGameResultSchema>;
