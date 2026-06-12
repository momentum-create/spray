/**
 * spray166.com から取得した確定情報（2026-05-18 クロール）
 * 出典: /contact/, /board-maintenance/, /about/, /aircraft/, フッター
 */
export const siteFacts = {
  company: {
    legalName: "有限会社 SPRAY",
    representative: "代表取締役　荒井健二",
    tagline: "SPRAY（スプレイ）＝広がる、広まる。",
    description: "北海道旭川市のエクストリーム専門店です。",
  },

  address: {
    postalCode: "078-8242",
    line: "北海道旭川市豊岡12条1丁目1-8",
    full: "〒078-8242　北海道旭川市豊岡12条1丁目1-8",
  },

  contact: {
    tel: "0166-33-2779",
    telDisplay: "0166-33-2779",
    fax: "0166-34-7445",
    telLink: "tel:0166332779",
  },

  hours: {
    open: "12:00",
    close: "19:00",
    label: "12:00～19:00",
    closedDay: "水曜日",
    note: "店舗・パークともにサイト表記は上記（パーク料金は別画像表を参照）",
  },

  parkStatus: {
    state: "open" as "open" | "limited" | "closed",
    messageJa: "",
    messageEn: "",
    updatedAt: "2026-06-02",
  },

  access: {
    byCarFromStation: "旭川駅より約15分",
    byCarFromAirport: "旭川空港より約30分",
    byCarDetail:
      "旭川駅より国道39号線を通り動物園通りを右折。750m先左手にあります。",
    byBus:
      "旭川電気軌道 旭山動物園行き47番に乗車し、バス停10条22丁目（ベストプライス様前）にて下車。動物園方面に直線、徒歩4分（270m）",
    busLine: "47番 旭山動物園(10条)線",
    busTimetable: [
      { stationDepart: "12:10", stopArrive: "12:21", stopDepart: "12:27", stationReturn: "12:50" },
      { stationDepart: "13:10", stopArrive: "13:21", stopDepart: "13:27", stationReturn: "13:50" },
      { stationDepart: "14:10", stopArrive: "14:21", stopDepart: "14:27", stationReturn: "14:50" },
      { stationDepart: "15:10", stopArrive: "15:21", stopDepart: "15:27", stationReturn: "15:50" },
      { stationDepart: "16:10", stopArrive: "16:21", stopDepart: "16:27", stationReturn: "16:50" },
      { stationDepart: "17:10", stopArrive: "17:21", stopDepart: "17:27", stationReturn: "17:50" },
      { stationDepart: "18:10", stopArrive: "18:21", stopDepart: "18:27", stationReturn: "18:50" },
      { stationDepart: "19:10", stopArrive: "19:21", stopDepart: "19:27", stationReturn: "19:50" },
      { stationDepart: "20:10", stopArrive: "20:21", stopDepart: "20:27", stationReturn: "20:50" },
    ],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11524.525607163925!2d142.38279460217197!3d43.770131109648226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb1a612acbcfadd13!2z44K544OX44Os44Kk!5e0!3m2!1sja!2sus!4v1557819391257!5m2!1sja!2sus",
  },

  history: [
    { year: "1996年", text: "旭川市東光に前身店をオープン" },
    {
      year: "1998年7月",
      text: "現店舗（豊岡）オープン。念願の店舗＋屋内スケートパークを併設",
    },
  ],

  business: [
    "スポーツ用品の販売、修理",
    "スポーツ用品関連商品の販売",
    "イベント等の企画、制作、運営業務",
    "古物商品（物品）の販売業",
    "スケートパーク場の運営",
    "スケートボード/スノーボードのメンテナンス修理",
    "飲食店運営",
  ],

  skatepark: {
    headline: "国内最大級！全面５８０㎡の広々としたパーク",
    subhead: "＊SPRAY SKATE PARK＊",
    intro:
      "ストリートコースが拡張されより楽しくなりましたので、皆さん気軽におこし下さいませ！",
    /** トップヒーロー（出典: spray166.com/aircraft/ 2026-05 撮影） */
    heroImage: "/images/skatepark/hero.jpg",
    /** 各フィーチャー横のアイコン（旧 home_jet_list2） */
    featureIcon: "/images/skatepark/feature-icon.png",
    /** 施設写真: public/images/skatepark/（旧公式 WP から取り込み・店舗撮影差し替え可） */
    sections: [
      {
        name: "ストリートコース",
        level: null,
        description: "ストリートコースが拡張され、初心者から上級者まで楽しめます。",
      },
      {
        name: "Fun Box",
        level: "★★☆☆☆",
        description: "エアー（ジャンプ）の高さや空中姿勢等を競い合う為のセクション。",
      },
    ],
    scheduleImageUrl:
      "https://www.spray166.com/wp-content/uploads/2019/09/radysday.jpg",
    priceNote:
      "料金は税込表示です。変更になる場合があります。詳細は店頭またはお電話でご確認ください。",
    pricing: {
      usageFees: {
        rows: [
          { id: "1h", item: "1時間", price: "¥500" },
          { id: "2h", item: "2時間", price: "¥800" },
          { id: "3h", item: "3時間", price: "¥1,000" },
          { id: "day", item: "1日", price: "¥1,300" },
        ],
      },
      purposeNote:
        "パークの利用料金は基材の修理費、パーク維持経費等に役立つお金です。",
      registerNote:
        "＊レジカウンターにて、氏名と入場時間を利用表にご記入下さい。ご協力お願いします。",
      legacyChart: {
        src: "/images/skatepark/park-price-chart.jpg",
        altJa: "パーク利用時間料金表",
        altEn: "Park usage fee chart by session length",
      },
    },
    facilityAreas: [
      {
        id: "section1",
        headline: "クオーターバンクに挟まれたロングストレートセクション",
        images: ["/images/skatepark/section-1.jpg"],
        features: [
          { name: "TABLE TOP", description: "カーブBOXとキンクレールの2WAY仕様" },
          { name: "LONG BOX", description: "両側からエントリー可能なコンクリートBOX" },
        ],
      },
      {
        id: "section2",
        headline: "レギュラーサイズのハーフボウルセクション",
        images: [
          "/images/skatepark/section-2a.jpg",
          "/images/skatepark/section-2b.jpg",
        ],
        features: [
          {
            name: "HALF BOWL",
            description: "ランページとしての練習もボウルとしての練習もOK",
          },
        ],
      },
      {
        id: "section3",
        headline: "幅広でゆったりとしたフラットトリックセクション",
        images: ["/images/skatepark/section-3.jpg"],
        features: [
          { name: "CONCRETE SURFACE", description: "跳ねやすく滑りやすい幅広コンクリート" },
          { name: "MINI BOX", description: "低いボックスで初期練習もOK" },
        ],
      },
      {
        id: "section4",
        headline: "初めての方から上級者まで楽しめるランプセクション",
        images: ["/images/skatepark/section-4-ramp.jpg"],
        features: [
          {
            name: "MINI RAMPAGE",
            description: "初めての方はロープを掴みながらドロップインから練習OK",
          },
        ],
      },
    ],
    rules: [
      "ヘルメットの着用を推奨します（未装着の場合は自己責任でご利用ください）。",
      "他の利用者への配慮とマナーを守ってください。",
      "飲食物の持ち込み・店内飲食エリアのルールは店頭表示に従ってください。",
      "貸切・スクール開催日は一般利用できない場合があります。来店前にカレンダーをご確認ください。",
      "危険な行為・器具の持ち込みはお断りする場合があります。",
    ],
  },

  school: {
    slider: [
      "Street course",
      "Enhanced indoor course",
      "Private Skateboard Lessons",
    ],
    note: "レッスン料金・予約詳細はサイト上はスライダー文言のみ。要店舗確認。",
  },

  maintenance: {
    /** 出典: http://www.spray166.com/board-maintenance/ + 店頭料金表（2026） */
    lead:
      "経験・知識豊富なスタッフがメンテいたしますので、安心してお申し付け下さい。シーズン中は大変込み合いますのでお早めにメンテナンスを！",
    footerNote: "＊チューンナップは混み具合によっては日数がかかります。",
    priceMenuLeft: [
      {
        name: "ソールサンディング",
        price: "¥6,600",
        description:
          "マシーンでソールを薄く削るので小キズも綺麗に♪古く、硬く酸化・硬化したソールもまるで新品同様に！滑走面のエッジも研げて、ワックスの吸収も良くなります。",
      },
      { name: "サイドエッジ研磨", price: "¥3,300" },
      { name: "サイド＆ソールエッジ研磨（錆び落とし）", price: "¥6,600" },
      { name: "ダリング＆ワックス", price: "¥7,700" },
      {
        name: "ホットワックス",
        price: "",
        subItems: [
          { label: "スノーボード", price: "¥3,300" },
          { label: "スキー", price: "¥4,400" },
        ],
        note: "ユーズドボードは状態によってソールやエッジのクリーニングが必要です。別途料金がかかります＋¥2,200〜",
      },
      { name: "ストラクチャー加工", price: "¥19,800〜" },
      {
        name: "エッジシェイプチューン",
        price: "",
        subItems: [
          { label: "150cm以下", price: "¥17,600" },
          { label: "151〜169cm", price: "¥18,800" },
          { label: "170cm以上", price: "¥22,000" },
        ],
        description:
          "ノーズ・テール、ベースエッジビベリング、エッジダリング、ソールサンディング、SPRAY オリジナルサーモ WAX といったスペシャルチューンナップです。",
      },
    ],
    priceMenuRight: [
      { name: "ブーツ紐・ワイヤー交換", price: "¥4,400〜" },
      { name: "BOA ダイヤル交換", price: "¥7,700〜" },
      {
        name: "ブーツインナー熱成型",
        price: "¥5,500〜",
        note: "ハードブーツは ¥8,800",
      },
      {
        name: "金具調整・セッティング",
        price: "¥4,400〜",
        note: "（スノーボード）",
      },
      { name: "ビンディング取り付け", price: "¥5,500", note: "（スキー）" },
      { name: "スケートボード組み立て", price: "¥4,400" },
      { name: "デッキテープ貼り換え", price: "¥3,300" },
    ],
    tuneUp: [
      {
        name: "ソールサンディング",
        description:
          "ソールを薄く削るので小傷を綺麗に♪古く、硬く酸化したソールも新品同様に！滑走面のエッジも研けて、ワックスの吸収もバツグンです。",
        price: "¥6,600",
      },
      {
        name: "サイドエッジ研磨",
        description: "ボードのエッジ研磨",
        price: "¥3,300",
      },
      {
        name: "ダリング＆ワックス",
        description: "エッジのダリングおよびワックス仕上げ",
        price: "¥7,700",
      },
    ],
    labor: [
      {
        name: "ブーツ紐・ワイヤー交換（1カ所）",
        description: "交換時間が掛るため、ブーツをお預かりいたします。",
        price: "¥4,400～",
      },
      {
        name: "BOAダイヤル交換",
        description: "BOAダイヤル部品の交換",
        price: "¥7,700～",
      },
      {
        name: "ブーツインナー熱成型",
        description:
          "所要時間約30分（暖め15分＋成型15分）。ライディングに使用するソックスをご持参下さい。",
        price: "¥5,500～",
        note: "ハードブーツは¥8,800",
      },
      {
        name: "金具調整・セッティング（スノーボード）",
        description: "スノーボード",
        price: "¥4,400～",
      },
      {
        name: "ビンディング取り付け（スキー）",
        description: "スキービンディングの取り付け",
        price: "¥5,500",
      },
      {
        name: "スケートボード組み立て",
        description: "デッキ・トラック・ウィール等の組み立て",
        price: "¥4,400",
      },
      {
        name: "デッキテープ貼り換え",
        description: "スケートボードデッキのグリップテープ貼り替え",
        price: "¥3,300",
      },
    ],
  },

  staff: [
    {
      name: "荒井 健二",
      nameEn: "Arai Kenji",
      birthplace: "北海道上川郡美瑛町",
      facebook: "https://www.facebook.com/kenji.arai.712",
      image: "/images/staff-arai-kenji.png",
    },
  ],

  social: {
    youtube: "https://www.youtube.com/c/Spray166",
    facebook: "https://www.facebook.com/SPRAY166/",
    instagram: "https://www.instagram.com/spray166/",
  },

  ec: {
    rakuten: "https://www.rakuten.ne.jp/gold/spray/",
    yahoo: "https://store.shopping.yahoo.co.jp/spray/",
    official: "https://www.spray166.shop/",
  },
} as const;
