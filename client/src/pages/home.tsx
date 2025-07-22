import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompatibilityChecker } from "@/components/compatibility/compatibility-checker";
import { DatingStyleGrid } from "@/components/dating-style/dating-style-grid";
import { ConversationAnalysis } from "@/components/conversation/conversation-analysis";
import { IdealTypeFinder } from "@/components/ideal-type/ideal-type-finder";
import { CompatibilityRanking } from "@/components/ranking/compatibility-ranking";
import { BalanceGame } from "@/components/balance-game/balance-game";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Sparkles, Search, Play, MessageCircle, BookmarkX, Star, Trophy, Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MBTIType } from "@/types/mbti";
import { calculateMBTICompatibility, getCompatibilityLevel } from "@/lib/compatibility";

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

type Section = 'compatibility' | 'dating-style' | 'conversation' | 'ideal-type' | 'ranking' | 'balance-game';

export default function Home() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<Section>('compatibility');
  const [heroUserType, setHeroUserType] = useState<MBTIType | "">("");
  const [heroPartnerType, setHeroPartnerType] = useState<MBTIType | "">("");
  const [heroResult, setHeroResult] = useState<{ score: number; level: string } | null>(null);

  const handleHeroCompatibilityCheck = () => {
    if (!heroUserType || !heroPartnerType) {
      alert("양쪽 MBTI를 모두 선택해 주세요.");
      return;
    }

    const score = calculateMBTICompatibility(heroUserType as MBTIType, heroPartnerType as MBTIType);
    const level = getCompatibilityLevel(score);
    setHeroResult({ score, level });
  };

  const navItems = [
    { id: 'compatibility' as Section, label: '궁합', icon: Heart },
    { id: 'dating-style' as Section, label: '연애스타일', icon: BookmarkX },
    { id: 'conversation' as Section, label: '대화성향', icon: MessageCircle },
    { id: 'ideal-type' as Section, label: '이상형찾기', icon: Star },
    { id: 'ranking' as Section, label: '궁합랭킹', icon: Trophy },
    { id: 'balance-game' as Section, label: '밸런스게임', icon: Gamepad2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(7)].map((_, i) => (
          <Heart 
            key={i}
            className="heart text-romantic-pink/30 absolute animate-float"
            size={16 + Math.random() * 8}
            style={{
              left: `${10 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080"
            alt="Romantic couple silhouette against sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            완벽한 <span className="text-warm-yellow">MBTI</span> 궁합을
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            찾아보세요 💕
          </h3>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-slide-up" style={{animationDelay: '0.4s'}}>
            16가지 성격 유형으로 알아보는 나만의 이상형과 완벽한 궁합
          </p>
          
          {/* Quick MBTI Compatibility Check */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <h4 className="text-2xl font-semibold mb-6">💘 빠른 궁합 체크</h4>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
              <Select value={heroUserType} onValueChange={(value: string) => setHeroUserType(value as MBTIType | "")}>
                <SelectTrigger className="bg-white/90 text-deep-blue rounded-xl px-6 py-3 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-warm-yellow/50 min-w-[200px]">
                  <SelectValue placeholder="내 MBTI" />
                </SelectTrigger>
                <SelectContent>
                  {MBTI_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Heart className="text-warm-yellow text-2xl animate-pulse" size={32} />
              
              <Select value={heroPartnerType} onValueChange={(value: string) => setHeroPartnerType(value as MBTIType | "")}>
                <SelectTrigger className="bg-white/90 text-deep-blue rounded-xl px-6 py-3 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-warm-yellow/50 min-w-[200px]">
                  <SelectValue placeholder="상대 MBTI" />
                </SelectTrigger>
                <SelectContent>
                  {MBTI_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleHeroCompatibilityCheck}
                className="bg-gradient-to-r from-romantic-pink to-sunset-orange hover:from-sunset-orange hover:to-romantic-pink text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                궁합 확인
              </Button>
            </div>

            {/* Hero Result Display */}
            {heroResult && (
              <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 animate-fade-in">
                <div className="text-3xl font-bold mb-2">{heroResult.score}%</div>
                <div className="text-xl">{heroResult.level}</div>
                <div className="w-full max-w-md mx-auto mt-4">
                  <div className="compatibility-meter">
                    <div 
                      className="h-full transition-all duration-1000 bg-gradient-to-r from-romantic-pink via-warm-yellow to-soft-teal rounded-full"
                      style={{ width: `${heroResult.score}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.8s'}}>
            <Button className="bg-gradient-to-r from-warm-yellow to-sunset-orange hover:from-sunset-orange hover:to-warm-yellow text-deep-blue px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Search className="mr-2" size={20} />
              내 MBTI 찾기
            </Button>
            <Button 
              variant="outline"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveSection('compatibility')}
            >
              <Play className="mr-2" size={20} />
              서비스 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center py-4 gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => setActiveSection(item.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'nav-item active text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="mr-2" size={16} />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className={`section-content ${activeSection === 'compatibility' ? 'active' : ''}`}>
          <CompatibilityChecker />
        </div>

        <div className={`section-content ${activeSection === 'dating-style' ? 'active' : ''}`}>
          <DatingStyleGrid />
        </div>

        <div className={`section-content ${activeSection === 'conversation' ? 'active' : ''}`}>
          <ConversationAnalysis />
        </div>

        <div className={`section-content ${activeSection === 'ideal-type' ? 'active' : ''}`}>
          <IdealTypeFinder />
        </div>

        <div className={`section-content ${activeSection === 'ranking' ? 'active' : ''}`}>
          <CompatibilityRanking />
        </div>

        <div className={`section-content ${activeSection === 'balance-game' ? 'active' : ''}`}>
          <BalanceGame />
        </div>
      </main>

      <Footer />
    </div>
  );
}
