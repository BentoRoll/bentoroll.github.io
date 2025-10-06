// navbar.js

document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.getElementById('logo-container');

    if (!logoContainer) return; // safety check

    logoContainer.addEventListener('click', () => {
        // Only redirect if not already on home (index.html)
        const currentPath = window.location.pathname;
        const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '';

        if (!isHome) {
            window.location.href = 'index.html';
        }
    });
});
