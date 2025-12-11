const DATA = [
    { title:'The Ultimate Google Ads Training Course', category:'Marketing', price:100, author:'Jerome Bell', img: './assets/img/Card_1.jpg' },
    { title:'Product Management Fundamentals', category:'Management', price:480, author:'Marvin McKinney', img: './assets/img/Card_2.jpg'},
    { title:'HR Management and Analytics', category:'HR & Recruiting', price:200, author:'Leslie Alexander Li', img: './assets/img/Card_3.jpg' },
    { title:'Brand Management & PR Communications', category:'Marketing', price:530, author:'Kristin Watson', img: './assets/img/Card_4.jpg' },
    { title:'Graphic Design Basic', category:'Design', price:500, author:'Guy Hawkins', img: './assets/img/Card_5.jpg' },
    { title:'Business Development Management', category:'Management', price:400, author:'Dianne Russell', img: './assets/img/Card_6.jpg' },
    { title:'Highload Software Architecture', category:'Development', price:600, author:'Brooklyn Simmons', img: './assets/img/Card_7.jpg'},
    { title:'Human Resources – Selection and Recruitment', category:'HR & Recruiting', price:150, author:'Kathryn Murphy', img: './assets/img/Card_8.jpg' },
    { title:'User Experience. Human-centered Design', category:'Design', price:240, author:'Cody Fisher', img: './assets/img/Card_9.jpg' }
]

const cards = document.getElementById("cards");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const count = document.getElementById("count");

let state = { query: "", active: "All" };

function getCounts() {
    const counts = {};

    DATA.forEach(item => {
        counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return { All: DATA.length, ...counts };
}

const renderFilters = () => {
    const cats = ["All", ...new Set(DATA.map(c => c.category))];
    const counts = getCounts();

    filters.innerHTML = cats
        .map(c => {
            const active = state.active === c ? "filter--active" : "";
            return `
                <button class="filter ${active}" data-cat="${c}">
                    ${c} <sup>${counts[c]}</sup>
                </button>
            `;
        })
        .join("");

    document.querySelectorAll(".filter").forEach(btn => {
        btn.onclick = () => {
            state.active = btn.dataset.cat;
            render();
        };
    });
};

function tagClass(cat) {
    if (cat.includes("Marketing")) return "tag--marketing";
    if (cat.includes("HR")) return "tag--hr";
    if (cat.includes("Management")) return "tag--management";
    if (cat.includes("Design")) return "tag--design";
    if (cat.includes("Development")) return "tag--dev";
    return "tag--default";
}

function renderCards() {
    let q = state.query.toLowerCase();

    let items = DATA.filter(c =>
        (state.active === "All" || c.category === state.active) &&
        (!q || c.title.toLowerCase().includes(q))
    );

    count.textContent = `${items.length} result(s)`;

    cards.innerHTML = items
        .map(
            c => `
        <article class="card">
            <div class="card__media" style="background-image:url('${c.img}')"></div>
            <div class="card__content">
                <span class="tag ${tagClass(c.category)}">${c.category}</span>
                <h3 class="card__title">${c.title}</h3>
                <p class="card__meta"><span class="price">$${c.price}</span> | by ${c.author}</p>
            </div>
        </article>
    `
        )
        .join("");
}

search.oninput = e => {
    state.query = e.target.value;
    render();
};

function render() {
    renderFilters();
    renderCards();
}

render();
