'use strict';

const showcaseVideos = [
    {
        title: 'Dentist Ad - Smile Makeover',
        description: 'Short dental spot showing before/after to build trust.',
        youtubeId: 'Qqipc_pW-h0',
        category: 'medical',
        tags: ['dental', 'medical']
    },
    {
        title: 'Clinics Promo - Dr. Menan Samy',
        description: 'AI-assisted shots with light editing and skin cleanup.',
        youtubeId: 'ZHq2M-SLg_I',
        category: 'medical',
        tags: ['beauty', 'clinic']
    },
    {
        title: 'Dr. Noha - Full AI',
        description: 'Fully AI-crafted scenes with quick VFX touches.',
        youtubeId: '4A7QFUq53sI',
        category: 'cinematic',
        tags: ['ai', 'cinematic']
    }
];

const VIDEO_CATEGORY_RULES = [
    { key: 'medical', label: 'طبي', matches: (t) => t.includes('dental') || t.includes('clinic') || t.includes('dr') },
    { key: 'cinematic', label: 'سينمائي', matches: (t) => t.includes('cine') || t.includes('film') || t.includes('ai') },
    { key: 'fashion', label: 'موضة', matches: (t) => t.includes('fashion') || t.includes('model') }
];

const FALLBACK_VIDEO_CATEGORY = { key: 'other', label: 'متنوع' };

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setCurrentYear();
    renderVideoGallery();
});

function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.site-nav ul');
    if (!navToggle || !navList) return;

    const closeMenu = () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.dataset.open = 'false';
    };

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navList.dataset.open = String(!isExpanded);
    });

    navList.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (event) => {
        if (navList.dataset.open !== 'true') return;
        if (!navList.contains(event.target) && event.target !== navToggle && !navToggle.contains(event.target)) {
            closeMenu();
        }
    });
}

function setCurrentYear() {
    document.querySelectorAll('[data-js="year"]').forEach((node) => {
        node.textContent = new Date().getFullYear().toString();
    });
}

function renderVideoGallery() {
    const gallery = document.querySelector('[data-video-gallery]');
    if (!gallery) return;
    gallery.innerHTML = '';

    const groups = groupVideos(showcaseVideos);
    if (!groups.length) {
        const empty = document.createElement('p');
        empty.textContent = 'لا توجد فيديوهات لعرضها الآن.';
        gallery.appendChild(empty);
        return;
    }

    groups.forEach((group, groupIndex) => {
        const section = document.createElement('section');
        section.className = 'media-group';
        section.setAttribute('data-reveal', '');
        section.dataset.revealDelay = `${(0.05 + groupIndex * 0.15).toFixed(2)}s`;

        const heading = document.createElement('h3');
        heading.className = 'media-group__title';
        heading.textContent = group.label;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        group.items.forEach((item, itemIndex) => {
            grid.appendChild(createMediaCard(item, itemIndex));
        });

        section.appendChild(grid);
        gallery.appendChild(section);
    });
}

function groupVideos(list) {
    const groups = new Map();
    list.forEach((item) => {
        const key = detectVideoCategory(item);
        const label = getVideoCategoryLabel(key);
        if (!groups.has(key)) {
            groups.set(key, { key, label, items: [] });
        }
        groups.get(key).items.push(item);
    });
    const desiredOrder = [...VIDEO_CATEGORY_RULES.map((r) => r.key), FALLBACK_VIDEO_CATEGORY.key];
    return desiredOrder
        .map((key) => groups.get(key))
        .filter(Boolean)
        .filter((g) => g.items.length);
}

function detectVideoCategory(item) {
    const text = normaliseText([item.title, item.description, ...(item.tags || [])].join(' '));
    const match = VIDEO_CATEGORY_RULES.find((rule) => rule.matches(text));
    return match ? match.key : FALLBACK_VIDEO_CATEGORY.key;
}

function normaliseText(input) {
    return input.toString().toLowerCase().replace(/\s+/g, ' ');
}

function getVideoCategoryLabel(key) {
    if (key === FALLBACK_VIDEO_CATEGORY.key) return FALLBACK_VIDEO_CATEGORY.label;
    const rule = VIDEO_CATEGORY_RULES.find((r) => r.key === key);
    return rule ? rule.label : FALLBACK_VIDEO_CATEGORY.label;
}

function createMediaCard(item, delayIndex = 0) {
    const card = document.createElement('article');
    card.className = 'media-card';
    card.setAttribute('data-reveal', '');
    card.dataset.revealDelay = `${(0.05 + delayIndex * 0.12).toFixed(2)}s`;

    const media = createYoutubePlaceholder(item);
    if (media) card.appendChild(media);

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

    if (meta.children.length) card.appendChild(meta);
    return card;
}

function createYoutubePlaceholder(item) {
    const frame = document.createElement('div');
    frame.className = 'media-card__frame';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'media-card__placeholder';

    const label = item.title ? `تشغيل الفيديو ${item.title}` : 'تشغيل الفيديو';
    trigger.setAttribute('aria-label', label);

    const thumb = document.createElement('img');
    thumb.className = 'media-card__thumb';
    thumb.loading = 'lazy';
    thumb.decoding = 'async';
    thumb.alt = item.title ? `معاينة فيديو ${item.title}` : 'معاينة فيديو';
    const maxThumb = getYoutubeThumbnailUrl(item.youtubeId, 'max');
    const hqThumb = getYoutubeThumbnailUrl(item.youtubeId, 'hq');
    thumb.src = maxThumb;
    thumb.srcset = `${maxThumb} 1280w, ${hqThumb} 480w`;
    thumb.sizes = '(max-width: 900px) 82vw, 360px';
    thumb.referrerPolicy = 'no-referrer';
    thumb.addEventListener('error', () => {
        thumb.src = hqThumb;
        thumb.removeAttribute('srcset');
        thumb.removeAttribute('sizes');
    });
    trigger.appendChild(thumb);

    const play = document.createElement('span');
    play.className = 'media-card__play';
    play.setAttribute('aria-hidden', 'true');
    trigger.appendChild(play);

    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';
    srOnly.textContent = label;
    trigger.appendChild(srOnly);

    trigger.addEventListener('click', () => {
        const iframe = createYoutubeIframe(item, true);
        frame.replaceChildren(iframe);
        iframe.focus();
    });

    frame.appendChild(trigger);
    return frame;
}

function createYoutubeIframe(item, autoplay = false) {
    const iframe = document.createElement('iframe');
    iframe.className = 'media-card__embed';
    const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '0'
    });
    if (autoplay) {
        params.set('autoplay', '1');
        iframe.loading = 'eager';
    } else {
        iframe.loading = 'lazy';
    }
    iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?${params.toString()}`;
    iframe.title = item.title ?? 'YouTube video';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    return iframe;
}

function getYoutubeThumbnailUrl(id, quality = 'max') {
    const base = `https://i.ytimg.com/vi/${id}`;
    if (quality === 'max') return `${base}/maxresdefault.jpg`;
    if (quality === 'sd') return `${base}/sddefault.jpg`;
    return `${base}/hqdefault.jpg`;
}
