const currentUrl = window.location.pathname;

document.querySelectorAll('.nav-list a').forEach(link => {
    if (currentUrl.includes(link.getAttribute('href'))) {
        link.classList.add('active');
    }
});