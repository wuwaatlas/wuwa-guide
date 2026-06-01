const app = document.getElementById("app");

const PAGE = {
  HOME: "home",
  BEGINNER_GUIDE: "beginnerGuide",
  STATUS_GUIDE: "statusGuide",
  ECHO_GUIDE: "echoGuide",
  DETAIL: "characterDetail"
};

const state = {
  currentPage: PAGE.HOME,
  selectedCharacterId: null,
  searchText: "",
  roleFilter: "all",
  selectedStatusIds: [],
  selectedEchoSetId: null,
  selectedEchoSkillId: null,
  selectedEchoSubStatId: null,
};

const data = {
  characters: () => window.characters ?? [],
  statusGuide: () => window.statusGuide,
  echoSet: id => window.echoSets?.[id] ?? null,
  echoSkill: id => window.echoSkills?.[id] ?? null,
  character: id => (window.characters ?? []).find(character => character.id === id) ?? null,
  echoSubStats: () => window.echoSubStats ?? [],
};

function navigate(page, patch = {}) {
  Object.assign(state, patch, { currentPage: page });
  render();
}

function backToHome() {
  navigate(PAGE.HOME, {
    selectedCharacterId: null,
    selectedEchoSetId: null,
    selectedEchoSkillId: null
  });
}

function setSelectedCharacter(id) {
  navigate(PAGE.DETAIL, {
    selectedCharacterId: id,
    selectedEchoSetId: null,
    selectedEchoSkillId: null
  });
}

function getCharacters() {
  return window.characters ?? [];
}

function setRoleFilter(role) {
  state.roleFilter = role;
  render();
}

function toggleStatus(id) {
  state.selectedStatusIds = state.selectedStatusIds.includes(id)
    ? state.selectedStatusIds.filter(selectedId => selectedId !== id)
    : [...state.selectedStatusIds, id];

  render();
}

function selectEchoSet(id) {
  state.selectedEchoSetId = state.selectedEchoSetId === id ? null : id;
  state.selectedEchoSkillId = null;
  render();
}

function selectEchoSkill(id) {
  state.selectedEchoSkillId = state.selectedEchoSkillId === id ? null : id;
  state.selectedEchoSetId = null;
  render();
}

function getFilteredCharacters() {
  return getCharacters().filter(character => {
    const searchText = state.searchText.trim().toLowerCase();

    const keywords = [
      character.name,
      ...(character.searchKeywords ?? [])
    ];

    const matchSearch =
      searchText === "" ||
      keywords.some(keyword =>
        keyword.toLowerCase().includes(searchText)
      );

    const matchRole =
      state.roleFilter === "all" ||
      character.role === state.roleFilter;

    return matchSearch && matchRole;
  });
}

function render() {
  app.innerHTML = "";

  if (state.currentPage === PAGE.DETAIL) {
    app.appendChild(renderCharacterDetail(data.character(state.selectedCharacterId)));
    return;
  }

  if (state.currentPage === PAGE.BEGINNER_GUIDE) {
    app.appendChild(renderBeginnerGuidePage());
    return;
  }

  if (state.currentPage === PAGE.STATUS_GUIDE) {
    app.appendChild(renderStatusGuide());
    return;
  }

  if (state.currentPage === PAGE.ECHO_GUIDE) {
    app.appendChild(renderEchoGuide());
    return;
  }

  app.append(
    renderHomeIntro(),
    renderHeader(),
    renderHomeLayout()
  );
}

function createElement(tagName, className, html = "") {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  return element;
}

function renderHomeIntro() {
  return createElement("section", "home-intro", `
    <h1>鳴潮 音骸ガイド</h1>
    <p>キャラごとの音骸セット・音骸スキル・サブステータス優先度をまとめます。</p>
  `);
}

function renderHeader() {
  return createElement("div", "app-header", `
    <h1>鳴潮 音骸ガイド</h1>
    <div class="controls">
      <input
        id="searchInput"
        type="text"
        placeholder="キャラ検索"
        value="${state.searchText}"
        autocomplete="off"
      >

      <select id="roleFilter">
        ${renderRoleOptions()}
      </select>

      <button id="guideButton" type="button">初心者ガイド</button>
    </div>
  `);
}

function renderCharacterListOnly() {
  const oldList = document.querySelector(".character-list");
  if (!oldList) return;

  oldList.replaceWith(renderCharacterList());
}

function renderRoleOptions() {
  const roles = ["all", "アタッカー", "サブアタッカー", "サポーター"];
  const labels = { all: "すべて" };

  return roles
    .map(role => `
      <option value="${role}" ${state.roleFilter === role ? "selected" : ""}>
        ${labels[role] ?? role}
      </option>
    `)
    .join("");
}

function renderBeginnerCards() {
  return createElement("section", "beginner-section", `
    <h2>初心者向け</h2>
    <div class="beginner-card-list">
    <button class="guide-card" data-page="${PAGE.STATUS_GUIDE}" type="button">
      <span class="guide-card-title">ステータスのみかた</span>
      <span class="guide-card-description">基本的なステータスの意味を解説</span>
    </button>
    <button class="guide-card" data-page="${PAGE.ECHO_GUIDE}" type="button">
      <span class="guide-card-title">音骸ステータスのみかた / 音骸厳選のコツ</span>
      <span class="guide-card-description">音骸サブステータスや厳選の考え方を解説</span>
    </button>
    </div>
  `);
}

function renderHomeLayout() {
  const homeLayout = createElement("div", "home-layout");
  const main = createElement("main", "home-main");

  main.appendChild(renderCharacterList());
  homeLayout.append(main, renderSideInfo());

  return homeLayout;
}

function renderSideInfo() {
  return createElement("aside", "side-info", `
    <h2>初心者向け</h2>

    <button class="guide-card" data-page="${PAGE.STATUS_GUIDE}" type="button">
      <span class="guide-card-title">ステータスのみかた</span>
      <span class="guide-card-description">
        基本的なステータスの意味を解説
      </span>
    </button>

    <button class="guide-card" data-page="${PAGE.ECHO_GUIDE}" type="button">
      <span class="guide-card-title">
        音骸ステータスのみかた / 音骸厳選のコツ
      </span>
      <span class="guide-card-description">
        音骸サブステータスや厳選の考え方を解説
      </span>
    </button>
  `);
}

function renderCharacterList() {
  const wrapper = createElement("div", "character-list");

  getFilteredCharacters().forEach(character => {
    const card = createElement("button", "character-card", `
      <span class="character-icon-ring">
        <img class="character-card-image" src="${character.icon}" alt="${character.name}">
      </span>
      <span class="character-name">${character.name}</span>
    `);

    card.type = "button";
    card.addEventListener("click", () => setSelectedCharacter(character.id));
    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderEchoSets(character) {
  return character.echoSets.map(echoSetId => {
    const echoSet = data.echoSet(echoSetId);

    if (!echoSet) {
      return `<span class="echo-set">不明な音骸セット：${echoSetId}</span>`;
    }

    return `
      <button class="echo-set echo-set-button" data-echo-set-id="${echoSetId}" type="button">
        ${echoSet.icon ? `<img class="echo-set-icon" src="${echoSet.icon}" alt="${echoSet.name}">` : ""}
        <span class="echo-set-name">${echoSet.name}</span>
      </button>
    `;
  }).join("");
}

function renderEchoSkill(character) {
  const echoSkill = data.echoSkill(character.echoSkill);

  if (!echoSkill) {
    return `<span class="echo-skill">不明な音骸スキル：${character.echoSkill}</span>`;
  }

  return `
    <button class="echo-skill-button" data-echo-skill-id="${character.echoSkill}" type="button">
      ${echoSkill.icon ? `<img class="echo-skill-icon" src="${echoSkill.icon}" alt="${echoSkill.name}">` : ""}
      <span class="echo-skill-name">${echoSkill.name}</span>
    </button>
  `;
}

function renderCharacterDetail(character) {
  const detail = createElement("section", "character-detail");

  if (!character) {
    detail.textContent = "キャラが見つかりません";
    return detail;
  }

  detail.innerHTML = `
    <div class="character-detail-inner ${character.theme}">
      <button id="backButton" class="detail-back-button" type="button">← 戻る</button>

      <div class="detail-layout">
        <div class="character-image-area">
          <div class="detail-visual">
            <img class="detail-character-image" src="${character.detailImage}" alt="${character.name}">
          </div>
        </div>

        <div class="character-info-area">
          <div class="detail-info">
            <h2>${character.name}</h2>
            <p>役割：${character.role}</p>
            <p>属性：${character.attribute ?? "-"}</p>

            <h3>推奨音骸セット</h3>
            <div class="echo-set-list">${renderEchoSets(character)}</div>

            <h3>音骸スキル</h3>
            <div class="echo-skill-box">${renderEchoSkill(character)}</div>

            <h3>メインステータス</h3>
            <div class="stat-list stat-list-box">
              <div><span>4コスト</span><strong>${character.mainStats.cost4}</strong></div>
              <div><span>3コスト</span><strong>${character.mainStats.cost3_1}</strong></div>
              <div><span>3コスト</span><strong>${character.mainStats.cost3_2}</strong></div>
              <div><span>1コスト</span><strong>${character.mainStats.cost1_1}</strong></div>
              <div><span>1コスト</span><strong>${character.mainStats.cost1_2}</strong></div>
            </div>

            <h3>サブステータス優先度</h3>
            <div class="stat-list">
              ${character.subStats.length
                ? character.subStats.map(stat => `<div>${stat}</div>`).join("")
                : "-"
              }
            </div>
            <h3>目標ステータス</h3>
            <p>${character.memo ?? "-"}</p>
          </div>
        </div>

        <div class="detail-side-panels">${renderDetailSidePanel(character)}</div>
      </div>
    </div>
  `;

  return detail;
}

function renderDetailSidePanel(character) {
  if (state.selectedEchoSkillId) {
    return renderEchoSkillDetailPanel();
  }
  if (state.selectedEchoSetId) {
    return renderEchoSetDetailPanel();
  }
  return `
    ${renderPartyPanel(character)}
    ${renderWeaponPanel(character)}
  `
}

function renderPartyPanel(character) {
  const parties = character?.parties ?? [];

  if (!parties.length) {
    return `
      <aside class="echo-detail-panel">
        <h3>おすすめパーティー</h3>
        <p>未設定</p>
      </aside>
    `;
  }

  return parties.map(party => `
    <aside class="echo-detail-panel party-panel">
      <h3>${party.title}</h3>

      <div class="party-member-list">
        ${party.members.map(member => `
          <div class="party-member-card">
            <img
              class="party-member-image"
              src="${member.image}"
              alt="${member.name}"
            >

            <div>
              <span class="party-member-role">${member.role}</span>
              <strong class="party-member-name">${member.name}</strong>
            </div>
          </div>
        `).join("")}
      </div>

      ${party.note ? `<p class="party-note">${party.note}</p>` : ""}
    </aside>
  `).join("");
}

function renderWeaponPanel(character) {
  const weapons = character?.weapons ?? [];

  if (!weapons.length) {
    return `
      <aside class="echo-detail-panel weapon-panel">
        <h3>おすすめ武器</h3>
        <p>未設定</p>
      </aside>
    `;
  }

  return `
    <aside class="echo-detail-panel weapon-panel">
      <h3>おすすめ武器</h3>

      <div class="weapon-list">
        ${weapons.map(weapon => `
          <div class="weapon-card">
            <span class="weapon-rank">${weapon.rank}</span>
            <img class="weapon-image" src="${weapon.image}" alt="${weapon.name}">
            <div>
              <strong>${weapon.name}</strong>
              ${weapon.note ? `<p>${weapon.note}</p>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </aside>
  `;
}

function renderEchoSetDetailPanel() {
  const echoSet = data.echoSet(state.selectedEchoSetId);
  if (!echoSet) return "";

  return `
    <aside class="echo-detail-panel">
      <h3>${echoSet.name}</h3>
      <p class="echo-detail-label">取得場所</p>
      <p>${echoSet.locationName ?? "未設定"}</p>
      ${echoSet.locationImage ? `<img class="echo-location-image" src="${echoSet.locationImage}" alt="${echoSet.name}">` : "<p>未設定</p>"}
      <p class="echo-detail-label">セット効果</p>
      <p>${echoSet.effect?.trim() || "未設定"}</p>
    </aside>
  `;
}

function renderEchoSkillDetailPanel() {
  const echoSkill = data.echoSkill(state.selectedEchoSkillId);
  if (!echoSkill) return "";

  return `
    <aside class="echo-detail-panel">
      <h3>${echoSkill.name}</h3>
      <p class="echo-detail-label">取得場所</p>
      <p>${echoSkill.locationName ?? "未設定"}</p>
      ${echoSkill.locationImage ? `<img class="echo-location-image" src="${echoSkill.locationImage}" alt="${echoSkill.name}">` : ""}
      <p class="echo-detail-label">効果</p>
      <p>${echoSkill.description?.trim() || "未設定"}</p>
    </aside>
  `;
}

function renderStatusGuideContent() {
  const guide = data.statusGuide();

  return `
    <section class="beginner-guide-block status-guide">
      <h2>ステータスのみかた</h2>
      <p class="guide-lead">画像内のステータス名をクリックすると説明が出ます。</p>

      <div class="status-guide-layout">
        <div class="guide-toolbar">
          <button id="showAllButton" type="button">すべて表示</button>
          <button id="hideAllButton" type="button">すべて非表示</button>
        </div>

        <div class="guide-image-wrapper">
          <img class="guide-image" src="${guide.image}" alt="ステータス画面">

          <svg class="guide-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${guide.hitAreas.map(area => `
              <rect
                class="guide-hit-area"
                data-stat-id="${area.statId}"
                x="${area.x}"
                y="${area.y}"
                width="${area.width}"
                height="${area.height}"
              />
            `).join("")}
          </svg>

          ${renderStatusDescriptions()}
        </div>
      </div>
    </section>
  `;
}

function renderEchoGuideContent() {
  return `
    <section class="beginner-guide-block echo-guide-page">
      <h2>音骸ステータスのみかた / 音骸厳選のコツ</h2>

      <p class="guide-lead">
        下図のように音骸選択時、そのキャラの有効のサブステータスが強調表示される
      </p>

      <img
        class="echo-guide-image"
        src="images/status/echoguide.png"
        alt="音骸サブステータスの見方"
      >

      <div class="echo-guide-table-layout">
        ${renderEchoSubStatSimpleTable()}
        ${renderEchoSubStatDetailTable()}
      </div>
    </section>
  `;
}
function renderBeginnerGuidePage() {
  return createElement("section", "beginner-guide-page", `
    <button id="backButton" class="guide-back-button">← 戻る</button>

    <h2>初心者ガイド</h2>

    ${renderStatusGuideContent()}
    ${renderEchoGuideContent()}
  `);
}

function renderStatusGuide() {
  return createElement("section", "status-guide", `
    <button id="backButton" class="guide-back-button">← 戻る</button>
    ${renderStatusGuideContent()}
  `);
}

function renderEchoGuide() {
  return createElement("section", "echo-guide-page", `
    <button id="backButton" class="guide-back-button">← 戻る</button>
    ${renderEchoGuideContent()}
  `);
}

function renderEchoSubStatSimpleTable() {
  const subStats = data.echoSubStats();

  return `
    <section class="echo-simple-table-section">
      <h3>音骸サブステータスの数値一覧</h3>

      <div class="echo-simple-table">
        <div class="echo-simple-table-header">
          <span>種類</span>
          <span>最小</span>
          <span>最大</span>
        </div>

        ${subStats.map(stat => `
          <button
            class="echo-simple-table-row ${state.selectedEchoSubStatId === stat.id ? "is-selected" : ""}"
            data-echo-substat-id="${stat.id}"
            type="button"
          >
            <span>${stat.name}</span>
            <span>${stat.min}</span>
            <span>${stat.max}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderEchoSubStatDetailTable() {
  const subStats = data.echoSubStats();

  const selectedStat =
    subStats.find(stat => stat.id === state.selectedEchoSubStatId);

  if (!selectedStat) {
    return `
      <section class="echo-detail-table-section">
        <div class="echo-selected-roll-table">
          <h3>サブステータスを選択してください</h3>
          <p class="guide-lead">左の表から項目をクリックすると、ロール値が表示されます。</p>
        </div>

        <details class="echo-detail-table-details">
          <summary>全ロール値を見る</summary>
          ${renderAllEchoSubStatRollTable(subStats, null)}
        </details>
      </section>
    `;
  }

  return `
    <section class="echo-detail-table-section">
      <div class="echo-selected-roll-table">
        <h3>${selectedStat.name} のロール値</h3>

        <table class="echo-detail-table">
          <thead>
            <tr>
              <th>ステータス</th>
              ${selectedStat.rolls.map((_, index) => `<th>${index + 1}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${selectedStat.name}</td>
              ${selectedStat.rolls.map(value => `<td>${value}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>

      <details class="echo-detail-table-details">
        <summary>全ロール値を見る</summary>
        ${renderAllEchoSubStatRollTable(subStats, selectedStat.id)}
      </details>
    </section>
  `;
}

function renderAllEchoSubStatRollTable(subStats, selectedId) {
  return `
    <div class="echo-detail-table-wrapper">
      <table class="echo-detail-table">
        <thead>
          <tr>
            <th>ステータス</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
          </tr>
        </thead>

        <tbody>
          ${subStats.map(stat => `
            <tr class="${stat.id === selectedId ? "is-selected" : ""}">
              <td>${stat.name}</td>
              ${stat.rolls.map(value => `<td>${value}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderStatusDescriptions() {
  const guide = data.statusGuide();
  const selectedStats = guide.stats
    .filter(stat => state.selectedStatusIds.includes(stat.id))
    .sort((a, b) => a.order - b.order);

  return `
    <div class="status-description-stack">
      ${selectedStats.map(stat => `
        <div class="status-description">
          <h3>${stat.label}</h3>
          <p>${stat.description}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function bindEvents() {
  document.addEventListener("input", event => {
  if (event.target.id !== "searchInput") return;

  state.searchText = event.target.value;
  renderCharacterListOnly();
  });

  document.addEventListener("change", event => {
    if (event.target.id === "roleFilter") {
      setRoleFilter(event.target.value);
    }
  });

  document.addEventListener("click", event => {
    const target = event.target;

    if (target.closest("#guideButton")) {
      navigate(PAGE.BEGINNER_GUIDE);
      return;
    }

    if (target.closest("#backButton")) {
      backToHome();
      return;
    }

    if (target.classList.contains("guide-hit-area")) {
      toggleStatus(target.dataset.statId);
      return;
    }

    const echoSetButton = target.closest(".echo-set-button");
    if (echoSetButton) {
      selectEchoSet(echoSetButton.dataset.echoSetId);
      return;
    }

    const echoSkillButton = target.closest(".echo-skill-button");
    if (echoSkillButton) {
      selectEchoSkill(echoSkillButton.dataset.echoSkillId);
    }

    if (target.id === "showAllButton") {
      state.selectedStatusIds =
      window.statusGuide.stats.map(stat => stat.id);
      render();
    }
    if (target.id === "hideAllButton") {
      state.selectedStatusIds = [];
      render();
    }

    if (target.closest("[data-page]")) {
      const button = target.closest("[data-page]");
      state.currentPage = button.dataset.page;
      render();
    }
    const subStatButton = target.closest("[data-echo-substat-id]");
    if (subStatButton) {
      const clickedId = subStatButton.dataset.echoSubstatId;
      state.selectedEchoSubStatId = state.selectedEchoSubStatId === clickedId ? null : clickedId;
      render();
      return;
    }
  });
}

function restoreSearchFocus() {
  requestAnimationFrame(() => {
    const input = document.getElementById("searchInput");
    if (!input) return;

    input.focus();
    input.setSelectionRange(state.searchText.length, state.searchText.length);
  });
}

bindEvents();
render();
