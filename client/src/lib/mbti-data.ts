import { MBTIType, MBTITypeInfo } from '@/types/mbti';

export const MBTI_TYPES: Record<MBTIType, MBTITypeInfo> = {
  ENFP: {
    code: "ENFP",
    name: "활동가",
    description: "재기발랄한 활동가",
    traits: {
      strengths: ["창의적", "열정적", "사교적", "낙천적"],
      weaknesses: ["산만함", "비현실적", "감정기복"],
      keywords: ["자유로운 영혼", "영감", "가능성"]
    },
    datingStyle: {
      approach: "spontaneous",
      values: ["authenticity", "growth", "adventure"],
      preferences: ["deep conversations", "new experiences", "emotional connection"]
    },
    communicationStyle: {
      style: "enthusiastic",
      conflictResolution: "collaborative",
      expressiveness: "high"
    }
  },
  ENFJ: {
    code: "ENFJ",
    name: "선도자",
    description: "정열적인 선도자",
    traits: {
      strengths: ["카리스마", "공감능력", "책임감", "설득력"],
      weaknesses: ["과도한 이상주의", "비판에 민감", "완벽주의"],
      keywords: ["지도력", "영감", "성장"]
    },
    datingStyle: {
      approach: "nurturing",
      values: ["harmony", "growth", "commitment"],
      preferences: ["emotional support", "shared values", "future planning"]
    },
    communicationStyle: {
      style: "supportive",
      conflictResolution: "harmonizing",
      expressiveness: "high"
    }
  },
  ENTP: {
    code: "ENTP",
    name: "토론가",
    description: "뜨거운 논쟁을 즐기는 변론가",
    traits: {
      strengths: ["창의적", "논리적", "적응력", "독창성"],
      weaknesses: ["일관성 부족", "세부사항 소홀", "논쟁적"],
      keywords: ["혁신", "토론", "가능성"]
    },
    datingStyle: {
      approach: "intellectual",
      values: ["innovation", "freedom", "mental stimulation"],
      preferences: ["debates", "variety", "intellectual challenge"]
    },
    communicationStyle: {
      style: "debating",
      conflictResolution: "logical",
      expressiveness: "high"
    }
  },
  ENTJ: {
    code: "ENTJ",
    name: "통솔자",
    description: "대담한 통솔자",
    traits: {
      strengths: ["리더십", "결단력", "효율성", "전략적 사고"],
      weaknesses: ["독단적", "비판적", "감정 무시"],
      keywords: ["목표", "성취", "지도력"]
    },
    datingStyle: {
      approach: "goal-oriented",
      values: ["success", "efficiency", "long-term planning"],
      preferences: ["shared ambitions", "intellectual partnership", "structured relationship"]
    },
    communicationStyle: {
      style: "direct",
      conflictResolution: "strategic",
      expressiveness: "medium"
    }
  },
  ESFP: {
    code: "ESFP",
    name: "연예인",
    description: "자유로운 영혼의 연예인",
    traits: {
      strengths: ["사교적", "낙천적", "유연성", "실용적"],
      weaknesses: ["계획성 부족", "비판에 민감", "쉽게 지루함"],
      keywords: ["즐거움", "자발성", "현재"]
    },
    datingStyle: {
      approach: "fun-loving",
      values: ["enjoyment", "spontaneity", "harmony"],
      preferences: ["fun activities", "physical affection", "living in the moment"]
    },
    communicationStyle: {
      style: "enthusiastic",
      conflictResolution: "avoiding",
      expressiveness: "high"
    }
  },
  ESFJ: {
    code: "ESFJ",
    name: "집정관",
    description: "사교적인 외교관",
    traits: {
      strengths: ["협력적", "책임감", "배려심", "조화추구"],
      weaknesses: ["변화 거부", "비판에 민감", "갈등 회피"],
      keywords: ["조화", "전통", "돌봄"]
    },
    datingStyle: {
      approach: "caring",
      values: ["stability", "tradition", "family"],
      preferences: ["emotional support", "routine", "commitment"]
    },
    communicationStyle: {
      style: "supportive",
      conflictResolution: "harmonizing",
      expressiveness: "high"
    }
  },
  ESTP: {
    code: "ESTP",
    name: "사업가",
    description: "모험을 즐기는 사업가",
    traits: {
      strengths: ["실용적", "적응력", "에너지", "문제해결"],
      weaknesses: ["계획성 부족", "충동적", "세부사항 소홀"],
      keywords: ["행동", "현실", "모험"]
    },
    datingStyle: {
      approach: "adventurous",
      values: ["excitement", "freedom", "authenticity"],
      preferences: ["physical activities", "spontaneous dates", "living in the moment"]
    },
    communicationStyle: {
      style: "direct",
      conflictResolution: "confronting",
      expressiveness: "medium"
    }
  },
  ESTJ: {
    code: "ESTJ",
    name: "경영자",
    description: "엄격한 관리자",
    traits: {
      strengths: ["조직력", "책임감", "효율성", "실용성"],
      weaknesses: ["경직성", "비판적", "감정 무시"],
      keywords: ["질서", "전통", "관리"]
    },
    datingStyle: {
      approach: "traditional",
      values: ["stability", "commitment", "responsibility"],
      preferences: ["structured relationship", "clear expectations", "long-term planning"]
    },
    communicationStyle: {
      style: "direct",
      conflictResolution: "systematic",
      expressiveness: "low"
    }
  },
  INFP: {
    code: "INFP",
    name: "중재자",
    description: "열정적인 중재자",
    traits: {
      strengths: ["이상주의", "창의적", "공감능력", "진정성"],
      weaknesses: ["비현실적", "완벽주의", "갈등 회피"],
      keywords: ["가치", "진정성", "성장"]
    },
    datingStyle: {
      approach: "idealistic",
      values: ["authenticity", "personal growth", "harmony"],
      preferences: ["deep connection", "shared values", "emotional intimacy"]
    },
    communicationStyle: {
      style: "gentle",
      conflictResolution: "avoiding",
      expressiveness: "medium"
    }
  },
  INFJ: {
    code: "INFJ",
    name: "옹호자",
    description: "선의의 옹호자",
    traits: {
      strengths: ["통찰력", "결단력", "이상주의", "창의성"],
      weaknesses: ["완벽주의", "비현실적", "극도로 사적"],
      keywords: ["통찰", "목적", "성장"]
    },
    datingStyle: {
      approach: "deep",
      values: ["meaningful connection", "personal growth", "understanding"],
      preferences: ["emotional depth", "intellectual connection", "long-term commitment"]
    },
    communicationStyle: {
      style: "insightful",
      conflictResolution: "understanding",
      expressiveness: "medium"
    }
  },
  INTP: {
    code: "INTP",
    name: "논리술사",
    description: "논리적인 사색가",
    traits: {
      strengths: ["논리적", "독창적", "객관적", "유연성"],
      weaknesses: ["비사교적", "민감함", "조심스러움"],
      keywords: ["논리", "이론", "독립성"]
    },
    datingStyle: {
      approach: "analytical",
      values: ["intellectual compatibility", "independence", "understanding"],
      preferences: ["mental stimulation", "personal space", "logical discussion"]
    },
    communicationStyle: {
      style: "logical",
      conflictResolution: "analyzing",
      expressiveness: "low"
    }
  },
  INTJ: {
    code: "INTJ",
    name: "건축가",
    description: "용의주도한 전략가",
    traits: {
      strengths: ["전략적", "독립적", "결단력", "완벽주의"],
      weaknesses: ["고집", "비판적", "감정표현 부족"],
      keywords: ["계획", "효율성", "지식"]
    },
    datingStyle: {
      approach: "strategic",
      values: ["intelligence", "independence", "long-term commitment"],
      preferences: ["meaningful conversations", "shared goals", "personal space"]
    },
    communicationStyle: {
      style: "direct",
      conflictResolution: "logical",
      expressiveness: "low"
    }
  },
  ISFP: {
    code: "ISFP",
    name: "모험가",
    description: "호기심 많은 예술가",
    traits: {
      strengths: ["예술적", "유연성", "배려심", "실용성"],
      weaknesses: ["경쟁 회피", "비판에 민감", "계획성 부족"],
      keywords: ["예술", "자유", "조화"]
    },
    datingStyle: {
      approach: "gentle",
      values: ["harmony", "authenticity", "beauty"],
      preferences: ["emotional support", "creative activities", "peaceful relationship"]
    },
    communicationStyle: {
      style: "gentle",
      conflictResolution: "avoiding",
      expressiveness: "medium"
    }
  },
  ISFJ: {
    code: "ISFJ",
    name: "수호자",
    description: "용감한 수호자",
    traits: {
      strengths: ["지지적", "신뢰할만한", "인내심", "실용적"],
      weaknesses: ["변화 거부", "과도한 이타심", "갈등 회피"],
      keywords: ["보호", "전통", "봉사"]
    },
    datingStyle: {
      approach: "supportive",
      values: ["stability", "loyalty", "service"],
      preferences: ["emotional support", "traditional relationship", "commitment"]
    },
    communicationStyle: {
      style: "supportive",
      conflictResolution: "accommodating",
      expressiveness: "medium"
    }
  },
  ISTP: {
    code: "ISTP",
    name: "만능재주꾼",
    description: "만능 재주꾼",
    traits: {
      strengths: ["실용적", "유연성", "효율적", "논리적"],
      weaknesses: ["감정표현 부족", "약속 회피", "비사교적"],
      keywords: ["기술", "독립성", "실용성"]
    },
    datingStyle: {
      approach: "practical",
      values: ["independence", "action", "efficiency"],
      preferences: ["shared activities", "personal space", "practical partnership"]
    },
    communicationStyle: {
      style: "practical",
      conflictResolution: "problem-solving",
      expressiveness: "low"
    }
  },
  ISTJ: {
    code: "ISTJ",
    name: "현실주의자",
    description: "현실적인 관리자",
    traits: {
      strengths: ["책임감", "신뢰성", "실용성", "체계적"],
      weaknesses: ["경직성", "변화 거부", "감정표현 부족"],
      keywords: ["책임", "전통", "안정성"]
    },
    datingStyle: {
      approach: "traditional",
      values: ["reliability", "commitment", "stability"],
      preferences: ["consistent relationship", "clear expectations", "long-term planning"]
    },
    communicationStyle: {
      style: "factual",
      conflictResolution: "systematic",
      expressiveness: "low"
    }
  }
};

export const MBTI_GROUPS = {
  analysts: ["INTJ", "INTP", "ENTJ", "ENTP"] as MBTIType[],
  diplomats: ["INFJ", "INFP", "ENFJ", "ENFP"] as MBTIType[],
  sentinels: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] as MBTIType[],
  explorers: ["ISTP", "ISFP", "ESTP", "ESFP"] as MBTIType[]
};

export const GROUP_INFO = {
  analysts: {
    name: "분석가형",
    description: "논리적이고 전략적인 사고를 하는 그룹",
    icon: "🧠",
    color: "love-purple"
  },
  diplomats: {
    name: "외교관형", 
    description: "감정적이고 이상주의적인 그룹",
    icon: "💖",
    color: "romantic-pink"
  },
  sentinels: {
    name: "관리자형",
    description: "안정적이고 체계적인 그룹", 
    icon: "🛡️",
    color: "soft-teal"
  },
  explorers: {
    name: "탐험가형",
    description: "자유롭고 실용적인 그룹",
    icon: "🧭", 
    color: "warm-yellow"
  }
};
