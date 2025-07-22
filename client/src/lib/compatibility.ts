import { MBTIType, CompatibilityResult } from '@/types/mbti';

export function calculateMBTICompatibility(type1: MBTIType, type2: MBTIType): number {
  // High compatibility pairs
  const perfectMatches: Record<string, number> = {
    'ENFP-INTJ': 97, 'INTJ-ENFP': 97,
    'INFJ-ENTP': 96, 'ENTP-INFJ': 96,
    'ISFJ-ESFP': 94, 'ESFP-ISFJ': 94,
    'ENTJ-INFP': 92, 'INFP-ENTJ': 92,
    'ESTP-ISFJ': 91, 'ISFJ-ESTP': 91,
    'ENFJ-INFP': 93, 'INFP-ENFJ': 93,
    'ISTJ-ESFP': 89, 'ESFP-ISTJ': 89,
    'INTP-ENFJ': 88, 'ENFJ-INTP': 88
  };

  const key = `${type1}-${type2}`;
  if (perfectMatches[key]) {
    return perfectMatches[key];
  }

  // Calculate based on cognitive functions and preferences
  let score = 70; // Base score

  // Same type bonus
  if (type1 === type2) {
    score += 15;
  }

  // Opposite preferences can be complementary
  const opposites = ['E-I', 'S-N', 'T-F', 'J-P'];
  let oppositeCount = 0;
  
  for (let i = 0; i < 4; i++) {
    if (type1[i] !== type2[i]) {
      oppositeCount++;
    }
  }

  // Optimal compatibility often has 1-2 differences
  if (oppositeCount === 1 || oppositeCount === 2) {
    score += 10;
  } else if (oppositeCount === 3) {
    score += 5;
  } else if (oppositeCount === 4) {
    score -= 5;
  }

  // Special bonuses for complementary functions
  if ((type1.includes('N') && type2.includes('S')) || 
      (type1.includes('S') && type2.includes('N'))) {
    score += 8; // Sensor-Intuitive balance
  }

  if ((type1.includes('T') && type2.includes('F')) || 
      (type1.includes('F') && type2.includes('T'))) {
    score += 8; // Thinker-Feeler balance
  }

  // Ensure score is within reasonable range
  return Math.min(99, Math.max(75, score));
}

export function getCompatibilityLevel(score: number): string {
  if (score >= 95) return "환상의 궁합!";
  if (score >= 90) return "최고의 파트너!";
  if (score >= 85) return "조화로운 사랑!";
  if (score >= 80) return "좋은 궁합!";
  return "노력이 필요한 관계";
}

export function generateCompatibilityAnalysis(type1: MBTIType, type2: MBTIType, score: number): CompatibilityResult['analysis'] {
  const isHighCompatibility = score >= 90;
  
  return {
    description: `${type1}와 ${type2}의 궁합은 ${score}%입니다. ${getCompatibilityLevel(score)}`,
    emotional: isHighCompatibility 
      ? "깊은 감정적 교감을 통한 성장" 
      : "서로 다른 감정 표현 방식을 이해하는 것이 중요",
    intellectual: isHighCompatibility 
      ? "지적 자극과 창의적 아이디어 교환" 
      : "서로 다른 관점을 통한 시야 확장",
    practical: isHighCompatibility 
      ? "일상적인 조화와 미래 계획의 일치" 
      : "실질적인 타협과 상호 이해 필요"
  };
}

export function generateCompatibilityStrengths(type1: MBTIType, type2: MBTIType): string[] {
  const commonStrengths = [
    "서로 다른 매력으로 인한 흥미",
    "상호 보완적인 성격 특성",
    "새로운 관점과 경험 제공"
  ];

  // Add specific strengths based on type combinations
  if ((type1.includes('E') && type2.includes('I')) || 
      (type1.includes('I') && type2.includes('E'))) {
    commonStrengths.push("내향성과 외향성의 균형");
  }

  if ((type1.includes('N') && type2.includes('S')) || 
      (type1.includes('S') && type2.includes('N'))) {
    commonStrengths.push("현실성과 이상성의 조화");
  }

  return commonStrengths;
}

export function generateCompatibilityChallenges(type1: MBTIType, type2: MBTIType): string[] {
  const commonChallenges = [
    "소통 방식의 차이",
    "가치관과 우선순위의 차이"
  ];

  // Add specific challenges based on type differences
  if ((type1.includes('T') && type2.includes('F')) || 
      (type1.includes('F') && type2.includes('T'))) {
    commonChallenges.push("논리적 vs 감정적 판단 기준");
  }

  if ((type1.includes('J') && type2.includes('P')) || 
      (type1.includes('P') && type2.includes('J'))) {
    commonChallenges.push("계획성과 자발성의 차이");
  }

  return commonChallenges;
}

export function generateCompatibilityAdvice(type1: MBTIType, type2: MBTIType): string[] {
  return [
    "서로의 차이점을 장점으로 인식하기",
    "충분한 소통 시간 갖기",
    "상대방의 관점을 이해하려 노력하기",
    "함께하는 시간과 개인 시간의 균형 맞추기",
    "서로의 성장을 지지하고 격려하기"
  ];
}
