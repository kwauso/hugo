document.addEventListener('DOMContentLoaded', function() {
    // Toggle sub-menus
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parent = this.parentElement;
            const subMenu = parent.querySelector('.sub-menu');
            parent.classList.toggle('active');
            if (subMenu) {
                subMenu.classList.toggle('active');
            }
        });
    });

    // Expand current page's menu
    const currentPageMenu = document.querySelector('.menu li.active');
    if (currentPageMenu) {
        const parents = getParents(currentPageMenu, '.menu-item-has-children');
        parents.forEach(parent => {
            parent.classList.add('active');
            const subMenu = parent.querySelector('.sub-menu');
            if (subMenu) {
                subMenu.classList.add('active');
            }
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const lightModeToggle = document.querySelector('.light-mode-toggle');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    });

    lightModeToggle.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    });

    // Simple search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm.length > 2) {
                window.location.href = `/search/?q=${encodeURIComponent(searchTerm)}`;
            }
        }
    });
});

// Helper function to get all parents matching a selector
function getParents(elem, selector) {
    const parents = [];
    while (elem && elem !== document) {
        if (elem.matches(selector)) {
            parents.push(elem);
        }
        elem = elem.parentNode;
    }
    return parents;
}