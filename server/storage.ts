import { 
  users, 
  mbtiTypes, 
  compatibilityResults, 
  compatibilityTests,
  balanceGameResults,
  type User, 
  type InsertUser,
  type MbtiType,
  type InsertMbtiType,
  type CompatibilityResult,
  type InsertCompatibilityResult,
  type CompatibilityTest,
  type InsertCompatibilityTest,
  type BalanceGameResult,
  type InsertBalanceGameResult
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMbtiType(code: string): Promise<MbtiType | undefined>;
  getAllMbtiTypes(): Promise<MbtiType[]>;
  createMbtiType(mbtiType: InsertMbtiType): Promise<MbtiType>;
  
  getCompatibilityResult(type1: string, type2: string): Promise<CompatibilityResult | undefined>;
  getAllCompatibilityResults(): Promise<CompatibilityResult[]>;
  createCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult>;
  
  createCompatibilityTest(test: InsertCompatibilityTest): Promise<CompatibilityTest>;
  getCompatibilityStats(): Promise<{ totalTests: number; averageScore: number; popularCombinations: Array<{ type1: string; type2: string; count: number; avgScore: number }> }>;
  
  createBalanceGameResult(result: InsertBalanceGameResult): Promise<BalanceGameResult>;
  getBalanceGameResults(sessionId: string): Promise<BalanceGameResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private mbtiTypes: Map<string, MbtiType>;
  private compatibilityResults: Map<string, CompatibilityResult>;
  private compatibilityTests: CompatibilityTest[];
  private balanceGameResults: BalanceGameResult[];
  private currentUserId: number;
  private currentMbtiId: number;
  private currentCompatibilityId: number;
  private currentTestId: number;
  private currentGameId: number;

  constructor() {
    this.users = new Map();
    this.mbtiTypes = new Map();
    this.compatibilityResults = new Map();
    this.compatibilityTests = [];
    this.balanceGameResults = [];
    this.currentUserId = 1;
    this.currentMbtiId = 1;
    this.currentCompatibilityId = 1;
    this.currentTestId = 1;
    this.currentGameId = 1;
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize MBTI types
    const mbtiData = [
      {
        code: "ENFP",
        name: "활동가",
        description: "재기발랄한 활동가",
        traits: {
          strengths: ["창의적", "열정적", "사교적", "낙천적"],
          weaknesses: ["산만함", "비현실적", "감정기복"],
          keywords: ["자유로운 영혼", "영감", "가능성"]
        },
        datingStyle: {
          approach: "spontaneous",
          values: ["authenticity", "growth", "adventure"],
          preferences: ["deep conversations", "new experiences", "emotional connection"]
        },
        communicationStyle: {
          style: "enthusiastic",
          conflictResolution: "collaborative",
          expressiveness: "high"
        }
      },
      {
        code: "INTJ",
        name: "건축가",
        description: "용의주도한 전략가",
        traits: {
          strengths: ["전략적", "독립적", "결단력", "완벽주의"],
          weaknesses: ["고집", "비판적", "감정표현 부족"],
          keywords: ["계획", "효율성", "지식"]
        },
        datingStyle: {
          approach: "strategic",
          values: ["intelligence", "independence", "long-term commitment"],
          preferences: ["meaningful conversations", "shared goals", "personal space"]
        },
        communicationStyle: {
          style: "direct",
          conflictResolution: "logical",
          expressiveness: "low"
        }
      },
      // Add more MBTI types...
    ];

    mbtiData.forEach(data => {
      const mbtiType: MbtiType = {
        id: this.currentMbtiId++,
        code: data.code,
        name: data.name,
        description: data.description,
        traits: data.traits,
        datingStyle: data.datingStyle,
        communicationStyle: data.communicationStyle,
        createdAt: new Date()
      };
      this.mbtiTypes.set(data.code, mbtiType);
    });

    // Initialize compatibility results
    const compatibilityData = [
      {
        type1: "ENFP",
        type2: "INTJ",
        score: 97,
        analysis: {
          description: "환상의 궁합! 서로 다른 성향이 완벽하게 보완됩니다.",
          emotional: "깊은 정신적 연결",
          intellectual: "창의성과 체계성의 조화",
          practical: "장기적 관계 가능성 높음"
        },
        strengths: ["상호 보완", "성장 자극", "깊은 이해"],
        challenges: ["소통 방식 차이", "에너지 수준 차이"],
        advice: ["서로의 차이점을 존중하기", "충분한 소통 시간 갖기"]
      },
      {
        type1: "INFJ",
        type2: "ENTP",
        score: 96,
        analysis: {
          description: "최고의 파트너! 지적 자극과 감정적 교감의 균형",
          emotional: "깊은 감정적 이해",
          intellectual: "지적 호기심 충족",
          practical: "서로의 성장을 돕는 관계"
        },
        strengths: ["지적 자극", "감정적 지지", "창의적 협력"],
        challenges: ["계획성 차이", "사교성 차이"],
        advice: ["서로의 페이스 맞춰주기", "개인 시간 존중하기"]
      }
    ];

    compatibilityData.forEach(data => {
      const result: CompatibilityResult = {
        id: this.currentCompatibilityId++,
        type1: data.type1,
        type2: data.type2,
        score: data.score,
        analysis: data.analysis,
        strengths: data.strengths,
        challenges: data.challenges,
        advice: data.advice,
        createdAt: new Date()
      };
      this.compatibilityResults.set(`${data.type1}-${data.type2}`, result);
      this.compatibilityResults.set(`${data.type2}-${data.type1}`, result);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMbtiType(code: string): Promise<MbtiType | undefined> {
    return this.mbtiTypes.get(code);
  }

  async getAllMbtiTypes(): Promise<MbtiType[]> {
    return Array.from(this.mbtiTypes.values());
  }

  async createMbtiType(mbtiType: InsertMbtiType): Promise<MbtiType> {
    const id = this.currentMbtiId++;
    const newMbtiType: MbtiType = { 
      ...mbtiType, 
      id, 
      createdAt: new Date() 
    };
    this.mbtiTypes.set(mbtiType.code, newMbtiType);
    return newMbtiType;
  }

  async getCompatibilityResult(type1: string, type2: string): Promise<CompatibilityResult | undefined> {
    return this.compatibilityResults.get(`${type1}-${type2}`) || 
           this.compatibilityResults.get(`${type2}-${type1}`);
  }

  async getAllCompatibilityResults(): Promise<CompatibilityResult[]> {
    const results = Array.from(this.compatibilityResults.values());
    // Remove duplicates (since we store both directions)
    const unique = results.filter((result, index, arr) => 
      index === arr.findIndex(r => 
        (r.type1 === result.type1 && r.type2 === result.type2) ||
        (r.type1 === result.type2 && r.type2 === result.type1)
      )
    );
    return unique;
  }

  async createCompatibilityResult(result: InsertCompatibilityResult): Promise<CompatibilityResult> {
    const id = this.currentCompatibilityId++;
    const newResult: CompatibilityResult = { 
      ...result, 
      id, 
      createdAt: new Date() 
    };
    this.compatibilityResults.set(`${result.type1}-${result.type2}`, newResult);
    this.compatibilityResults.set(`${result.type2}-${result.type1}`, newResult);
    return newResult;
  }

  async createCompatibilityTest(test: InsertCompatibilityTest): Promise<CompatibilityTest> {
    const id = this.currentTestId++;
    const newTest: CompatibilityTest = { 
      ...test, 
      id, 
      createdAt: new Date(),
      sessionId: test.sessionId || null
    };
    this.compatibilityTests.push(newTest);
    return newTest;
  }

  async getCompatibilityStats(): Promise<{ totalTests: number; averageScore: number; popularCombinations: Array<{ type1: string; type2: string; count: number; avgScore: number }> }> {
    const totalTests = this.compatibilityTests.length;
    const averageScore = totalTests > 0 ? 
      this.compatibilityTests.reduce((sum, test) => sum + test.score, 0) / totalTests : 0;

    const combinations = new Map<string, { count: number; totalScore: number }>();
    
    this.compatibilityTests.forEach(test => {
      const key = [test.userType, test.partnerType].sort().join('-');
      const existing = combinations.get(key) || { count: 0, totalScore: 0 };
      combinations.set(key, {
        count: existing.count + 1,
        totalScore: existing.totalScore + test.score
      });
    });

    const popularCombinations = Array.from(combinations.entries())
      .map(([key, data]) => {
        const [type1, type2] = key.split('-');
        return {
          type1,
          type2,
          count: data.count,
          avgScore: data.totalScore / data.count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { totalTests, averageScore, popularCombinations };
  }

  async createBalanceGameResult(result: InsertBalanceGameResult): Promise<BalanceGameResult> {
    const id = this.currentGameId++;
    const newResult: BalanceGameResult = { 
      ...result, 
      id, 
      createdAt: new Date(),
      score: result.score || null,
      resultType: result.resultType || null
    };
    this.balanceGameResults.push(newResult);
    return newResult;
  }

  async getBalanceGameResults(sessionId: string): Promise<BalanceGameResult[]> {
    return this.balanceGameResults.filter(result => result.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
