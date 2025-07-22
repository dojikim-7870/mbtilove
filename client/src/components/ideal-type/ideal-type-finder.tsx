import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Crown, Heart } from "lucide-react";

interface IdealTypeOption {
  id: string;
  mbtiType: string;
  name: string;
  image: string;
  description: string;
  traits: string[];
}

const IDEAL_TYPE_OPTIONS: IdealTypeOption[] = [
  {
    id: "enfp",
    mbtiType: "ENFP",
    name: "활동가",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "열정적이고 창의적인 자유로운 영혼",
    traits: ["모험을 좋아함", "감정 표현이 풍부함", "새로운 경험을 추구"]
  },
  {
    id: "intj",
    mbtiType: "INTJ", 
    name: "건축가",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "신중하고 계획적인 전략가",
    traits: ["깊이 있는 대화를 선호", "독립적이고 자주적", "장기적 관점을 가짐"]
  },
  {
    id: "esfj",
    mbtiType: "ESFJ",
    name: "집정관", 
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "따뜻하고 배려심 많은 사교적 타입",
    traits: ["상대방을 잘 챙김", "사교적이고 친화적", "안정적인 관계 추구"]
  },
  {
    id: "istp",
    mbtiType: "ISTP",
    name: "만능재주꾼",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", 
    description: "실용적이고 독립적인 문제해결사",
    traits: ["실용적이고 현실적", "개인 공간을 중시", "손재주가 뛰어남"]
  }
];

const RECOMMENDED_MATCHES = [
  {
    rank: 1,
    type1: "INFJ",
    type2: "ENTP", 
    score: 96,
    description: "완벽한 보완 관계",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    rank: 2,
    type1: "ENFP", 
    type2: "INTJ",
    score: 94,
    description: "역동적인 조화", 
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    rank: 3,
    type1: "ISFJ",
    type2: "ESFP",
    score: 92,
    description: "안정적인 사랑",
    image: "https://images.unsplash.com/photo-1521341957697-b93449760f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  }
];

export function IdealTypeFinder() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'selection' | 'result'>('selection');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSelectionComplete = () => {
    if (selectedOption) {
      setGamePhase('result');
    }
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-warm-yellow to-sunset-orange";
      case 2:
        return "bg-gradient-to-r from-soft-teal to-mint-green";
      case 3:
        return "bg-gradient-to-r from-love-purple to-romantic-pink";
      default:
        return "bg-gray-400";
    }
  };

  const getRankTextStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-romantic-pink";
      case 2:
        return "text-soft-teal";
      case 3:
        return "text-love-purple";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-deep-blue mb-4">⭐ 이상형 찾기</h2>
        <p className="text-xl text-gray-600">당신의 MBTI에 가장 잘 맞는 이상형을 찾아보세요</p>
      </div>

      {gamePhase === 'selection' && (
        <>
          {/* Ideal Type Finder Tool */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-deep-blue mb-6 text-center">💕 나만의 이상형 월드컵</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {IDEAL_TYPE_OPTIONS.slice(0, 2).map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border-2 ${
                      selectedOption === option.id 
                        ? 'border-romantic-pink ring-4 ring-romantic-pink/20 bg-gradient-to-br from-romantic-pink/10 to-romantic-pink/5' 
                        : 'border-transparent bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg hover:border-romantic-pink/50'
                    }`}
                  >
                    <div className="text-center">
                      <img 
                        src={option.image}
                        alt={option.description}
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
                      />
                      <h4 className="text-xl font-semibold text-deep-blue mb-2">
                        {option.mbtiType} - {option.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        {option.traits.map((trait, index) => (
                          <p key={index} className="flex items-center justify-center">
                            <span className="text-romantic-pink mr-2">•</span>
                            {trait}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleSelectionComplete}
                  disabled={!selectedOption}
                  className="bg-gradient-to-r from-love-purple to-romantic-pink text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  <Crown className="mr-2" size={20} />
                  선택 완료
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {gamePhase === 'result' && selectedOption && (
        <Card className="shadow-xl animate-fade-in">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold text-deep-blue mb-6">🎉 당신의 이상형이 결정되었습니다!</h3>
            
            {(() => {
              const selected = IDEAL_TYPE_OPTIONS.find(opt => opt.id === selectedOption);
              return selected ? (
                <div className="bg-gradient-to-r from-romantic-pink/10 to-soft-teal/10 rounded-2xl p-8 mb-8">
                  <img 
                    src={selected.image}
                    alt={selected.description}
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-4 shadow-xl"
                  />
                  <h4 className="text-2xl font-bold text-deep-blue mb-2">
                    {selected.mbtiType} - {selected.name}
                  </h4>
                  <p className="text-lg text-gray-600 mb-4">{selected.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selected.traits.map((trait, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-romantic-pink/20 text-romantic-pink rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            
            <Button 
              onClick={() => {
                setSelectedOption(null);
                setGamePhase('selection');
              }}
              variant="outline"
              className="border-romantic-pink text-romantic-pink hover:bg-romantic-pink hover:text-white"
            >
              다시 선택하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recommended Matches */}
      <div className="grid md:grid-cols-3 gap-6">
        <h3 className="col-span-full text-2xl font-bold text-deep-blue mb-4 text-center">
          추천 이상형 TOP 3
        </h3>
        
        {RECOMMENDED_MATCHES.map((match) => (
          <Card key={match.rank} className="card-hover shadow-lg relative overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className={`absolute top-4 right-4 ${getRankBadgeStyle(match.rank)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                {match.rank}위
              </div>
              
              <img 
                src={match.image}
                alt={match.description}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              
              <h4 className="text-lg font-semibold text-deep-blue mb-2">
                {match.type1} ↔ {match.type2}
              </h4>
              
              <div className={`text-3xl font-bold mb-2 ${getRankTextStyle(match.rank)}`}>
                {match.score}%
              </div>
              
              <p className="text-sm text-gray-600">{match.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Interactive Elements */}
      <div className="bg-gradient-to-r from-love-purple/10 to-romantic-pink/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-deep-blue mb-6 text-center">
          💎 이상형 매칭 포인트
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-romantic-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">감정적 교감</h4>
            <p className="text-sm text-gray-600">서로의 감정을 이해하고 공감하는 능력</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-soft-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">가치관 일치</h4>
            <p className="text-sm text-gray-600">인생에 대한 비슷한 관점과 목표 공유</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">상호 보완</h4>
            <p className="text-sm text-gray-600">서로 다른 강점으로 균형을 이루는 관계</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-love-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">성장 지향</h4>
            <p className="text-sm text-gray-600">함께 발전하고 성장할 수 있는 잠재력</p>
          </div>
        </div>
      </div>
    </div>
  );
}
