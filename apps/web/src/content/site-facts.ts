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
    headline: "国内最大級！全面580㎡の広々としたパーク",
    subhead: "＊spray skate park＊",
    intro:
      "ストリートコースが拡張されより楽しくなりましたので、皆さん気軽におこし下さいませ！",
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
    priceImageUrl:
      "https://www.spray166.com/wp-content/uploads/2019/09/parkrpice.jpg",
    scheduleImageUrl:
      "https://www.spray166.com/wp-content/uploads/2019/09/radysday.jpg",
    priceNote:
      "パーク利用料金は公式サイト上「パーク利用時間料金表」の画像で掲載（HTML表なし）。再構築時に表へ転記予定。",
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
    footerNote: "チューンナップは混み具合によっては日数がかかります。",
    tuneUp: [
      {
        name: "サンディング",
        description:
          "ソールを薄く削るので小傷を綺麗に♪古く、硬く酸化したソールも新品同様に！滑走面のエッジも研けて、ワックスの吸収もバツグンです。",
        price: "¥6,600",
      },
      {
        name: "サイドエッジ研磨",
        description: "ボードのエッジ研磨",
        price: "¥3,300",
        note: "サイド＆ソールエッジ研磨は¥6,600",
      },
      {
        name: "サイド＆ソールエッジ研磨（錆び落とし）",
        description: "サイドエッジおよびソールエッジの研磨・錆び落とし",
        price: "¥6,600",
      },
      {
        name: "ダリング＆ワックス",
        description: "エッジのダリングおよびワックス仕上げ",
        price: "¥7,700",
      },
      {
        name: "ホットワックス",
        description:
          "アイロンによるワクシングで滑走性能抜群！簡易ワックスと比べても持続性があります。ユーズドボードは状態によってソールやエッジのクリーニングが必要です。",
        price: "¥3,300（スノーボード）/ ¥4,400（スキー）",
        note: "別途＋¥2,200～",
      },
      {
        name: "ストラクチャー加工",
        description: "ソール面のストラクチャー加工",
        price: "¥19,800～",
      },
      {
        name: "エッジシェイプチューン",
        description:
          "ノーズワーク・テールワークを含むスペシャルチューン。ベースエッジ、サイドエッジの面出し、エッジのダリング、ソールのサンディング、SPRAYオリジナルサーモワックスまで含む。",
        price: "¥17,600～",
        note: "150cmまで¥17,600／151～169cm¥18,800／170cm以上¥22,000",
      },
      {
        name: "ソールリペア",
        description: "ソールの掘れてしまった傷の修復",
        price: "別途見積",
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
    priceSheetImageUrl:
      "https://www.spray166.com/wp-content/uploads/2026/04/Screenshot_20260426_130115_Adobe-Acrobat.jpg",
  },

  staff: [
    {
      name: "荒井 健二",
      nameEn: "Arai Kenji",
      birthplace: "北海道上川郡美瑛町",
      facebook: "https://www.facebook.com/kenji.arai.712",
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
    gmo: "https://www.spray166.shop/",
  },
} as const;
