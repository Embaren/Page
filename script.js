
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const section = document.getElementById(sectionId) ?? document.getElementById('bio');
    section.classList.add('active');
}

function loadPublications(container) {
    fetch('resources/bib.bib')
        .then(response => response.text())
        .then(data => {
            const entries = data.split('@').filter(entry => entry.trim() !== '');

            entries.forEach(entry => {
                const lines = entry.split('\n').map(line=>line.trim());
                const type = lines[0].split('{')[0].trim();
                const citationKey = lines[0].split('{')[1].split(',')[0].trim();

                const title = lines.find(line => line.startsWith('title')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '');
                const author = lines.find(line => line.startsWith('author')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '');
                const year = lines.find(line => line.startsWith('year')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '');
                const journalOrBooktitle = lines.find(line => line.startsWith('journal') || line.includes('booktitle')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '');
                const pages = lines.find(line => line.startsWith('pages')) ? lines.find(line => line.includes('pages')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '') : '';
                const doi = lines.find(line => line.startsWith('doi')) ? lines.find(line => line.includes('doi')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '') : '';
                const abstract = lines.find(line => line.startsWith('abstract')) ? lines.find(line => line.includes('abstract')).split('=')[1].trim().replace(/[{}]/g, '') : '';
                const url = lines.find(line => line.startsWith('url')) ? lines.find(line => line.includes('url')).split('=')[1].trim().replace(/[{}]/g, '').replace(/,$/g, '') : '';

                const publicationItem = document.createElement('li');
                publicationItem.innerHTML =
                    `<a href="${doi ? `https://doi.org/${doi}` : url}" class="a-block darken-hover">
                    <h3>${title}</h3>
                    <p class="authors">${author}</p>
                    <details>
                        <summary>In ${journalOrBooktitle}, ${year}, pp. ${pages}. ${doi ? `DOI: ${doi}` : ''}</summary>
                        <p>${abstract}</p>
                    </details>
                    </a>
                `;
                container.appendChild(publicationItem);
            });
        })
        .catch(error => console.error('Error loading publications:', error));
}

function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-en], [data-fr]');
    elements.forEach(element => {
        element.innerHTML = element.getAttribute(`data-${language}`);
    });

    const dropdownButton = document.getElementById('language-button');
    const selectedOption = document.querySelector(`#language-dropdown a[onclick="changeLanguage('${language}')"]`);
    dropdownButton.innerHTML = selectedOption.innerHTML;

    document.getElementById('language-dropdown').style.display = 'none';
}

function toggleDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropdown-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
});

let darkMode = false;

function setDarkMode(bool){
    darkMode = bool;
    document.getElementById("dark-mode-toggle-icon").type = darkMode ? 'moon' : 'sun';
    if(bool){
        document.body.style.setProperty('--bg-body-color', '#000000');
        document.body.style.setProperty('--bg-content-color', '#222222');
        document.body.style.setProperty('--shadow-color', '#ffffff33');
        document.body.style.setProperty('--text-color', '#e6e6e6');
        document.body.style.setProperty('--title-color', '#c7daecff');
        document.body.style.setProperty('--emph-color', '#7e9cb9ff');
        document.body.style.setProperty('--highlight-bg-color', '#3c3d40ff');
        document.body.style.setProperty('--highlight-shadow-color', '#939aa933');
        document.body.style.setProperty('--hyperlink-color', '#92d3ffff');
    }
    else{
        document.body.style.setProperty('--bg-body-color', '#f5f5f5');
        document.body.style.setProperty('--bg-content-color', '#ffffff');
        document.body.style.setProperty('--shadow-color', '#00000033');
        document.body.style.setProperty('--text-color', '#333');
        document.body.style.setProperty('--title-color', '#2c3e50');
        document.body.style.setProperty('--emph-color', '#2c3e50');
        document.body.style.setProperty('--highlight-bg-color', '#ebeeff');
        document.body.style.setProperty('--highlight-shadow-color', '#4b6bff33');
        document.body.style.setProperty('--hyperlink-color', '#3498db');
    }
}

function toggleDarkMode(){
    setDarkMode(!darkMode);
}

HTMLCharacterSymbolElement.getSymbol('mail')