import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCompatibilityTestSchema, 
  insertBalanceGameResultSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // MBTI Types
  app.get("/api/mbti-types", async (req, res) => {
    try {
      const types = await storage.getAllMbtiTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MBTI types" });
    }
  });

  app.get("/api/mbti-types/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const type = await storage.getMbtiType(code.toUpperCase());
      if (!type) {
        return res.status(404).json({ error: "MBTI type not found" });
      }
      res.json(type);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MBTI type" });
    }
  });

  // Compatibility
  app.get("/api/compatibility/:type1/:type2", async (req, res) => {
    try {
      const { type1, type2 } = req.params;
      const result = await storage.getCompatibilityResult(
        type1.toUpperCase(), 
        type2.toUpperCase()
      );
      
      if (!result) {
        // Generate a basic compatibility score if not found
        const score = Math.floor(Math.random() * 20) + 80; // 80-99%
        return res.json({
          type1: type1.toUpperCase(),
          type2: type2.toUpperCase(),
          score,
          analysis: {
            description: `${type1.toUpperCase()}와 ${type2.toUpperCase()}의 궁합은 ${score}%입니다.`,
            emotional: "감정적 교감을 통한 성장",
            intellectual: "서로 다른 관점의 조화",
            practical: "상호 보완적인 관계"
          },
          strengths: ["서로 다른 매력", "성장 가능성", "새로운 경험"],
          challenges: ["소통 방식 차이", "가치관 차이"],
          advice: ["서로 이해하려 노력하기", "충분한 대화 시간 갖기"]
        });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch compatibility result" });
    }
  });

  app.post("/api/compatibility/test", async (req, res) => {
    try {
      const validatedData = insertCompatibilityTestSchema.parse(req.body);
      const test = await storage.createCompatibilityTest(validatedData);
      res.json(test);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create compatibility test" });
    }
  });

  app.get("/api/compatibility/stats", async (req, res) => {
    try {
      const stats = await storage.getCompatibilityStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch compatibility stats" });
    }
  });

  // Balance Game
  app.post("/api/balance-game/result", async (req, res) => {
    try {
      const validatedData = insertBalanceGameResultSchema.parse(req.body);
      const result = await storage.createBalanceGameResult(validatedData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create balance game result" });
    }
  });

  app.get("/api/balance-game/results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const results = await storage.getBalanceGameResults(sessionId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch balance game results" });
    }
  });

  // Ranking endpoints
  app.get("/api/ranking/top-combinations", async (req, res) => {
    try {
      const stats = await storage.getCompatibilityStats();
      const topCombinations = stats.popularCombinations
        .sort((a, b) => b.avgScore - a.avgScore)
        .slice(0, 10)
        .map((combo, index) => ({
          rank: index + 1,
          type1: combo.type1,
          type2: combo.type2,
          score: Math.round(combo.avgScore),
          participants: combo.count
        }));
      
      res.json(topCombinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top combinations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
