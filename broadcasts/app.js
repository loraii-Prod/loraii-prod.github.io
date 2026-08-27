const list = document.querySelector("#archive-list");
const count = document.querySelector("#archive-count");
const total = document.querySelector("#total-count");
const controls = ["year", "mode", "engagement"].map(id => document.querySelector("#" + id));

function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function render() {
  const [year, mode, engagement] = controls.map(control => control.value);
  const filtered = broadcasts.filter(item =>
    (year === "all" || item.date.includes(year)) &&
    (mode === "all" || item.mode === mode) &&
    (engagement === "all" || item.engagement === engagement)
  );
  count.textContent = filtered.length;
  total.textContent = broadcasts.length + " documented broadcasts";
  list.innerHTML = filtered.map(item => `
    <article>
      <div><time>${esc(item.date)}</time><h2>${esc(item.event)}</h2><small>${esc(item.location)}</small></div>
      <div><b>${esc(item.organizer)}</b><span>${esc(item.engagement)}</span></div>
      <div><b>${esc(item.role)}</b><span>${esc(item.channel)}</span></div>
      <div><b>${esc(item.tools)}</b><span>${esc(item.mode)}</span></div>
    </article>`
  ).join("");
}

controls.forEach(control => control.addEventListener("change", render));
render();
