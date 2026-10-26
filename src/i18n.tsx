import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { languages, type Language } from "./locales";
import { getDocumentTitle } from "./pageTranslations";

const translations = {
  en: {
    navHome: "Home",
    navProduction: "Production",
    navTraining: "Training",
    navTeam: "Team",
    navContact: "Contact",
    language: "Language",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    homeLink: "Youngtoon homepage",
    mainNavigation: "Main navigation",
    heroLabel: "Youngtoon introduction",
    siteDescription: "Youngtoon Studios creates webtoons, illustration, and creative training.",
    productionTagline: "CREATE · INSPIRE · TELL",
    productionHeading: "WEBTOON PRODUCTION",
    productionDescription:
      "Specializing in Korean webtoons and Japanese mangas. We create stunning art and content.",
    trainingTagline: "LEARN · IMPROVE · CREATE",
    trainingHeading: "WEBTOON TRAINING",
    trainingDescription:
      "World class training in Webcomics and Concept Art using Clip Studio Paint and Art 2.0.",
    explore: "Explore",
    carouselLabel: "Explore Youngtoon services",
    previousCard: "Show previous card",
    nextCard: "Show next card",
    carouselGroup: "Youngtoon portfolio carousel",
    carouselRole: "carousel",
    chooseCard: "Choose a portfolio card",
    artwork: "World Class Artwork",
    characterDesign: "Character Design & Cover Art",
    webcomicProduction: "Webcomic Production",
    creativeCharacterDesign: "Creative Character Design",
    storytelling: "Storytelling",
    showCard: "Show {title}",
    featuredProduction: "FEATURED PRODUCTION",
    luckyLaunched: "Launched on Naver Webtoon!",
    luckyDescription:
      "First Kenyan webtoon production now on Naver Webtoon. Follow and subscribe to support our latest series.",
    readWebtoon: "Read Webtoon!",
    enlargeFeatured: "Enlarge featured production image",
    characterIllustration: "Youngtoon character illustration",
    luckyCoverAlt: "Lucky 21 webtoon cover",
    storyVideo: "Youngtoon Studios story video",
    playStoryVideo: "Play Youngtoon Studios story video",
    ourStory: "OUR STORY",
    storyHeading: "First Blockbuster Quality Webtoon Production in Kenya",
    storyDescription: "Read now on Naver Webtoon Contest 2025.",
    closeMedia: "Close media viewer",
    footerHeading: "Ready to Create Something Amazing?",
    footerDescription: "Explore our production, join our training or",
    footerContact: "get in touch with us.",
    footerContactLinks: "Direct contact",
    footerPhoneLabel: "Call +254-113-777-050",
    footerEmailLabel: "Email inyoung@youngtoon.com",
    footerLogo: "Youngtoon",
    copyright: "© 2026 Youngtoon Studios. All Rights Reserved.",
    pageTitle: "Youngtoon Studios | Webtoon Production & Training",
  },
  ko: {
    navHome: "홈",
    navProduction: "제작",
    navTraining: "교육",
    navTeam: "팀",
    navContact: "문의",
    language: "언어",
    openMenu: "탐색 메뉴 열기",
    closeMenu: "탐색 메뉴 닫기",
    homeLink: "영툰 홈페이지",
    mainNavigation: "주요 메뉴",
    heroLabel: "영툰 소개",
    siteDescription: "영툰 스튜디오는 웹툰, 일러스트레이션 및 창작 교육을 제공합니다.",
    productionTagline: "창작 · 영감 · 이야기",
    productionHeading: "웹툰 제작",
    productionDescription:
      "한국 웹툰과 일본 만화를 전문으로 제작합니다. 아름다운 그림과 이야기를 만듭니다.",
    trainingTagline: "배우고 · 성장하고 · 창작하세요",
    trainingHeading: "웹툰 교육",
    trainingDescription:
      "클립 스튜디오 페인트와 Art 2.0을 활용한 웹툰 및 콘셉트 아트 전문 교육을 제공합니다.",
    explore: "둘러보기",
    carouselLabel: "영툰 서비스 둘러보기",
    previousCard: "이전 카드 보기",
    nextCard: "다음 카드 보기",
    carouselGroup: "영툰 포트폴리오 캐러셀",
    carouselRole: "캐러셀",
    chooseCard: "포트폴리오 카드 선택",
    artwork: "세계 수준의 아트워크",
    characterDesign: "캐릭터 디자인 및 표지 아트",
    webcomicProduction: "웹툰 제작",
    creativeCharacterDesign: "창의적인 캐릭터 디자인",
    storytelling: "스토리텔링",
    showCard: "{title} 보기",
    featuredProduction: "주요 작품",
    luckyLaunched: "네이버웹툰에서 연재 중!",
    luckyDescription:
      "케냐 최초의 웹툰 작품을 네이버웹툰에서 만나보세요. 팔로우와 구독으로 최신 작품을 응원해 주세요.",
    readWebtoon: "웹툰 읽기!",
    enlargeFeatured: "주요 작품 이미지 크게 보기",
    characterIllustration: "영툰 캐릭터 일러스트",
    luckyCoverAlt: "Lucky 21 웹툰 표지",
    storyVideo: "영툰 스튜디오 소개 영상",
    playStoryVideo: "영툰 스튜디오 소개 영상 재생",
    ourStory: "우리의 이야기",
    storyHeading: "케냐 최초의 블록버스터급 웹툰 제작",
    storyDescription: "2025 네이버웹툰 공모전에서 만나보세요.",
    closeMedia: "미디어 뷰어 닫기",
    footerHeading: "멋진 작품을 함께 만들어 볼까요?",
    footerDescription: "제작 작품을 둘러보고 교육에 참여하거나",
    footerContact: "저희에게 문의하세요.",
    footerContactLinks: "직접 연락",
    footerPhoneLabel: "+254-113-777-050 전화하기",
    footerEmailLabel: "inyoung@youngtoon.com 이메일 보내기",
    footerLogo: "영툰",
    copyright: "© 2026 영툰 스튜디오. All Rights Reserved.",
    pageTitle: "영툰 스튜디오 | 웹툰 제작 및 교육",
  },
  ja: {
    navHome: "ホーム",
    navProduction: "制作",
    navTraining: "トレーニング",
    navTeam: "チーム",
    navContact: "お問い合わせ",
    language: "言語",
    openMenu: "ナビゲーションメニューを開く",
    closeMenu: "ナビゲーションメニューを閉じる",
    homeLink: "Youngtoon ホームページ",
    mainNavigation: "メインナビゲーション",
    heroLabel: "Youngtoon のご紹介",
    siteDescription: "Youngtoon Studios はウェブトゥーン、イラスト、クリエイティブ講座を提供します。",
    productionTagline: "創造 · 発想 · 物語",
    productionHeading: "ウェブトゥーン制作",
    productionDescription:
      "韓国ウェブトゥーンと日本のマンガを専門に、魅力的なアートと物語を制作します。",
    trainingTagline: "学ぶ · 磨く · 創る",
    trainingHeading: "ウェブトゥーン講座",
    trainingDescription:
      "Clip Studio Paint と Art 2.0 を使った、ウェブコミックとコンセプトアートの本格的な講座です。",
    explore: "詳しく見る",
    carouselLabel: "Youngtoon のサービス",
    previousCard: "前のカードを表示",
    nextCard: "次のカードを表示",
    carouselGroup: "Youngtoon ポートフォリオカルーセル",
    carouselRole: "カルーセル",
    chooseCard: "ポートフォリオを選択",
    artwork: "世界水準のアートワーク",
    characterDesign: "キャラクターデザインと表紙アート",
    webcomicProduction: "ウェブコミック制作",
    creativeCharacterDesign: "クリエイティブなキャラクターデザイン",
    storytelling: "ストーリーテリング",
    showCard: "{title}を表示",
    featuredProduction: "注目作品",
    luckyLaunched: "Naver Webtoon で連載開始！",
    luckyDescription:
      "ケニア初のウェブトゥーン作品が Naver Webtoon で公開中です。フォローや購読で最新シリーズを応援してください。",
    readWebtoon: "作品を読む！",
    enlargeFeatured: "注目作品の画像を拡大",
    characterIllustration: "Youngtoon キャラクターイラスト",
    luckyCoverAlt: "Lucky 21 ウェブトゥーンの表紙",
    storyVideo: "Youngtoon Studios の紹介動画",
    playStoryVideo: "Youngtoon Studios の紹介動画を再生",
    ourStory: "私たちについて",
    storyHeading: "ケニア初の大作クオリティのウェブトゥーン制作",
    storyDescription: "Naver Webtoon Contest 2025 で公開中。",
    closeMedia: "メディアビューアを閉じる",
    footerHeading: "一緒に素敵な作品を作りませんか？",
    footerDescription: "制作実績をご覧いただくか、講座に参加するか、",
    footerContact: "お気軽にお問い合わせください。",
    footerContactLinks: "直接のお問い合わせ",
    footerPhoneLabel: "+254-113-777-050 に電話",
    footerEmailLabel: "inyoung@youngtoon.com にメール",
    footerLogo: "Youngtoon",
    copyright: "© 2026 Youngtoon Studios. All Rights Reserved.",
    pageTitle: "Youngtoon Studios | ウェブトゥーン制作・講座",
  },
  zh: {
    navHome: "首页",
    navProduction: "作品制作",
    navTraining: "培训",
    navTeam: "团队",
    navContact: "联系我们",
    language: "语言",
    openMenu: "打开导航菜单",
    closeMenu: "关闭导航菜单",
    homeLink: "Youngtoon 首页",
    mainNavigation: "主导航",
    heroLabel: "Youngtoon 简介",
    siteDescription: "Youngtoon Studios 创作网络漫画、插画，并提供创意培训。",
    productionTagline: "创作 · 灵感 · 故事",
    productionHeading: "网络漫画制作",
    productionDescription:
      "专注于韩国网络漫画和日本漫画，创作精彩的画作与故事。",
    trainingTagline: "学习 · 提升 · 创作",
    trainingHeading: "网络漫画培训",
    trainingDescription:
      "使用 Clip Studio Paint 和 Art 2.0，提供网络漫画与概念艺术专业培训。",
    explore: "了解更多",
    carouselLabel: "探索 Youngtoon 服务",
    previousCard: "查看上一张卡片",
    nextCard: "查看下一张卡片",
    carouselGroup: "Youngtoon 作品集轮播",
    carouselRole: "轮播",
    chooseCard: "选择作品集卡片",
    artwork: "世界级艺术作品",
    characterDesign: "角色设计与封面绘制",
    webcomicProduction: "网络漫画制作",
    creativeCharacterDesign: "创意角色设计",
    storytelling: "故事叙述",
    showCard: "查看{title}",
    featuredProduction: "精选作品",
    luckyLaunched: "已在 Naver Webtoon 连载！",
    luckyDescription:
      "肯尼亚首部网络漫画现已登陆 Naver Webtoon。欢迎关注并订阅，支持我们的最新系列。",
    readWebtoon: "阅读漫画！",
    enlargeFeatured: "放大查看精选作品图片",
    characterIllustration: "Youngtoon 角色插画",
    luckyCoverAlt: "Lucky 21 网络漫画封面",
    storyVideo: "Youngtoon Studios 品牌故事视频",
    playStoryVideo: "播放 Youngtoon Studios 品牌故事视频",
    ourStory: "关于我们",
    storyHeading: "肯尼亚首部大片级品质网络漫画制作",
    storyDescription: "现已参加 2025 年 Naver Webtoon 大赛。",
    closeMedia: "关闭媒体查看器",
    footerHeading: "准备好一起创作精彩作品了吗？",
    footerDescription: "了解我们的制作项目、参加培训，或",
    footerContact: "欢迎联系我们。",
    footerContactLinks: "直接联系",
    footerPhoneLabel: "致电 +254-113-777-050",
    footerEmailLabel: "发送邮件至 inyoung@youngtoon.com",
    footerLogo: "Youngtoon",
    copyright: "© 2026 Youngtoon Studios. 保留所有权利。",
    pageTitle: "Youngtoon Studios | 网络漫画制作与培训",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof typeof translations.en;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, values?: Record<string, string>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "youngtoon-language";

function getInitialLanguage(): Language {
  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return languages.find((language) => language === savedLanguage) ?? "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    const updateTitle = () => {
      document.title = getDocumentTitle(language, window.location.pathname);
    };
    updateTitle();
    window.addEventListener("popstate", updateTitle);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translations[language].siteDescription);
    return () => window.removeEventListener("popstate", updateTitle);
  }, [language]);

  const t = (key: TranslationKey, values?: Record<string, string>) => {
    let text = translations[language][key];
    if (values) {
      for (const [name, value] of Object.entries(values)) {
        text = text.replaceAll(`{${name}}`, value);
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hooks belong in this context module; components consume the shared provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
