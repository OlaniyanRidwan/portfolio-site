// Load CSV from local files
async function loadCsvData(filename) {
    const response = await fetch(`assets/data/${filename}.csv`);
    if (!response.ok) throw new Error('Failed to fetch CSV');
    const csvText = await response.text();
    return Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
}

// Load Projects
async function loadProjects() {
    const data = await loadCsvData('projects');
    const container = document.getElementById('project-cards');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item['Image URL']}" alt="${item.Title}" style="width:100%; border-radius:5px; margin-bottom:1rem;">
            <h3>${item.Title}</h3>
            <p>${item.Description}</p>
            <p><strong>My Contribution:</strong> ${item['My Contribution']}</p>
            <div class="badges">${item['Tools Used'].split(',').map(tool => `<span>${tool.trim()}</span>`).join('')}</div>
            <a href="${item['Google Colab Link']}" class="btn primary" target="_blank">View Code (Colab)</a>
        `;
        container.appendChild(card);
    });
}

// Load Research
async function loadResearch() {
    const data = await loadCsvData('research');
    const container = document.getElementById('research-cards');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.Title}</h3>
            <p>${item.Description}</p>
            <p><strong>Keywords:</strong> ${item.Keywords}</p>
            <p><strong>My Contribution:</strong> ${item['My Contribution']}</p>
            <p><strong>Methodologies:</strong> ${item.Methodologies}</p>
            <p><strong>Tools Used:</strong> ${item['Tools Used']}</p>
        `;
        container.appendChild(card);
    });
}

// Load Blog Previews
async function loadBlogs() {
    const data = await loadCsvData('blogs');
    const container = document.getElementById('blog-cards');
    if (!container) return;
    container.innerHTML = '';
    data.slice(0, 3).forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item['Thumbnail Image URL']}" alt="${item.Title}" style="width:100%; border-radius:5px; margin-bottom:1rem;">
            <h3>${item.Title}</h3>
            <p>${item.Excerpt}</p>
            <a href="${item['Medium Link']}" class="btn primary" target="_blank">Read on Medium</a>
        `;
        container.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('project-cards')) loadProjects();
    if (document.getElementById('research-cards')) loadResearch();
    if (document.getElementById('blog-cards')) loadBlogs();
});