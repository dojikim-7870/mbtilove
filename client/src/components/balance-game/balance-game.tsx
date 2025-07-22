import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { BalanceGameQuestion } from "@/types/mbti";

const BALANCE_GAME_QUESTIONS: BalanceGameQuestion[] = [
  {
    id: "date_1",
    question: "첫 데이트에서 당신의 선택은?",
    optionA: {
      text: "🎢 놀이공원에서 스릴 만끽",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["외향적", "감각적", "즉흥적"]
    },
    optionB: {
      text: "☕ 조용한 카페에서 깊은 대화",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["내향적", "직관적", "계획적"]
    }
  },
  {
    id: "conflict_1",
    question: "연인과 의견이 다를 때 당신은?",
    optionA: {
      text: "💬 즉시 대화로 해결하려 함",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["외향적", "감정형", "적극적"]
    },
    optionB: {
      text: "🤔 시간을 두고 신중히 생각",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["내향적", "사고형", "신중함"]
    }
  },
  {
    id: "communication_1", 
    question: "감정 표현 방식으로 선호하는 것은?",
    optionA: {
      text: "💝 선물이나 행동으로 표현",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["감각적", "실용적", "행동형"]
    },
    optionB: {
      text: "💌 편지나 말로 진솔하게",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["직관적", "감정형", "표현형"]
    }
  },
  {
    id: "future_1",
    question: "미래 계획에 대한 당신의 스타일은?",
    optionA: {
      text: "📋 구체적인 계획을 세우고 실행",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", 
      traits: ["판단형", "체계적", "계획형"]
    },
    optionB: {
      text: "🌟 상황에 따라 유연하게 대응",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["인식형", "유연함", "적응형"]
    }
  },
  {
    id: "social_1",
    question: "이상적인 주말 데이트는?",
    optionA: {
      text: "👥 친구들과 함께 파티나 모임",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["외향적", "사교적", "활동적"]
    },
    optionB: {
      text: "🏠 둘만의 시간으로 집에서 영화",
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      traits: ["내향적", "친밀함", "조용함"]
    }
  }
];

const GAME_CATEGORIES = [
  {
    id: "dating-style",
    title: "연애 스타일",
    icon: "💝",
    description: "15가지 연애 상황별 선택",
    color: "romantic-pink"
  },
  {
    id: "communication",
    title: "소통 방식", 
    icon: "🗣️",
    description: "대화와 갈등 해결 스타일",
    color: "soft-teal"
  },
  {
    id: "date-preference",
    title: "데이트 취향",
    icon: "🎯", 
    description: "이상적인 데이트 코스 찾기",
    color: "warm-yellow"
  },
  {
    id: "personality",
    title: "성격 분석",
    icon: "💭",
    description: "숨겨진 성격 특성 발견", 
    color: "love-purple"
  }
];

export function BalanceGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [gameType, setGameType] = useState<string>('dating-style');
  const [result, setResult] = useState<{ type: string; score: number; traits: string[] } | null>(null);

  const saveResultMutation = useMutation({
    mutationFn: async (data: { gameType: string; answers: Record<string, string>; resultType?: string; score?: number }) => {
      return apiRequest("POST", "/api/balance-game/result", {
        ...data,
        sessionId: `session_${Date.now()}`
      });
    }
  });

  const startGame = (category: string) => {
    setGameType(category);
    setGameState('playing');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleOptionSelect = (option: 'A' | 'B') => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;

    const question = BALANCE_GAME_QUESTIONS[currentQuestion];
    setAnswers(prev => ({
      ...prev,
      [question.id]: selectedOption
    }));

    if (currentQuestion < BALANCE_GAME_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Game complete - calculate result
      const finalAnswers = {
        ...answers,
        [question.id]: selectedOption
      };
      calculateResult(finalAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    // Simple MBTI-style analysis based on answers
    const traits = {
      E: 0, I: 0, // Extroversion vs Introversion
      S: 0, N: 0, // Sensing vs Intuition  
      T: 0, F: 0, // Thinking vs Feeling
      J: 0, P: 0  // Judging vs Perceiving
    };

    // Count trait indicators from answers
    Object.entries(finalAnswers).forEach(([questionId, answer]) => {
      const question = BALANCE_GAME_QUESTIONS.find(q => q.id === questionId);
      if (!question) return;

      const selectedTraits = answer === 'A' ? question.optionA.traits : question.optionB.traits;
      
      selectedTraits.forEach(trait => {
        if (trait.includes('외향') || trait.includes('사교') || trait.includes('활동')) traits.E++;
        if (trait.includes('내향') || trait.includes('조용') || trait.includes('신중')) traits.I++;
        if (trait.includes('감각') || trait.includes('실용') || trait.includes('현실')) traits.S++;
        if (trait.includes('직관') || trait.includes('창의') || trait.includes('이상')) traits.N++;
        if (trait.includes('사고') || trait.includes('논리') || trait.includes('객관')) traits.T++;
        if (trait.includes('감정') || trait.includes('공감') || trait.includes('배려')) traits.F++;
        if (trait.includes('판단') || trait.includes('계획') || trait.includes('체계')) traits.J++;
        if (trait.includes('인식') || trait.includes('유연') || trait.includes('즉흥')) traits.P++;
      });
    });

    // Determine dominant type
    const mbtiType = 
      (traits.E > traits.I ? 'E' : 'I') +
      (traits.S > traits.N ? 'S' : 'N') + 
      (traits.T > traits.F ? 'T' : 'F') +
      (traits.J > traits.P ? 'J' : 'P');

    const score = Math.floor(Math.random() * 15) + 85; // 85-99%
    const dominantTraits = Object.entries(finalAnswers).flatMap(([questionId, answer]) => {
      const question = BALANCE_GAME_QUESTIONS.find(q => q.id === questionId);
      return question ? (answer === 'A' ? question.optionA.traits : question.optionB.traits) : [];
    }).slice(0, 3);

    const gameResult = {
      type: mbtiType,
      score,
      traits: dominantTraits
    };

    setResult(gameResult);
    setGameState('result');

    // Save result
    saveResultMutation.mutate({
      gameType,
      answers: finalAnswers,
      resultType: mbtiType,
      score
    });
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / BALANCE_GAME_QUESTIONS.length) * 100;

  if (gameState === 'menu') {
    return (
      <div className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-deep-blue mb-4">🎮 MBTI 밸런스 게임</h2>
          <p className="text-xl text-gray-600">재미있는 선택으로 알아보는 나의 진짜 성향</p>
        </div>

        {/* Game Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAME_CATEGORIES.map((category) => (
            <Card key={category.id} className="card-hover shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h4 className="font-semibold text-deep-blue mb-2">{category.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <Button 
                  onClick={() => startGame(category.id)}
                  className={`bg-${category.color} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition`}
                >
                  시작하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Instructions */}
        <div className="bg-gradient-to-r from-romantic-pink/10 to-soft-teal/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-deep-blue mb-6 text-center">
            🎯 게임 방법
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-romantic-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">카테고리 선택</h4>
              <p className="text-sm text-gray-600">관심있는 주제를 선택하세요</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-soft-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">선택하기</h4>
              <p className="text-sm text-gray-600">두 옵션 중 더 끌리는 것을 선택</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">5문항 완료</h4>
              <p className="text-sm text-gray-600">총 5개의 질문에 답변</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-love-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">결과 확인</h4>
              <p className="text-sm text-gray-600">나의 성향과 MBTI 타입 분석</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = BALANCE_GAME_QUESTIONS[currentQuestion];
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-deep-blue mb-4">🎮 밸런스 게임</h2>
          <p className="text-xl text-gray-600">선택을 통해 나의 성향을 알아보세요</p>
        </div>

        {/* Balance Game Interface */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-deep-blue mb-4">{question.question}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <Progress value={progress} className="h-2" />
              </div>
              <p className="text-gray-600">{currentQuestion + 1}/{BALANCE_GAME_QUESTIONS.length} 문항</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Option A */}
              <div 
                onClick={() => handleOptionSelect('A')}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-8 text-center border-2 ${
                  selectedOption === 'A' 
                    ? 'border-romantic-pink ring-4 ring-romantic-pink/20 bg-gradient-to-br from-romantic-pink/10 to-romantic-pink/5' 
                    : 'border-transparent bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg hover:border-romantic-pink/50'
                }`}
              >
                <img 
                  src={question.optionA.image}
                  alt="Option A"
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="text-xl font-semibold text-deep-blue mb-3">{question.optionA.text}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {question.optionA.traits.map((trait, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-romantic-pink/20 text-romantic-pink text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Option B */}
              <div 
                onClick={() => handleOptionSelect('B')}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-8 text-center border-2 ${
                  selectedOption === 'B' 
                    ? 'border-soft-teal ring-4 ring-soft-teal/20 bg-gradient-to-br from-soft-teal/10 to-soft-teal/5' 
                    : 'border-transparent bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg hover:border-soft-teal/50'
                }`}
              >
                <img 
                  src={question.optionB.image}
                  alt="Option B"
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="text-xl font-semibold text-deep-blue mb-3">{question.optionB.text}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {question.optionB.traits.map((trait, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-soft-teal/20 text-soft-teal text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className="bg-gradient-to-r from-love-purple to-romantic-pink text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                <ArrowRight className="mr-2" size={20} />
                {currentQuestion < BALANCE_GAME_QUESTIONS.length - 1 ? '다음 문항' : '결과 보기'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'result' && result) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-deep-blue mb-4">🎉 게임 결과</h2>
          <p className="text-xl text-gray-600">당신의 성향 분석이 완료되었습니다!</p>
        </div>

        <Card className="shadow-xl animate-fade-in">
          <CardContent className="p-8 text-center">
            <div className="bg-gradient-to-r from-warm-yellow/20 to-mint-green/20 rounded-2xl p-8 mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-3xl font-bold text-deep-blue mb-4">당신의 성향은</h3>
              <div className="text-5xl font-bold text-romantic-pink mb-4">{result.type}</div>
              <div className="text-2xl font-semibold text-gray-600 mb-6">매칭도: {result.score}%</div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-deep-blue mb-3">주요 특징</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {result.traits.map((trait, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-romantic-pink/20 text-romantic-pink rounded-full font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={resetGame}
                className="bg-gradient-to-r from-soft-teal to-mint-green text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="mr-2" size={20} />
                다른 게임 하기
              </Button>
              
              <Button 
                variant="outline"
                className="border-romantic-pink text-romantic-pink hover:bg-romantic-pink hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Trophy className="mr-2" size={20} />
                궁합 테스트 하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
