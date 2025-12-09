const listEl = document.querySelector("#cards");
const filtersEl = document.querySelector("#filters");
const searchEl = document.querySelector("#search");

let active = "All";

function renderFilters() {
    const categories = ["All", ...new Set(COURSES.map(c=>c.category))];

    filtersEl.innerHTML = categories.map(c =>
        `<button data-cat="${c}" class="filter ${c===active?"active":""}">${c}</button>`
    ).join("");

    [...filtersEl.children].forEach(btn =>
        btn.addEventListener("click", () => { active=btn.dataset.cat; render(); })
    );
}

function render() {
    const query = searchEl.value.toLowerCase();

    const courses = COURSES.filter(c =>
        (active==="All" || c.category===active) &&
        c.title.toLowerCase().includes(query)
    );

    listEl.innerHTML = courses.map(c => `
    <article class="card">
      <img src="${c.img}" class="card__img">
      <span class="card__tag">${c.category}</span>
      <h3 class="card__title">${c.title}</h3>
      <p class="card__price">$${c.price} | by ${c.author}</p>
    </article>
  `).join("");
}

searchEl.addEventListener("input", render);

renderFilters();
render();
