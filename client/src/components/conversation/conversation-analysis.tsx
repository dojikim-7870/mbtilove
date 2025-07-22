import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Scale, Handshake, Zap, Shield, ChevronRight } from "lucide-react";

export function ConversationAnalysis() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-deep-blue mb-4">💬 대화 성향 분석</h2>
        <p className="text-xl text-gray-600">MBTI별 소통 방식과 갈등 해결 스타일</p>
      </div>

      {/* Communication Patterns */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Introverted vs Extroverted Communication */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-deep-blue mb-6 flex items-center">
              <Users className="mr-3 text-romantic-pink" size={28} />
              내향형 vs 외향형
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-soft-teal pl-6">
                <h4 className="text-lg font-semibold text-soft-teal mb-3">내향형 (I)</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-soft-teal" size={16} />
                    깊이 있는 일대일 대화를 선호
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-soft-teal" size={16} />
                    생각할 시간을 두고 신중하게 말함
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-soft-teal" size={16} />
                    비언어적 표현을 중시
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-soft-teal" size={16} />
                    갈등 시 시간을 두고 해결하려 함
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-romantic-pink pl-6">
                <h4 className="text-lg font-semibold text-romantic-pink mb-3">외향형 (E)</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-romantic-pink" size={16} />
                    활발하고 즉흥적인 대화를 즐김
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-romantic-pink" size={16} />
                    말하면서 생각을 정리함
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-romantic-pink" size={16} />
                    표현력이 풍부하고 감정적
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-romantic-pink" size={16} />
                    갈등 시 즉시 해결하려 함
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thinking vs Feeling Communication */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-deep-blue mb-6 flex items-center">
              <Scale className="mr-3 text-love-purple" size={28} />
              사고형 vs 감정형
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-warm-yellow pl-6">
                <h4 className="text-lg font-semibold text-sunset-orange mb-3">사고형 (T)</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-sunset-orange" size={16} />
                    논리적이고 객관적인 대화
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-sunset-orange" size={16} />
                    사실과 데이터 중심의 소통
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-sunset-orange" size={16} />
                    직설적이고 솔직한 표현
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-sunset-orange" size={16} />
                    문제 해결 중심의 접근
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-mint-green pl-6">
                <h4 className="text-lg font-semibold text-mint-green mb-3">감정형 (F)</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-mint-green" size={16} />
                    감정적이고 공감적인 대화
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-mint-green" size={16} />
                    가치와 관계 중심의 소통
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-mint-green" size={16} />
                    배려심 있고 조화로운 표현
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="mr-2 mt-0.5 text-mint-green" size={16} />
                    감정적 지지 중심의 접근
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conflict Resolution Styles */}
      <div className="bg-gradient-to-r from-romantic-pink/10 to-soft-teal/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-deep-blue mb-8 text-center">갈등 해결 스타일</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-romantic-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">협력형</h4>
            <p className="text-sm text-gray-600 mb-2">ENFJ, ESFJ</p>
            <p className="text-xs text-gray-500">상대방의 감정을 고려하여 함께 해결책을 찾음</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-soft-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">전략형</h4>
            <p className="text-sm text-gray-600 mb-2">INTJ, ENTJ</p>
            <p className="text-xs text-gray-500">논리적 분석을 통해 최적의 해결책을 모색</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">회피형</h4>
            <p className="text-sm text-gray-600 mb-2">ISFP, INFP</p>
            <p className="text-xs text-gray-500">직접적인 갈등을 피하고 시간을 두고 해결</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-love-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">직면형</h4>
            <p className="text-sm text-gray-600 mb-2">ESTP, ENTP</p>
            <p className="text-xs text-gray-500">문제를 즉시 정면으로 다루어 해결</p>
          </div>
        </div>
      </div>

      {/* Communication Tips */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">💡 효과적인 소통 팁</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• 상대방의 선호하는 소통 스타일 파악하기</li>
              <li>• 내향형에게는 충분한 생각할 시간 주기</li>
              <li>• 외향형에게는 즉각적인 피드백 제공하기</li>
              <li>• 사고형에게는 논리적 근거 제시하기</li>
              <li>• 감정형에게는 감정적 공감 표현하기</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-pink-800 mb-4">❤️ 연애에서의 소통</h4>
            <ul className="space-y-2 text-sm text-pink-700">
              <li>• 서로 다른 표현 방식 인정하기</li>
              <li>• 정기적인 대화 시간 만들기</li>
              <li>• 갈등 시 감정보다 문제에 집중하기</li>
              <li>• 상대방의 입장에서 생각해보기</li>
              <li>• 작은 것도 감사 표현하기</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
