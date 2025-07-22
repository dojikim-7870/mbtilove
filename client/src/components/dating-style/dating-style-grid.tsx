import { Card, CardContent } from "@/components/ui/card";
import { MBTI_TYPES, MBTI_GROUPS, GROUP_INFO } from "@/lib/mbti-data";
import { MBTIType } from "@/types/mbti";
import { Brain, Heart, Shield, Compass } from "lucide-react";

const GROUP_ICONS = {
  analysts: Brain,
  diplomats: Heart,
  sentinels: Shield,
  explorers: Compass
};

export function DatingStyleGrid() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-deep-blue mb-4">💕 MBTI별 연애 스타일</h2>
        <p className="text-xl text-gray-600">16가지 성격 유형별 독특한 연애 방식을 알아보세요</p>
      </div>

      {Object.entries(MBTI_GROUPS).map(([groupKey, types]) => {
        const groupInfo = GROUP_INFO[groupKey as keyof typeof GROUP_INFO];
        const IconComponent = GROUP_ICONS[groupKey as keyof typeof GROUP_ICONS];
        
        return (
          <div key={groupKey} className="mb-12">
            <h3 className="text-2xl font-bold text-deep-blue mb-6 flex items-center">
              <IconComponent className={`mr-3 text-${groupInfo.color}`} size={28} />
              {groupInfo.name} ({groupInfo.icon})
            </h3>
            <p className="text-gray-600 mb-6">{groupInfo.description}</p>
            
            <div className="grid md:grid-cols-4 gap-6">
              {types.map((type) => {
                const typeInfo = MBTI_TYPES[type];
                return (
                  <Card key={type} className={`card-hover bg-gradient-to-br from-${groupInfo.color}/10 to-${groupInfo.color}/5`}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <h4 className={`text-lg font-bold text-${groupInfo.color} mb-1`}>
                          {type}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">{typeInfo.name}</p>
                        <div className="text-3xl mb-3">{groupInfo.icon}</div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">연애 접근법</div>
                          <div className="text-gray-600">{typeInfo.datingStyle.approach}</div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700 mb-1">핵심 가치</div>
                          <div className="text-gray-600">
                            {typeInfo.datingStyle.values.slice(0, 2).join(", ")}
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700 mb-1">선호하는 것</div>
                          <div className="text-gray-600">
                            {typeInfo.datingStyle.preferences[0]}
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-700 mb-1">특징</div>
                          <div className="flex flex-wrap gap-1">
                            {typeInfo.traits.keywords.slice(0, 2).map((keyword, index) => (
                              <span 
                                key={index}
                                className={`px-2 py-1 bg-${groupInfo.color}/20 text-xs rounded-full`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {/* Dating Style Summary */}
      <div className="bg-gradient-to-r from-romantic-pink/10 to-soft-teal/10 rounded-3xl p-8 mt-12">
        <h3 className="text-2xl font-bold text-deep-blue mb-6 text-center">
          💝 연애 스타일 요약
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-love-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">분석가형 (NT)</h4>
            <p className="text-sm text-gray-600">
              지적 자극과 논리적 소통을 중시하며, 장기적이고 전략적인 관계를 추구합니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-romantic-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">외교관형 (NF)</h4>
            <p className="text-sm text-gray-600">
              깊은 감정적 연결과 진정성을 중시하며, 상호 성장을 돕는 관계를 선호합니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-soft-teal rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">관리자형 (SJ)</h4>
            <p className="text-sm text-gray-600">
              안정성과 헌신을 중시하며, 전통적이고 책임감 있는 관계를 추구합니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="text-white" size={24} />
            </div>
            <h4 className="font-semibold text-deep-blue mb-2">탐험가형 (SP)</h4>
            <p className="text-sm text-gray-600">
              자유로움과 즐거움을 중시하며, 즉흥적이고 모험적인 관계를 선호합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
