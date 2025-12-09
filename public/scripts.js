const DATA = [
    { title:'The Ultimate Google Ads Training Course', category:'Marketing', price:100, author:'Jerome Bell', img:'https://picsum.photos/600/400?1' },
    { title:'Product Management Fundamentals', category:'Management', price:480, author:'Marvin McKinney', img:'https://picsum.photos/600/400?2' },
    { title:'HR Management and Analytics', category:'HR & Recruiting', price:200, author:'Leslie Alexander Li', img:'https://picsum.photos/600/400?3' },
    { title:'Brand Management & PR Communications', category:'Marketing', price:530, author:'Kristin Watson', img:'https://picsum.photos/600/400?4' },
    { title:'Graphic Design Basic', category:'Design', price:500, author:'Guy Hawkins', img:'https://picsum.photos/600/400?5' },
    { title:'Business Development Management', category:'Management', price:400, author:'Dianne Russell', img:'https://picsum.photos/600/400?6' },
    { title:'Highload Software Architecture', category:'Development', price:600, author:'Brooklyn Simmons', img:'https://picsum.photos/600/400?7' },
    { title:'Human Resources – Selection and Recruitment', category:'HR & Recruiting', price:150, author:'Kathryn Murphy', img:'https://picsum.photos/600/400?8' },
    { title:'User Experience. Human-centered Design', category:'Design', price:240, author:'Cody Fisher', img:'https://picsum.photos/600/400?9' }
]

const cards = document.getElementById("cards");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const count = document.getElementById("count");

let state = { query:"", active:"All" };

const renderFilters = () => {
    const cats = ["All", ...new Set(DATA.map(c=>c.category))];
    filters.innerHTML = cats.map(c =>
        `<button class="filter ${state.active===c?'filter--active':''}" data-cat="${c}">${c}</button>`
    ).join("");

    document.querySelectorAll(".filter").forEach(btn => {
        btn.onclick = () => { state.active = btn.dataset.cat; render(); };
    });
}

function renderCards(){
    let q = state.query.toLowerCase();
    let items = DATA.filter(c =>
        (state.active==="All" || c.category===state.active) &&
        (!q || c.title.toLowerCase().includes(q))
    );
    count.textContent = `${items.length} result(s)`;

    cards.innerHTML = items.map(c => `
    <article class="card">
      <div class="card__media" style="background-image:url('${c.img}')"></div>
      <div class="card__content">
        <span class="tag ${tagClass(c.category)}">${c.category}</span>
        <h3 class="card__title">${c.title}</h3>
        <p class="card__meta"><span class="price">$${c.price}</span> | by ${c.author}</p>
      </div>
    </article>
  `).join("");
}

function tagClass(cat){
    if(cat.includes('Marketing')) return 'tag--marketing';
    if(cat.includes('HR')) return 'tag--hr';
    if(cat.includes('Management')) return 'tag--management';
    if(cat.includes('Design')) return 'tag--marketing';
    return 'tag--management';
}

search.oninput = e => { state.query = e.target.value; render(); };

function render(){ renderFilters(); renderCards(); }
render();
