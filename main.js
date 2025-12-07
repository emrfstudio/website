document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('[data-nav]');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const header = document.querySelector('.site-header');

    const setYear = () => {
        const year = new Date().getFullYear().toString();
        document.querySelectorAll('[data-year], #year').forEach((node) => {
            node.textContent = year;
        });
    };

    const closeNav = () => {
        if (!nav || !navToggle) return;
        nav.dataset.open = 'false';
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    const toggleNav = () => {
        if (!nav || !navToggle) return;
        const isOpen = nav.dataset.open === 'true';
        nav.dataset.open = String(!isOpen);
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        document.body.classList.toggle('nav-open', !isOpen);
    };

    if (navToggle && nav) {
        navToggle.addEventListener('click', toggleNav);
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeNav);
        });
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && event.target !== navToggle && !navToggle.contains(event.target)) {
                closeNav();
            }
        });
    }

    if (header) {
        const handleScroll = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 10);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        link.addEventListener('click', (event) => {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeNav();
        });
    });

    setYear();
});
