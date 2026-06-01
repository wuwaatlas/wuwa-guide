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

window.echoSubStats = [
  {
    id: "hpPercent",
    name: "HP%",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  },
  {
    id: "atkPercent",
    name: "攻撃力%",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  },
  {
    id: "defPercent",
    name: "防御力%",
    min: "8.1%",
    max: "14.7%",
    rolls: ["8.1%", "9.0%", "10.0%", "10.9%", "11.8%", "12.8%", "13.6%", "14.7%"]
  },
  {
    id: "critRate",
    name: "クリティカル",
    min: "6.3%",
    max: "10.5%",
    rolls: ["6.3%", "6.9%", "7.5%", "8.1%", "8.7%", "9.3%", "9.9%", "10.5%"]
  },
  {
    id: "critDmg",
    name: "クリティカルダメージ",
    min: "12.6%",
    max: "21.0%",
    rolls: ["12.6%", "13.8%", "15.0%", "16.2%", "17.4%", "18.6%", "19.8%", "21.0%"]
  },
  {
    id: "energy",
    name: "共鳴効率",
    min: "6.8%",
    max: "12.4%",
    rolls: ["6.8%", "7.6%", "8.4%", "9.2%", "10.0%", "10.8%", "11.6%", "12.4%"]
  },
  {
    id: "normalDmg",
    name: "通常攻撃ダメージ",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  },
  {
    id: "heavyDmg",
    name: "重撃ダメージ",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  },
  {
    id: "skillDmg",
    name: "共鳴スキルダメージ",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  },
  {
    id: "liberationDmg",
    name: "共鳴解放ダメージ",
    min: "6.4%",
    max: "11.6%",
    rolls: ["6.4%", "7.1%", "7.9%", "8.6%", "9.4%", "10.1%", "10.9%", "11.6%"]
  }
];

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
      cost3_1: "凝縮ダメージ",
      cost3_2: "凝縮ダメージ or 攻撃%",
      cost1_1: "攻撃%",
      cost1_2: "攻撃%"
    },
    subStats: [
      "1：クリティカルダメージ",
      "2：クリティカル率",
      "3：攻撃%",
      "4：共鳴解放ダメージ",
      "5：攻撃力実数"
    ],
    parties: [
      {
        title: "おすすめ編成",

        members: [
          {
            role: "アタッカー",
            name: "緋雪",
            image: "images/icon/hiyuki.webp"
          },
          {
            role: "サブアタッカー",
            name: "リンネー",
            image: "images/icon/lynae.webp"
          },
          {
            role: "サポーター",
            name: "千咲",
            image: "images/icon/chisa.webp"
          }
        ]
      }
    ],
    weapons: [
      {
        rank: 1,
        name: "灼霜",
        image: "images/icon/syakuso.webp"
      },
      {
        rank: 2,
        name: "千古の湖水(旧恒常★5)",
        image: "images/icon/senkonokosui.webp"
      }
    ],
    rotation: [
      {
        character: "千咲",
        icon: "images/icon/chisa.webp",
        lightClick: "images/icon/rotation/chisaLightclick.webp",
        eSkill: "images/icon/rotation/chisaE.webp",
        rSkill: "images/icon/rotation/hiyukiR.webp",
        qSkill: "",
      },
      {
        character: "リンネー",
        icon: "images/icon/lynae.webp",
        lightClick: "",
        eSkill: "",
        rSkill: "",
        qSkill: "",
      },
      {
        character: "緋雪",
        icon: "images/icon/hiyuki.webp",
        lightClick: "",
        eSkill: "",
        rSkill: "",
        qSkill: "",
      }
    ],
    memo: "・共鳴効率120%<br> ・クリティカル75%<br> ・クリティカルダメージ220%～<br> ・攻撃力2000～"
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
      cost3_1: "回折ダメージ",
      cost3_2: "回折ダメージ",
      cost1_1: "攻撃%",
      cost1_2: "攻撃%"
    },
    subStats: [
      "1：クリティカル/クリティカルダメージ",
      "2：攻撃力％",
      "3：通常攻撃%",
      "4：攻撃力実数"
    ],
    memo: "・共鳴効率125%～<br> ・クリティカル75%～<br> ・クリティカルダメージ200%～<br> ・攻撃力2000～"
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
      cost3_1: "消滅ダメージ",
      cost3_2: "消滅ダメージ",
      cost1_1: "攻撃%",
      cost1_2: "攻撃%"
    },
    subStats: [
      "1：クリティカル/クリティカルダメージ",
      "2：攻撃力％",
      "3：共鳴解放ダメージ",
      "4：攻撃力実数"
    ],
    memo: "・共鳴効率125%～<br> ・クリティカル74%～<br> ・クリティカルダメージ200%～<br> ・攻撃力1800～"
  }
];