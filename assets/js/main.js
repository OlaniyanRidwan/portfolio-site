// Utility to truncate text to ~150-200 words
function truncateText(text, maxWords = 150) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}

// Load CSV from local files
async function loadCsvData(filename) {
    const response = await fetch(`assets/data/${filename}.csv`);
    if (!response.ok) throw new Error('Failed to fetch CSV');
    const csvText = await response.text();
    return Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
}

// Load Projects with Flip Effect
async function loadProjects() {
    const data = await loadCsvData('projects');
    const container = document.getElementById('project-cards');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-card-inner">
                <div class="project-card-front">
                    <img src="${item['Image URL']}" alt="${item.Title}">
                    <h3>${item.Title}</h3>
                </div>
                <div class="project-card-back">
                    <h3>${item.Title}</h3>
                    <p>${truncateText(item.Description)}</p>
                    <p><strong>My Contribution:</strong> ${item['My Contribution']}</p>
                    <div class="tools-badges">${item['Tools Used'].split(',').map(tool => `<span>${tool.trim()}</span>`).join('')}</div>
                    <a href="${item['Google Colab Link']}" class="btn primary" target="_blank">View Code (Colab)</a>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
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
        card.className = 'research-card';
        card.innerHTML = `
            <h3>${item.Title}</h3>
            <p>${item.Description}</p>
            <div class="research-keywords">${item.Keywords.split(',').map(keyword => `<span>${keyword.trim()}</span>`).join('')}</div>
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