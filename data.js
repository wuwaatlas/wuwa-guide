window.statusGuide = {
  image: "images/status/status.png",

  defaultSelectedId: "hp",

  stats: [
  {
    id: "hp",
    label: "HP",
    description: "キャラの体力。0になると戦闘不能になります。",
    order: 1,
  },
  {
    id: "atk",
    label: "攻撃力",
    description: "多くの攻撃ダメージの元になる数値。アタッカーでは重要です。",
    order: 2,
  },
  {
    id: "def",
    label: "防御力",
    description: "受けるダメージに関係する数値。",
    order: 3,
  },
  {
    id: "energy",
    label: "共鳴効率",
    description: "共鳴解放(ULT)のチャージ効率に関係する数値。高いほど早くULTが使えるようになります。",
    order: 4,
  },
  {
    id: "critRate",
    label: "クリティカル",
    description: `100%で確定会心。<br>
    初心者目安：<br>
    クリティカル：クリティカルダメージ = <span class="highlight-ratio">1：2(例 50:100)</span>`,
    order: 5,
  },
  {
    id: "critDmg",
    label: "クリティカルダメージ",
    description: "会心ダメージ",
    order: 6
  }
],

  hitAreas: [
    { statId: "hp", x: 10.5, y: 32, width: 19, height: 4 },
    { statId: "atk", x: 10.5, y: 36, width: 19, height: 4 },
    { statId: "def", x: 10.5, y: 40, width: 19, height: 4 },
    { statId: "energy", x: 10.5, y: 44, width: 19, height: 4 },
    { statId: "critRate", x: 10.5, y: 48, width: 19, height: 4 },
    { statId: "critDmg", x: 10.5, y: 52, width: 19, height: 4 }
  ]
};


window.echoSets = {
  wishesOfQuietSnowfall: {
    name: "静寂祈念の雪",
    icon: "images/ico-sonata-29.webp",
    locationName: "サンセット・アイランドの無音区",
    locationImage: "images/echomap/wishesOfQuietSnowfall.png",
    effect: `
      2セット：
      凝縮ダメージ10%アップ

      5セット：
      結霜効果付与時
      ①凝縮ダメージ10％アップ(15秒持続)
      ②降雪効果獲得(25秒ごとに1回)
      ・共鳴解放ダメージを与えるとこれを消費し会心率25%アップ(6秒持続、最大30秒まで延長可)
      ・終奏スキル発動時これを消費し次の登場キャラの凝縮ダメージ25％アップ(15秒持続)
    ` 
  },
  pactOfNeonlightLeap: {
    name: "リフレクト・ブレイス",
    icon: "images/ico-sonata-23.webp",
    locationName: "モーバロウ・デザートの無音区",
    locationImage: "images/echomap/pactOfNeonlightLeap.png",
    effect: `
      2セット：
      回折ダメージ10%アップ

      5セット：
      終奏スキル発動後、次のキャラの攻撃力15％アップ
      協和破壊増強1ptにつき攻撃力が追加で0.3％アップ(最大15％アップ/15秒持続/キャラ交代で解除w)
    `
  },
  rejuvenatingGlow: {
    name: "喧騒に隠す回光",
    icon: "images/ico-sonata-7.webp",
    locationName: "中部台地の無音区/帰来の港の無音区",
    locationImage: "images/echomap/RejuvenatingGlow.png",
    effect: `
      2セット
      HP回復効果10％アップ

      5セット
      味方を回復後、チーム内全員の攻撃力15％アップ(30秒持続)
    `
  }
};

window.echoSkills = {
  VoidborneConstruct: {
    name: "響き渡る共鳴・鳴式・虚構神機",
    icon: "",
    locationName: "虚妄より生まれし種・戦歌復唱",
    locationImage: "images/echomap/VoidborneConstruct.png",
    description: `
    ①召喚時に凝縮ダメージ発生

    ②メイン装備時
    ・凝縮ダメージ12％アップ
    ・共鳴解放ダメージ12％アップ
    `
  },
  Hyvatia: {
    name: "ハイヴェイシャ",
    icon: "images/icon/Hyvatia.webp",
    locationName: "強敵討伐＞ハイヴェイシャ",
    locationImage: "images/echomap/Hyvatia.png",
    description: `
    ①召喚系ダメージ音骸

    ②召喚後15秒以内に終奏スキルを発動すると次のキャラの全属性ダメージ19％アップ(15秒継続)
    `
  },
  Leviathan: {
    name: "レビヤタン",
    icon: "",
  },
  FallacyofNoReturn: {
    name: "フェイタルエラー",
    icon: "images/icon/FallacyofNoReturn.webp",
    locationName: "強敵討伐＞フェイタルエラー",
    locationImage: "images/echomap/FallacyofNoReturn.png",
    description: `
    ①音骸スキル発動し、フェイタルエラーの一部の権能を召喚して、周囲の敵に対して自身のHP上限の15.86％相当の回折ダメージを1回与える。自身の共鳴効率を10％アップ、チーム内全員の攻撃力を10％アップ(20秒持続)
    ②音骸スキルを長押しすると、震撃終了時にスタミナを消費して持続的に攻撃を発動する。1回につき自身のHP上限の1.58%相当の回折ダメージを与える。長押しをやめると、最後の一撃が発動し、自身のHP上限の19.82%相当の回折ダメージを与える。
    `
  },
};

window.characters = [
  {
    id: "hiyuki",
    name: "緋雪",
    searchKeywords: ["ひゆき", "hiyuki"],
    icon: "images/icon/hiyuki.webp",
    detailImage: "images/character/hiyuki.webp",
    theme: "snow",
    role: "アタッカー",
    attribute: "凝縮",
    echoSets: ["wishesOfQuietSnowfall"],
    echoSkill: "VoidborneConstruct",
    mainStats: {
      cost4: "クリティカルダメージ",
      cost3: "凝縮ダメージ / 攻撃%",
      cost1: "攻撃%"
    },
    subStats: [
      "1：クリティカルダメージ",
      "2：クリティカル率",
      "3：攻撃%",
      "4：共鳴解放ダメージ",
      "5：攻撃力実数"
    ],
    memo: "共鳴効率120%<br> クリティカル75%<br> クリティカルダメージ220%～<br> 攻撃力2000～"
  },
  {
    id: "Lynae",
    name: "リンネー",
    searchKeywords: ["りんねー", "lynae"],
    icon: "images/icon/lynae.webp",
    detailImage: "images/character/lynae.webp",
    theme: "linne",
    role: "サブアタッカー",
    attribute: "回折",
    echoSets: ["pactOfNeonlightLeap"],
    echoSkill: "Hyvatia",
    mainStats: {
      cost4: "クリティカルダメージ or クリティカル",
      cost3: "回折ダメージ",
      cost3: "回折ダメージ",
      cost1: "攻撃%",
      cost1: "攻撃%"
    },
    subStats: [
      "1:クリティカル/クリティカルダメージ",
      "2:攻撃力％",
      "3:通常攻撃%",
      "4:攻撃力実数"
    ],
    memo: "共鳴効率125%～<br> クリティカル75%～<br> クリティカルダメージ200%～<br> 攻撃力2000～"
  },
  {
    id: "chisa",
    name: "千咲",
    searchKeywords: ["ちさ", "chisa", "tisaw"],
    icon: "images/icon/chisa.webp",
    detailImage: "images/character/chisa.webp",
    theme: "chisa",
    role: "サポーター",
    attribute: "消滅",
    echoSets: ["rejuvenatingGlow"],
    echoSkill: "FallacyofNoReturn",
    mainStats: {
      cost4: "クリティカルダメージ or クリティカル",
      cost3: "消滅ダメージ",
      cost3: "消滅ダメージ",
      cost1: "攻撃%",
      cost1: "攻撃%"
    },
    subStats: [
      "1:クリティカル/クリティカルダメージ",
      "2:攻撃力％",
      "3:共鳴解放ダメージ",
      "4:攻撃力実数"
    ],
    memo: "共鳴効率125%～<br> クリティカル74%～<br> クリティカルダメージ200%～<br> 攻撃力1800～"
  }
];