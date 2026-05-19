/**
 * SPRAY サイトコピー（日本語）
 * 正本: docs/japanese-copy-sheet.md
 */
export const copy = {
  site: {
    name: "SPRAY",
    tagline: "北海道旭川のスケート＆スノーショップ",
    url: "https://www.spray166.com",
  },

  nav: {
    shop: { label: "ONLINE SHOP", sub: "Mega-menu" },
    park: { label: "SKATE PARK", sub: "Booking & Guide" },
    school: { label: "SCHOOL", sub: "Lessons" },
    maintenance: { label: "MAINTENANCE", sub: "Tune-up" },
    brands: { label: "BRANDS", sub: "List" },
    about: { label: "ABOUT US", sub: "Location, Calendar" },
  },

  cta: {
    park: "VISIT PARK / BOOK A SESSION",
    shop: "オンラインショップ（楽天・Yahoo・公式ストア）",
    /** モバイル固定バー用（短い・モール名は /shop へ） */
    shopMobile: "ONLINE SHOP",
    bookPark: "パーク・料金を確認",
    maintenance: "メンテを依頼する",
    firstTimers: "はじめての方へ",
    viewCalendar: "カレンダーで詳細を見る",
    viewAllNews: "すべて見る",
  },

  footer: {
    address: "〒078-8242　北海道旭川市豊岡12条1丁目1-8",
    tel: "0166-33-2779",
    fax: "0166-34-7445",
    telLink: "tel:0166332779",
    hours: "営業時間 12:00～19:00（水曜定休）",
    copyright: (year: number) => `© ${year} SPRAY All Rights Reserved.`,
    privacy: "プライバシーポリシー",
  },

  home: {
    hero: {
      title: "PLAY ON SNOW,\nRIDE ON CONCRETE.",
      subtitle: "ENHANCED SPRAY INDOOR COURSE",
      indoorLabel: "ENHANCED SPRAY INDOOR COURSE",
    },
    ec: { heading: "NEW ARRIVALS" },
    categories: { snow: "スノーボード", skate: "スケートボード" },
    arrivals: {
      heading: "新着アイテム",
      note: "取扱店舗により商品・価格が異なります。",
    },
    park: {
      heading: "本日のパーク",
      status: {
        open: "通常営業",
        busy: "混雑",
        closed: "一般利用不可",
      },
    },
    news: { heading: "NEWS" },
    brandsWeCarry: "BRANDS WE CARRY",
    staffAccess: "STAFF & ACCESS",
    boardMaintenance: "ボードメンテナンス",
    tuneUpServices: "チューンアップ・修理サービス",
    requestMaintenance: "メンテナンスを依頼する",
    maintenanceLead:
      "経験・知識豊富なスタッフがメンテいたします。シーズン中は大変込み合いますのでお早めに。",
    viewMaintenancePage: "メンテナンスページを見る",
    maintenanceOverlayTitle: "メンテナンス",
    maintenanceOverlaySubtitle: "PRECISION CARE",
    skateParkAndSchool: "SKATE PARK & SCHOOL",
    parkOverlayTitle: "スケートパーク",
    parkOverlaySubtitle: "ENHANCED SPRAY INDOOR COURSE",
    viewSkateparkPage: "スケートパークページを見る",
    parkQuick: {
      heading: "スケートパーク",
      hoursLabel: "営業時間",
      priceLead: "利用料金は料金表ページの掲載内容をご確認ください。",
      calendar: "カレンダー・空き状況",
      prices: "利用料金表を見る",
      firstTimers: "はじめての方へ",
    },
    realTimeCalendar: "REAL-TIME CALENDAR",
    priceTable: "PRICE TABLE",
    firstTimersGuide: "FIRST TIMERS GUIDE",
    contactInfo: "CONTACT INFO",
    openingHours: "OPENING HOURS",
    social: "SOCIAL",
    shortcuts: {
      maintenance: "ボードメンテナンス",
      firstTimers: "はじめての方へ",
      brands: "ブランド一覧",
    },
    meta: {
      title: "SPRAY（スプレイ）| 旭川のスケート・スノーショップ＆屋内パーク",
      description:
        "スケートボード・スノーボードのプロショップ。屋内スケートパーク、スクール、チューンナップ。楽天・Yahoo・公式ストアから全国発送。",
    },
  },

  shop: {
    title: "オンラインで買う",
    lead: "SPRAY の商品は、お好みのショップからご購入いただけます。",
    backHome: "← トップへ",
    malls: {
      rakuten: {
        name: "楽天市場 SPRAY 店",
        feature: "楽天ポイントが貯まる・お買い物マラソン対象商品あり",
      },
      yahoo: {
        name: "Yahoo!ショッピング SPRAY 店",
        feature: "PayPayポイント対象商品あり",
      },
      official: {
        name: "公式ストア",
        feature: "全ブランド・新着を一覧。会員登録でお得情報を受け取れます。",
      },
    },
  },

  skatepark: {
    title: "スケートパーク",
    lead: "1998年から旭川で愛される屋内パーク。全面約580㎡、ストリートコースを中心に初心者から上級者まで楽しめます。",
    firstTimers: {
      title: "はじめての方へ",
      lead: "初めての方も大歓迎。当日の流れと持ち物をご確認のうえ、お気軽にお越しください。",
      steps: [
        "受付・料金のお支払い",
        "ルールの確認（スタッフがご案内）",
        "パークへ。見学のみも可能です。",
      ],
    },
    calendar: {
      title: "営業・イベントカレンダー",
      lead: "貸切・スクール開催など、一般滑走ができない日があります。来店前にご確認ください。",
    },
    prices: {
      title: "料金・営業時間",
      storeHours: "店舗営業時間",
      closedPrefix: "定休",
      priceAlt: "パーク利用時間料金表（spray166.com 公式）",
      priceCaption: "出典: spray166.com — パーク利用時間料金表",
    },
    rules: { title: "パークルール・マナー" },
    facility: { title: "施設案内" },
    learnAtSchool: "スクールで学ぶ",
  },

  school: {
    title: "スクール",
    lead: "プロスタッフによるレッスン。スケートボードはもちろん、スノーボードの技術向上もサポートします。",
    links: {
      lessons: "レッスン内容",
      camp: "キッズ・キャンプ",
      instructors: "インストラクター",
    },
    booking: {
      title: "レッスン予約・お問い合わせ",
      lead: "ご希望の日時・内容をお知らせください。担当より折り返しご連絡します。",
    },
  },

  maintenance: {
    heroTitle: "PRECISION CARE:",
    heroSubtitle: "Expert Board Maintenance & Repair.",
    title: "ボードメンテナンス",
    lead:
      "経験・知識豊富なスタッフがメンテいたしますので、安心してお申し付け下さい。シーズン中は大変込み合いますのでお早めにメンテナンスを！",
    tuneUpTitle: "チューンナップ",
    laborTitle: "作業工賃",
    workshopTitle: "WORKSHOP",
    priceMenuTitle: "チューンナップ・作業工賃メニュー表",
    sourceNote:
      "料金・内容は http://www.spray166.com/board-maintenance/ および店頭掲示のチューンナップ・作業工賃メニュー表に準拠。",
    priceSheetAlt: "チューンナップ・作業工賃メニュー表",
    table: {
      tuneUp: { process: "行程", detail: "内容", price: "価格" },
      labor: { process: "作業名", detail: "作業内容", price: "金額" },
    },
    tabs: { snow: "スノーボード", skate: "スケートボード" },
    flow: {
      title: "SERVICE FLOW",
      steps: [
        { title: "Diagnosis", body: "Inspect board condition and recommend service." },
        { title: "Cleaning", body: "Remove dirt and old wax from base and edges." },
        { title: "Edging", body: "Tune side and base edges for grip and release." },
        { title: "Waxing", body: "Hot wax for glide and durability." },
        { title: "Finishing", body: "Final check before hand-off." },
      ],
    },
    request: {
      title: "メンテナンス依頼",
      success: "お問い合わせありがとうございます。担当よりご連絡します。",
    },
  },

  brands: {
    title: "取扱ブランド",
    lead: "100以上のブランドを取り扱い。お好みのブランドから各オンラインストアでお探しください。",
    filters: { all: "すべて", snow: "スノーボード", skate: "スケートボード" },
    detailNote: "ブランド詳細（CMS 接続後にロゴ・説明を表示）",
    shopAt: "で探す",
    backToList: "← ブランド一覧",
  },

  about: {
    access: {
      title: "アクセス・お問い合わせ",
      formNote: "メンテナンス依頼は専用フォームをご利用ください。",
      storeInfo: "店舗情報",
      byCar: "お車でお越しの方",
      byBus: "バスでお越しの方",
      fields: {
        address: "住所",
        phone: "電話",
        fax: "FAX",
        hours: "営業時間",
        closed: "定休日",
      },
      busTable: {
        stationDepart: "旭川駅発",
        stopArrive: "10の22着",
        stopDepart: "10の22発",
        stationReturn: "旭川駅着",
      },
    },
    staff: { title: "スタッフ", lead: "スケート・スノーの魅力を伝えるチームです。" },
    story: {
      title: "SPRAYについて",
      body:
        "SPRAY（スプレイ）＝広がる、広まる。1996年、旭川市東光に前身店をオープン。1998年7月、現店舗（豊岡）と屋内スケートパークを併設。北海道旭川市のエクストリーム専門店として、ショップ・パーク・スクール・メンテナンスを通じてライダーをサポートしています。",
    },
    calendar: { title: "店舗イベント・営業カレンダー" },
  },

  news: {
    title: "お知らせ",
    empty: "お知らせはまだありません。",
    back: "一覧に戻る",
  },

  legal: {
    privacy: {
      title: "プライバシーポリシー",
      lead: "法務確認後に本文を掲載",
    },
  },

  errors: {
    notFound: {
      title: "ページが見つかりません",
      body: "お探しのページは移動または削除された可能性があります。",
      cta: "トップへ戻る",
    },
  },

  ui: {
    lang: { label: "言語", ja: "日本語", en: "English" },
    table: { item: "項目", content: "内容", price: "価格（税込）" },
    stub: { planned: "実装予定" },
  },
};

export type Copy = typeof copy;
