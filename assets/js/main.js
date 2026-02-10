// Google Sheets CSV URLs (replace with your published links for deployment)
const projectsCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRF_K9-AThakqgX8H6DuAIZLTLyoPfCGghy5A5swgc-mQCxMCR3KJmHk1Vb2I_aKDd-j9dgkgo0fcLm/pub?gid=0&single=true&output=csv';
const researchCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRF_K9-AThakqgX8H6DuAIZLTLyoPfCGghy5A5swgc-mQCxMCR3KJmHk1Vb2I_aKDd-j9dgkgo0fcLm/pub?gid=907349678&single=true&output=csv';
const blogsCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRF_K9-AThakqgX8H6DuAIZLTLyoPfCGghy5A5swgc-mQCxMCR3KJmHk1Vb2I_aKDd-j9dgkgo0fcLm/pub?gid=1862247865&single=true&output=csv';

// Check if running locally (disable fetches to avoid CORS)
const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';


// Function to load and parse CSV (or use mock data locally)
async function loadCsvData(url) {
    if (isLocal) return []; // Skip fetch locally
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch CSV');
        const csvText = await response.text();
        return Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
    } catch (error) {
        console.error('Error loading CSV:', error);
        return [];
    }
}

// Load Projects
async function loadProjects() {
    const data = isLocal ? mockProjects : await loadCsvData(projectsCsvUrl);
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
    const data = isLocal ? mockResearch : await loadCsvData(researchCsvUrl);
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

// Load Blog Previews (for Home page)
async function loadBlogs() {
    const data = isLocal ? mockBlogs : await loadCsvData(blogsCsvUrl);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('project-cards')) loadProjects();
    if (document.getElementById('research-cards')) loadResearch();
    if (document.getElementById('blog-cards')) loadBlogs();
});