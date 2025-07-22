import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MBTIType } from "@/types/mbti";
import { MBTI_TYPES } from "@/lib/mbti-data";
import { 
  calculateMBTICompatibility, 
  getCompatibilityLevel,
  generateCompatibilityAnalysis,
  generateCompatibilityStrengths,
  generateCompatibilityChallenges,
  generateCompatibilityAdvice
} from "@/lib/compatibility";
import { apiRequest } from "@/lib/queryClient";

const MBTI_OPTIONS: { value: MBTIType; label: string }[] = [
  { value: "ENFP", label: "ENFP - 활동가" },
  { value: "ENFJ", label: "ENFJ - 선도자" },
  { value: "ENTP", label: "ENTP - 토론가" },
  { value: "ENTJ", label: "ENTJ - 통솔자" },
  { value: "ESFP", label: "ESFP - 연예인" },
  { value: "ESFJ", label: "ESFJ - 집정관" },
  { value: "ESTP", label: "ESTP - 사업가" },
  { value: "ESTJ", label: "ESTJ - 경영자" },
  { value: "INFP", label: "INFP - 중재자" },
  { value: "INFJ", label: "INFJ - 옹호자" },
  { value: "INTP", label: "INTP - 논리술사" },
  { value: "INTJ", label: "INTJ - 건축가" },
  { value: "ISFP", label: "ISFP - 모험가" },
  { value: "ISFJ", label: "ISFJ - 수호자" },
  { value: "ISTP", label: "ISTP - 만능재주꾼" },
  { value: "ISTJ", label: "ISTJ - 현실주의자" }
];

interface CompatibilityResultProps {
  userType: MBTIType;
  partnerType: MBTIType;
  score: number;
  analysis: any;
  strengths: string[];
  challenges: string[];
  advice: string[];
}

function CompatibilityResult({ userType, partnerType, score, analysis, strengths, challenges, advice }: CompatibilityResultProps) {
  return (
    <div className="bg-gradient-to-r from-warm-yellow/20 to-mint-green/20 rounded-2xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-deep-blue mb-2">궁합 결과</h3>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-2xl font-bold text-romantic-pink">{userType}</span>
          <Heart className="text-3xl text-love-purple animate-pulse" size={32} />
          <span className="text-2xl font-bold text-soft-teal">{partnerType}</span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-deep-blue mb-2">{score}%</div>
        <div className="w-full max-w-md mx-auto mb-4">
          <div className="compatibility-meter">
            <div 
              className="h-full transition-all duration-1000 bg-gradient-to-r from-romantic-pink via-warm-yellow to-soft-teal rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        <p className="text-xl text-gray-600">{getCompatibilityLevel(score)}</p>
      </div>
      
      <div className="text-left max-w-3xl mx-auto space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-deep-blue mb-3 flex items-center">
            <Users className="mr-2" size={20} />
            상세 분석
          </h4>
          <p className="text-gray-700 mb-3">{analysis.description}</p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/50 p-3 rounded-lg">
              <div className="font-medium text-romantic-pink mb-1">감정적 측면</div>
              <div className="text-gray-600">{analysis.emotional}</div>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <div className="font-medium text-soft-teal mb-1">지적 측면</div>
              <div className="text-gray-600">{analysis.intellectual}</div>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <div className="font-medium text-love-purple mb-1">실용적 측면</div>
              <div className="text-gray-600">{analysis.practical}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-semibold text-green-600 mb-2">👍 장점</h5>
            <ul className="space-y-1 text-sm text-gray-600">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-orange-600 mb-2">⚠️ 주의사항</h5>
            <ul className="space-y-1 text-sm text-gray-600">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-blue-600 mb-2">💡 조언</h5>
            <ul className="space-y-1 text-sm text-gray-600">
              {advice.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompatibilityChecker() {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<MBTIType | "">("");
  const [partnerType, setPartnerType] = useState<MBTIType | "">("");
  const [result, setResult] = useState<CompatibilityResultProps | null>(null);
  const queryClient = useQueryClient();

  const { data: popularCombinations } = useQuery({
    queryKey: ["/api/ranking/top-combinations"],
    enabled: true
  });

  const saveTestMutation = useMutation({
    mutationFn: async (data: { userType: string; partnerType: string; score: number }) => {
      return apiRequest("POST", "/api/compatibility/test", {
        ...data,
        sessionId: `session_${Date.now()}`
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ranking/top-combinations"] });
    }
  });

  const handleCompatibilityCheck = async () => {
    if (!userType || !partnerType) {
      alert(t("selectBothTypes") || "양쪽 MBTI를 모두 선택해 주세요.");
      return;
    }

    const score = calculateMBTICompatibility(userType as MBTIType, partnerType as MBTIType);
    const analysis = generateCompatibilityAnalysis(userType as MBTIType, partnerType as MBTIType, score);
    const strengths = generateCompatibilityStrengths(userType as MBTIType, partnerType as MBTIType);
    const challenges = generateCompatibilityChallenges(userType as MBTIType, partnerType as MBTIType);
    const advice = generateCompatibilityAdvice(userType as MBTIType, partnerType as MBTIType);

    setResult({
      userType: userType as MBTIType,
      partnerType: partnerType as MBTIType,
      score,
      analysis,
      strengths,
      challenges,
      advice
    });

    // Save test result
    saveTestMutation.mutate({
      userType: userType as string,
      partnerType: partnerType as string,
      score
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-deep-blue mb-4 flex items-center justify-center">
          <Heart className="mr-3 text-romantic-pink" size={40} />
          MBTI 궁합 테스트
        </h2>
        <p className="text-xl text-gray-600">16가지 성격 유형으로 알아보는 완벽한 궁합 분석</p>
      </div>

      {/* Detailed Compatibility Checker */}
      <Card className="shadow-xl">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Your MBTI Card */}
            <div className="bg-gradient-to-br from-romantic-pink/10 to-romantic-pink/5 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-deep-blue mb-4 flex items-center">
                <Users className="mr-3 text-romantic-pink" size={24} />
                내 MBTI
              </h3>
              <Select value={userType} onValueChange={(value: string) => setUserType(value as MBTIType | "")}>
                <SelectTrigger className="w-full bg-white border-2 border-romantic-pink/20 rounded-xl px-4 py-3 text-lg focus:border-romantic-pink">
                  <SelectValue placeholder="성격 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {MBTI_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {userType && MBTI_TYPES[userType as MBTIType] && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    {MBTI_TYPES[userType as MBTIType].description}
                  </p>
                </div>
              )}
            </div>

            {/* Partner MBTI Card */}
            <div className="bg-gradient-to-br from-soft-teal/10 to-soft-teal/5 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-deep-blue mb-4 flex items-center">
                <Heart className="mr-3 text-soft-teal" size={24} />
                상대방 MBTI
              </h3>
              <Select value={partnerType} onValueChange={(value: string) => setPartnerType(value as MBTIType | "")}>
                <SelectTrigger className="w-full bg-white border-2 border-soft-teal/20 rounded-xl px-4 py-3 text-lg focus:border-soft-teal">
                  <SelectValue placeholder="성격 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {MBTI_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {partnerType && MBTI_TYPES[partnerType as MBTIType] && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    {MBTI_TYPES[partnerType as MBTIType].description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Check Compatibility Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={handleCompatibilityCheck}
              disabled={!userType || !partnerType}
              className="bg-gradient-to-r from-romantic-pink to-soft-teal hover:from-soft-teal hover:to-romantic-pink text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
            >
              <Sparkles className="mr-3" size={24} />
              궁합 분석하기
            </Button>
          </div>

          {/* Compatibility Result */}
          {result && (
            <CompatibilityResult {...result} />
          )}
        </CardContent>
      </Card>

      {/* Popular Compatibility Combinations */}
      {popularCombinations && Array.isArray(popularCombinations) && popularCombinations.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <h3 className="col-span-full text-2xl font-bold text-deep-blue mb-4 text-center">
            🔥 인기 궁합 TOP 3
          </h3>
          {Array.isArray(popularCombinations) ? popularCombinations.slice(0, 3).map((combo: any, index: number) => (
            <Card key={index} className="card-hover shadow-lg">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white ${
                  index === 0 ? 'bg-gradient-to-r from-warm-yellow to-sunset-orange' :
                  index === 1 ? 'bg-gradient-to-r from-soft-teal to-mint-green' :
                  'bg-gradient-to-r from-love-purple to-romantic-pink'
                }`}>
                  {index + 1}위
                </div>
                <div className="text-lg font-semibold text-deep-blue mb-2">
                  {combo.type1} ↔ {combo.type2}
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  index === 0 ? 'text-romantic-pink' :
                  index === 1 ? 'text-soft-teal' :
                  'text-love-purple'
                }`}>
                  {combo.score}%
                </div>
                <p className="text-sm text-gray-600">{combo.participants}명 참여</p>
              </CardContent>
            </Card>
          )) : null}
        </div>
      )}
    </div>
  );
}
