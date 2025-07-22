import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    common: {
      "title": "MBTI Love Match",
      "subtitle": "완벽한 궁합 찾기",
      "compatibility": "궁합",
      "datingStyle": "연애스타일",
      "conversation": "대화성향",
      "idealType": "이상형찾기",
      "ranking": "궁합랭킹",
      "balanceGame": "밸런스게임",
      "checkCompatibility": "궁합 확인",
      "myMbti": "내 MBTI",
      "partnerMbti": "상대 MBTI",
      "selectType": "성격 유형을 선택하세요",
      "checkResult": "궁합 분석하기",
      "perfectMatch": "환상의 궁합!",
      "goodMatch": "좋은 궁합!",
      "analysis": "분석",
      "strengths": "장점",
      "challenges": "주의사항",
      "advice": "조언"
    }
  },
  en: {
    common: {
      "title": "MBTI Love Match",
      "subtitle": "Find Your Perfect Match",
      "compatibility": "Compatibility",
      "datingStyle": "Dating Style",
      "conversation": "Communication",
      "idealType": "Ideal Type",
      "ranking": "Rankings",
      "balanceGame": "Balance Game",
      "checkCompatibility": "Check Compatibility",
      "myMbti": "My MBTI",
      "partnerMbti": "Partner MBTI",
      "selectType": "Select personality type",
      "checkResult": "Analyze Compatibility",
      "perfectMatch": "Perfect Match!",
      "goodMatch": "Good Match!",
      "analysis": "Analysis",
      "strengths": "Strengths",
      "challenges": "Challenges",
      "advice": "Advice"
    }
  },
  jp: {
    common: {
      "title": "MBTI Love Match",
      "subtitle": "完璧な相性を見つけよう",
      "compatibility": "相性",
      "datingStyle": "恋愛スタイル",
      "conversation": "会話傾向",
      "idealType": "理想のタイプ",
      "ranking": "相性ランキング",
      "balanceGame": "バランスゲーム",
      "checkCompatibility": "相性確認",
      "myMbti": "私のMBTI",
      "partnerMbti": "相手のMBTI",
      "selectType": "性格タイプを選択",
      "checkResult": "相性分析",
      "perfectMatch": "最高の相性！",
      "goodMatch": "良い相性！",
      "analysis": "分析",
      "strengths": "長所",
      "challenges": "注意点",
      "advice": "アドバイス"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common'],
    defaultNS: 'common'
  });

export default i18n;
