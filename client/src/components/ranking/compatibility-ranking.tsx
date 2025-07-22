import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RankingItem {
  rank: number;
  type1: string;
  type2: string;
  score: number;
  participants: number;
}

export function CompatibilityRanking() {
  const { data: topCombinations, isLoading } = useQuery({
    queryKey: ["/api/ranking/top-combinations"],
    enabled: true
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/compatibility/stats"],
    enabled: true
  });

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-warm-yellow to-sunset-orange";
      case 2:
        return "bg-gradient-to-r from-soft-teal to-mint-green";
      case 3:
        return "bg-gradient-to-r from-love-purple to-romantic-pink";
      default:
        return "bg-gray-200";
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
        return "text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-deep-blue mb-4 flex items-center justify-center">
          <Trophy className="mr-3 text-warm-yellow" size={40} />
          궁합 랭킹
        </h2>
        <p className="text-xl text-gray-600">실시간 인기 궁합 순위와 통계</p>
      </div>

      {/* Statistics Cards */}
      {stats && typeof stats === 'object' && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <div className="text-3xl font-bold text-romantic-pink mb-2">
                {(stats as any).totalTests?.toLocaleString() || '0'}
              </div>
              <p className="text-gray-600">총 테스트 참여자</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">💕</div>
              <div className="text-3xl font-bold text-soft-teal mb-2">
                {(stats as any).averageScore ? `${Math.round((stats as any).averageScore)}%` : '0%'}
              </div>
              <p className="text-gray-600">평균 궁합도</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <div className="text-3xl font-bold text-love-purple mb-2">
                {(stats as any).popularCombinations?.length || '0'}
              </div>
              <p className="text-gray-600">인기 궁합 조합</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Rankings */}
      <Card className="shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-deep-blue mb-8 text-center flex items-center justify-center">
            <TrendingUp className="mr-2" size={24} />
            🔥 실시간 인기 궁합 TOP 10
          </h3>
          
          {topCombinations && Array.isArray(topCombinations) && topCombinations.length > 0 ? (
            <div className="space-y-4">
              {/* Top 3 Featured */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {topCombinations.slice(0, 3).map((combo: RankingItem, index: number) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6 text-center relative overflow-hidden">
                      <div className={`absolute top-4 right-4 ${getRankBadgeStyle(combo.rank)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {combo.rank}위
                      </div>
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-deep-blue mb-2">
                          {combo.type1} ↔ {combo.type2}
                        </div>
                        <div className={`text-3xl font-bold mb-2 ${getRankTextStyle(combo.rank)}`}>
                          {combo.score}%
                        </div>
                        <p className="text-sm text-gray-600 flex items-center justify-center">
                          <Users className="mr-1" size={14} />
                          {combo.participants?.toLocaleString() || '0'}명 참여
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Remaining Rankings */}
              {topCombinations.length > 3 && (
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-deep-blue mb-4">4위 ~ 10위</h4>
                  {topCombinations.slice(3, 10).map((combo: RankingItem, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                          {combo.rank}
                        </span>
                        <div>
                          <span className="font-medium text-deep-blue">{combo.type1} ↔ {combo.type2}</span>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Users className="mr-1" size={12} />
                            {combo.participants?.toLocaleString() || '0'}명 참여
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-700 text-lg">{combo.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">아직 랭킹 데이터가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">궁합 테스트를 진행하여 랭킹을 만들어보세요!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Insights */}
      <div className="bg-gradient-to-r from-romantic-pink/10 to-soft-teal/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-deep-blue mb-6 text-center">
          📈 트렌드 인사이트
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-romantic-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">가장 인기있는 조합</h4>
            <p className="text-sm text-gray-600">
              {topCombinations && Array.isArray(topCombinations) && topCombinations.length > 0 
                ? `${topCombinations[0]?.type1} ↔ ${topCombinations[0]?.type2}`
                : '데이터 없음'
              }
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-soft-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">평균 궁합도</h4>
            <p className="text-sm text-gray-600">
              {stats && typeof stats === 'object' && (stats as any).averageScore ? `${Math.round((stats as any).averageScore)}%` : '계산 중...'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">활발한 참여</h4>
            <p className="text-sm text-gray-600">
              매일 새로운 궁합 테스트가 진행되고 있어요
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-love-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">높은 만족도</h4>
            <p className="text-sm text-gray-600">
              대부분의 조합이 80% 이상의 궁합도를 보여요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
