(async () => {
  const countEl = document.getElementById("landing-count");
  if (!countEl) return;
  try {
    const response = await fetch("./data/stringers.json");
    if (!response.ok) throw new Error("failed to load");
    const data = await response.json();
    countEl.textContent = data.length.toString().padStart(2, "0");
  } catch (error) {
    console.error(error);
    countEl.textContent = "45"; // fallback assumption
  }
})();
