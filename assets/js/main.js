'use strict';

const showcaseVideos = [
    {
        title: 'فيديو مدرس',
        description: 'فيديو قصير لمدرس يشرح بطريقة بسيطة وحضور واضح.',
        youtubeId: 's55hCdpmZSQ',
        category: 'education',
        tags: ['teacher', 'education', 'course']
    },
    {
        title: 'ريل مدرس',
        description: 'ريل لمدرس يعلن مواعيد الدروس للطلاب بشكل واضح.',
        youtubeId: 'm7pJqbCQ7CM',
        category: 'education',
        tags: ['teacher', 'education', 'reel']
    },
    {
        title: 'فيديو انيميشن',
        description: 'فيديو انيميشن من صُنعى بالكامل يظهر استمرارية الشخصيات وكل أساليب وستايلات الجرافيك.',
        youtubeId: 'KgHGTdvQ59Q',
        category: 'cinematic',
        tags: ['animation', 'characters', 'graphics']
    },
    {
        title: 'ريل شركة عقارات',
        description: 'ريل لشركة عقارات يبرز اللقطات السريعة للمشروع والعلامة.',
        youtubeId: 'B_uKtq_-Cs0',
        category: 'cinematic',
        tags: ['real estate', 'property', 'reel']
    },
    {
        title: 'ريل تبييض الأسنان',
        description: 'جزء بسيط من فيديو لدكتور بيتكلم عن تبييض الأسنان .',
        youtubeId: 'LL5_I8knbtU',
        category: 'medical',
        tags: ['dental', 'whitening', 'reel']
    },
    {
        title: 'ريل مؤسسة عربيات',
        description: 'ريل سريع لمؤسسة عربيات يبرز الهوية والحركة.',
        youtubeId: 'b02eac8Gjpc',
        category: 'cinematic',
        tags: ['arabyat', 'foundation', 'reel']
    },
    {
        title: 'إعلان مشروب True Blood',
        description: 'إعلان قصير لمشروب True Blood بستايل سينمائي وحركة سريعة لشد الانتباه.',
        youtubeId: 'FEX6s_6WlTk',
        category: 'cinematic',
        tags: ['true blood', 'drink', 'ad']
    },
    {
        title: 'Dr. Noha - AI بالكامل',
        description: 'المشاهد مصنوعه بالكامل بالذكاء الاصطناعى ما عدا التأثيرات البصريه.',
        youtubeId: '4A7QFUq53sI'
    },
    {
        title: 'Dr. Menan Samy - عيادات التجميل',
        description: 'مشاهد بالذكاء الاصطناعى مدموجه ب مونتاج خفيف.',
        youtubeId: 'ZHq2M-SLg_I'
    },
    {
        title: 'Model Speedramp - Fashion Reel AI',
        description: 'ريلز موضة سريع يبرز تفاصيل الستايل والحركة للقطاع التجارى فى الملابس.',
        youtubeId: 'SyyjKZ8laAU',
        category: 'fashion',
        tags: ['fashion', 'model', 'speedramp']
    },
    {
        title: 'Adel Emam Model - Fashion Concept',
        description: 'تصميم فيديو قصير يقدم موديل مستوحى من شخصية كلاسيكية بلمسة موضة حديثة.',
        youtubeId: 'BQdqcOITg8Q',
        category: 'fashion',
        tags: ['fashion', 'model', 'concept']
    },
    {
        title: 'Dentist Ad - Smile Makeover',
        description: 'إعلان قصير لتجميل الأسنان يبرز التحول قبل/بعد ويعزز ثقة العيادة.',
        youtubeId: 'Qqipc_pW-h0',
        category: 'medical',
        tags: ['dental', 'smile', 'medical', 'ads']
    }
];

const VIDEO_CATEGORY_RULES = [
    {
        key: 'medical',
        label: 'القطاع الطبي',
        matches: (text) =>
            /\bdr\b/.test(text) ||
            text.includes('doctor') ||
            text.includes('عيادة') ||
            text.includes('طبي') ||
            text.includes('دكتور') ||
            text.includes('دكتورة') ||
            text.includes('علاج') ||
            text.includes('جلدية') ||
            text.includes('اسنان') ||
            text.includes('أسنان')
    },
    {
        key: 'fashion',
        label: 'قطاع الموضة والملابس',
        matches: (text) =>
            text.includes('fashion') ||
            text.includes('ملابس') ||
            text.includes('موضة') ||
            text.includes('أزياء') ||
            text.includes('ازياء') ||
            text.includes('ستايل') ||
            text.includes('style') ||
            text.includes('outfit')
    },
    {
        key: 'cinematic',
        label: 'قطاع الأفلام والإعلانات السينمائية',
        matches: (text) =>
            text.includes('film') ||
            text.includes('فيلم') ||
            text.includes('سينمائي') ||
            text.includes('cinematic') ||
            text.includes('اعلان') ||
            text.includes('إعلان') ||
            text.includes('برومو') ||
            text.includes('promo') ||
            text.includes('commercial') ||
            text.includes('كليب') ||
            text.includes('clip') ||
            text.includes('music video')
    },
    {
        key: 'education',
        label: 'قطاع المدرّسين والدورات التعليمية',
        matches: (text) =>
            text.includes('teacher') ||
            text.includes('teachers') ||
            text.includes('course') ||
            text.includes('courses') ||
            text.includes('مدرس') ||
            text.includes('مدرّس') ||
            text.includes('تعليم') ||
            text.includes('تعليمي') ||
            text.includes('دورة') ||
            text.includes('دورات')
    }
];

const FALLBACK_VIDEO_CATEGORY = {
    key: 'other',
    label: 'مشاريع متنوعة'
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setCurrentYear();
    renderVideoGallery();
});

function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.site-nav ul');

    if (!navToggle || !navList) {
        return;
    }

    const closeMenu = () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.dataset.open = 'false';
    };

    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navList.dataset.open = String(!isExpanded);
    };

    navToggle.addEventListener('click', toggleMenu);

    navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target) {
            return;
        }
        if (navList.dataset.open !== 'true') {
            return;
        }
        if (!navList.contains(target) && target !== navToggle && !navToggle.contains(target)) {
            closeMenu();
        }
    });

    observeSections(navList);
}

function setCurrentYear() {
    const nodes = document.querySelectorAll('[data-js="year"]');
    if (!nodes.length) {
        return;
    }
    const now = new Date().getFullYear().toString();
    nodes.forEach((node) => {
        node.textContent = now;
    });
}

function normaliseTextForSearch(input) {
    if (input == null) {
        return '';
    }
    return input
        .toString()
        .toLowerCase()
        .replace(/[\u064b-\u0652]/g, '')
        .replace(/[.,/#!$%?\^&*;:{}=\-_`~()\[\]|<>\"'،؛]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function buildVideoSearchText(item) {
    const parts = [item.title, item.description];
    if (Array.isArray(item.tags)) {
        parts.push(item.tags.join(' '));
    }
    if (item.category) {
        parts.push(item.category);
    }
    return normaliseTextForSearch(parts.filter(Boolean).join(' '));
}

function detectVideoCategory(item) {
    if (item.category) {
        const explicit = VIDEO_CATEGORY_RULES.find((rule) => rule.key === item.category);
        if (explicit) {
            return explicit.key;
        }
        if (item.category === FALLBACK_VIDEO_CATEGORY.key) {
            return FALLBACK_VIDEO_CATEGORY.key;
        }
    }

    const text = buildVideoSearchText(item);

    for (const rule of VIDEO_CATEGORY_RULES) {
        if (rule.matches(text, item)) {
            return rule.key;
        }
    }

    return FALLBACK_VIDEO_CATEGORY.key;
}

function getVideoCategoryLabel(key) {
    if (key === FALLBACK_VIDEO_CATEGORY.key) {
        return FALLBACK_VIDEO_CATEGORY.label;
    }
    const rule = VIDEO_CATEGORY_RULES.find((entry) => entry.key === key);
    return rule ? rule.label : FALLBACK_VIDEO_CATEGORY.label;
}

function renderVideoGallery() {
    const gallery = document.querySelector('[data-video-gallery]');
    if (!gallery) {
        return;
    }

    gallery.innerHTML = '';

    if (!Array.isArray(showcaseVideos) || !showcaseVideos.length) {
        const emptyState = document.createElement('p');
        emptyState.textContent = 'أضِف أعمال الفيديو إلى القائمة داخل main.js ليظهر المعرض هنا.';
        emptyState.setAttribute('data-reveal', '');
        gallery.appendChild(emptyState);
        return;
    }

    const groups = new Map();

    showcaseVideos.forEach((item) => {
        const categoryKey = detectVideoCategory(item);
        const label = getVideoCategoryLabel(categoryKey);
        if (!groups.has(categoryKey)) {
            groups.set(categoryKey, {
                key: categoryKey,
                label,
                items: []
            });
        }
        groups.get(categoryKey).items.push(item);
    });

    const orderedKeys = [...VIDEO_CATEGORY_RULES.map((rule) => rule.key), FALLBACK_VIDEO_CATEGORY.key];

    const orderedGroups = orderedKeys
        .map((key) => groups.get(key))
        .filter(Boolean)
        .filter((group) => group.items.length);

    if (!orderedGroups.length) {
        const emptyState = document.createElement('p');
        emptyState.textContent = 'أضِف أعمال الفيديو إلى القائمة داخل main.js ليظهر المعرض هنا.';
        emptyState.setAttribute('data-reveal', '');
        gallery.appendChild(emptyState);
        return;
    }

    orderedGroups.forEach((group, groupIndex) => {
        const section = document.createElement('section');
        section.className = 'media-group';
        section.setAttribute('data-reveal', '');
        const groupDelay = (0.05 + groupIndex * 0.15).toFixed(2);
        section.dataset.revealDelay = `${groupDelay}s`;

        const heading = document.createElement('h3');
        heading.className = 'media-group__title';
        heading.textContent = group.label;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        group.items.forEach((item, itemIndex) => {
            const card = createMediaCard(item, itemIndex);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        gallery.appendChild(section);
    });
}

function createMediaCard(item, delayIndex = 0) {
    const card = document.createElement('article');
    card.className = 'media-card';
    card.setAttribute('data-reveal', '');
    const delay = (0.05 + delayIndex * 0.12).toFixed(2);
    card.dataset.revealDelay = `${delay}s`;

    const media = createMediaElement(item);
    if (media) {
        card.appendChild(media);
    }

    const meta = document.createElement('div');
    meta.className = 'media-card__meta';

    if (item.title) {
        const title = document.createElement('h3');
        title.className = 'media-card__title';
        title.textContent = item.title;
        meta.appendChild(title);
    }

    if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'media-card__desc';
        desc.textContent = item.description;
        meta.appendChild(desc);
    }

    if (meta.children.length) {
        card.appendChild(meta);
    }

    return card;
}

function createMediaElement(item) {
    if (item.youtubeId) {
        const frame = document.createElement('div');
        frame.className = 'media-card__frame';

        const iframe = document.createElement('iframe');
        iframe.className = 'media-card__embed';
        iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&playsinline=1`;
        iframe.title = item.title ?? 'YouTube video';
        iframe.loading = 'lazy';
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;

        frame.appendChild(iframe);
        return frame;
    }

    if (!item.src) {
        return null;
    }

    const video = document.createElement('video');
    video.className = 'media-card__video';
    video.controls = true;
    video.preload = 'metadata';
    if (item.poster) {
        video.poster = item.poster;
    }

    const source = document.createElement('source');
    source.src = item.src;
    source.type = deriveMimeType(item.src);
    video.appendChild(source);

    const fallback = document.createElement('p');
    fallback.textContent = '?????? ?? ???? ????? ???????.';
    video.appendChild(fallback);

    return video;
}

function deriveMimeType(path) {
    const extension = path.split('.').pop()?.toLowerCase();
    if (extension === 'webm') {
        return 'video/webm';
    }
    if (extension === 'ogg' || extension === 'ogv') {
        return 'video/ogg';
    }
    return 'video/mp4';
}

function observeSections(navList) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        return;
    }

    const links = Array.from(navList.querySelectorAll('a[href^="#"]'));
    if (!links.length) {
        return;
    }

    const sections = links
        .map((link) => {
            const id = link.getAttribute('href')?.slice(1);
            if (!id) {
                return null;
            }
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    const clearAria = () => {
        links.forEach((link) => link.removeAttribute('aria-current'));
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visible.length) {
                return;
            }

            const topEntry = visible[0];
            const id = topEntry.target.id;
            const activeLink = links.find((link) => link.getAttribute('href') === `#${id}`);
            if (!activeLink) {
                return;
            }
            clearAria();
            activeLink.setAttribute('aria-current', 'page');
        },
        {
            rootMargin: '-45% 0px -45% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        }
    );

    sections.forEach((section) => observer.observe(section));
}

















