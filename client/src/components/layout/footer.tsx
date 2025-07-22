import { Heart, Instagram, Twitter, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-deep-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-romantic-pink to-soft-teal rounded-full flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <h3 className="text-xl font-bold">{t("title")}</h3>
            </div>
            <p className="text-gray-300 mb-4">
              16가지 성격 유형으로 알아보는 완벽한 궁합과 연애 스타일. 
              과학적 분석을 바탕으로 한 신뢰할 수 있는 MBTI 연애 플랫폼입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-romantic-pink transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-soft-teal transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-warm-yellow transition">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-romantic-pink transition">MBTI 테스트</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">궁합 분석</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">연애 가이드</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">커뮤니티</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-romantic-pink transition">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">문의하기</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-romantic-pink transition">이용약관</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8 text-center text-gray-300">
          <p>&copy; 2025 MBTI Love Match. All rights reserved.</p>
          <p className="text-sm mt-2">
            이 사이트는 MBTI 기반의 비공식 테스트이며, 실제 성격과 완전히 일치하지 않을 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
