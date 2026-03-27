const filterDefinitions = {
  country: [
    { value: "Hong Kong", label: "Hong Kong 香港" },
    { value: "Taiwan", label: "Taiwan 台灣" },
    { value: "Malaysia", label: "Malaysia 馬來西亞" },
    { value: "Thailand", label: "Thailand 泰國" },
    { value: "Indonesia", label: "Indonesia 印尼" },
    { value: "Singapore", label: "Singapore 新加坡" },
    { value: "United Kingdom", label: "United Kingdom 英國" },
    { value: "United States", label: "United States 美國" }
  ],
  sport: [
    { value: "Badminton", label: "Badminton 羽毛球" },
    { value: "Tennis", label: "Tennis 網球" },
    { value: "Squash", label: "Squash 壁球" }
  ],
  district: [
    { value: "Central and Western", label: "Central and Western 中西區" },
    { value: "Wan Chai", label: "Wan Chai 灣仔區" },
    { value: "Eastern", label: "Eastern 東區" },
    { value: "Southern", label: "Southern 南區" },
    { value: "Yau Tsim Mong", label: "Yau Tsim Mong 油尖旺" },
    { value: "Sham Shui Po", label: "Sham Shui Po 深水埗區" },
    { value: "Kowloon City", label: "Kowloon City 九龍城區" },
    { value: "Wong Tai Sin", label: "Wong Tai Sin 黃大仙區" },
    { value: "Kwun Tong", label: "Kwun Tong 觀塘" },
    { value: "Kwai Tsing", label: "Kwai Tsing 葵青區" },
    { value: "Yuen Long", label: "Yuen Long 元朗區" },
    { value: "Tuen Mun", label: "Tuen Mun 屯門區" },
    { value: "North", label: "North 北區" },
    { value: "Tai Po", label: "Tai Po 大埔區" },
    { value: "Sha Tin", label: "Sha Tin 沙田區" },
    { value: "Sai Kung", label: "Sai Kung 西貢區" },
    { value: "Islands", label: "Islands 離島區" },
    { value: "Tsuen Wan", label: "Tsuen Wan 荃灣" }
  ]
};

const filterState = {
  country: new Set(),
  sport: new Set(),
  district: new Set()
};

const singleSelectFilters = new Set(["country", "sport"]);

const contactOrder = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: (value) => `https://wa.me/${value.replace(/\D/g, "")}`
  },
  {
    key: "instagram",
    label: "Instagram",
    href: (value) => {
      const formatted = value.replace(/^@/, "");
      return formatted.startsWith("http") ? formatted : `https://instagram.com/${formatted}`;
    }
  },
  {
    key: "thread",
    label: "Threads",
    href: (value) => {
      if (value.startsWith("http")) return value;
      const handle = value.replace(/^@/, "");
      return `https://www.threads.net/${handle}`;
    }
  },
  {
    key: "facebook",
    label: "Messenger",
    href: (value) => {
      if (value.startsWith("http")) return value;
      const handle = value.replace(/^@/, "");
      return `https://m.me/${handle}`;
    }
  },
  {
    key: "email",
    label: "Email",
    href: (value) => `mailto:${value}`
  },
  {
    key: "phone",
    label: "Phone",
    href: (value) => `tel:${value.replace(/\s+/g, "")}`
  },
  {
    key: "website",
    label: "Website",
    href: (value) => value
  }
];

let stringers = [];
const grid = document.getElementById("stringer-grid");
const activeCount = document.getElementById("active-count");
const resetButton = document.getElementById("resetFilters");

function renderFilterChips() {
  Object.entries(filterDefinitions).forEach(([type, options]) => {
    const container = document.getElementById(`${type}-chips`);
    if (!container) return;
    container.innerHTML = "";
    options.forEach(({ value, label }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = label;
      chip.dataset.value = value;
      chip.dataset.filterType = type;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => toggleFilter(type, value, chip));
      container.appendChild(chip);
    });
  });
}

function toggleFilter(type, value, chip) {
  const activeSet = filterState[type];
  const isSelected = activeSet.has(value);
  if (singleSelectFilters.has(type) && !isSelected) {
    activeSet.clear();
    document.querySelectorAll(`.chip[data-filter-type="${type}"]`).forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });
  }
  if (isSelected) {
    activeSet.delete(value);
    chip.classList.remove("active");
    chip.setAttribute("aria-pressed", "false");
  } else {
    activeSet.add(value);
    chip.classList.add("active");
    chip.setAttribute("aria-pressed", "true");
  }
  applyFilters();
}

function resetFilters() {
  Object.values(filterState).forEach((set) => set.clear());
  document.querySelectorAll(".chip.active").forEach((element) => {
    element.classList.remove("active");
    element.setAttribute("aria-pressed", "false");
  });
  applyFilters();
}

function applyFilters() {
  if (!stringers.length) return;
  const filtered = stringers.filter((entry) => {
    return (
      matchesFilter("country", entry.country) &&
      matchesFilter("sport", entry.sports) &&
      matchesFilter("district", entry.district)
    );
  });
  renderStringers(filtered);
  updateCount(filtered.length);
}

function matchesFilter(type, value) {
  const selections = filterState[type];
  if (!selections.size) return true;
  if (type === "sport") {
    return Array.isArray(value) && value.some((sport) => selections.has(sport));
  }
  return selections.has(value);
}

function renderStringers(list) {
  if (!grid) return;
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<p class="footer-note" style="letter-spacing:0.2em;">No stringers match the selected filters.</p>`;
    return;
  }
  list.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "stringer-card";
    const tagsMarkup = (entry.tags || []).map((tag) => `<li>${tag}</li>`).join("");
    const contactsMarkup = getContactsMarkup(entry.contacts);
    const addressMarkup = (entry.address_lines || []).join("<br>");
    const sportMarkup = (entry.sports || []).map((sport) => `<span class="sport-pill">${sport}</span>`).join("");
    card.innerHTML = `
      <p class="card-district">${entry.district_label || entry.district}</p>
      <h3>${entry.name}</h3>
      <p class="description">${entry.description}</p>
      ${sportMarkup}
      ${tagsMarkup ? `<ul class="card-tags">${tagsMarkup}</ul>` : ""}
      <div class="card-location">
        <span class="card-area">${entry.area}</span>
        <p class="card-address">${addressMarkup}</p>
      </div>
      <div class="pricing-row">
        <div>
          <p class="pricing-label">Pricing</p>
          <p class="pricing-text">${entry.pricing_text}</p>
        </div>
        <span class="status-pill">${entry.status}</span>
      </div>
      <div class="contact-list">${contactsMarkup}</div>
    `;
    grid.appendChild(card);
  });
}

function getContactsMarkup(contacts = {}) {
  return contactOrder
    .filter(({ key }) => contacts[key])
    .map(({ key, label, href }) => {
      const rawValue = contacts[key];
      const target = key === "email" || key === "phone" ? "" : " target=\"_blank\" rel=\"noopener\"";
      const safeUrl = href(rawValue).replace(/"/g, "%22");
      return `<a class="contact-pill" href="${safeUrl}"${target}>${label}</a>`;
    })
    .join("");
}

function updateCount(value) {
  if (!activeCount) return;
  activeCount.textContent = value;
}

async function init() {
  renderFilterChips();
  resetButton?.addEventListener("click", resetFilters);
  try {
    const response = await fetch("./data/stringers.json");
    if (!response.ok) {
      throw new Error("Stringer data failed to load");
    }
    stringers = await response.json();
  } catch (error) {
    console.error(error);
    if (grid) {
      grid.innerHTML = `<p class="footer-note" style="letter-spacing:0.2em;">Unable to load stringers.</p>`;
    }
    return;
  }
  applyFilters();
}

init();
