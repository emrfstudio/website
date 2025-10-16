'use strict';

const showcaseVideos = [
    {
        title: 'Dr. Noha - AI بالكامل',
        description: 'المشاهد مصنوعه بالكامل بالذكاء الاصطناعى ما عدا التأثيرات البصريه.',
        youtubeId: '4A7QFUq53sI'
    },
    {
        title: 'Dr. Menan Samy - عيادات التجميل',
        description: 'مشاهد بالذكاء الاصطناعى مدموجه ب مونتاج خفيف.',
        youtubeId: 'ZHq2M-SLg_I'
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
    setupHeroSection();
    renderVideoGallery();
    observeRevealElements();
    setupAudioToggle();
    setupInteractiveEffects();
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

function setupHeroSection() {
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
        return;
    }

    const canvas = hero.querySelector('[data-sequence-target]');
    const fallback = hero.querySelector('[data-sequence-fallback]');
    const sequence = initialiseImageSequence(canvas, fallback);

    let metrics = computeMetrics(hero);
    let ticking = false;

    const update = () => {
        ticking = false;
        const progressRaw = (window.scrollY - metrics.start) / metrics.range;
        const progress = clamp(progressRaw, 0, 1);
        hero.style.setProperty('--hero-progress', progress.toFixed(4));

        if (sequence && sequence.ready) {
            const index = Math.min(sequence.totalFrames - 1, Math.round(progress * (sequence.totalFrames - 1)));
            sequence.draw(index);
        }
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    };

    const onResize = () => {
        metrics = computeMetrics(hero);
        if (sequence) {
            sequence.resize();
        }
        update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();
}

function computeMetrics(element) {
    const start = element.offsetTop;
    const range = Math.max(element.offsetHeight - window.innerHeight, 1);
    return { start, range };
}

function initialiseImageSequence(canvas, fallbackImage) {
    if (!canvas) {
        return null;
    }

    const totalFrames = parseInt(canvas.dataset.sequenceFrames ?? '0', 10);
    const prefix = canvas.dataset.sequencePrefix ?? '';
    if (!totalFrames || !prefix) {
        return null;
    }

    const extension = canvas.dataset.sequenceExt ?? '.jpg';
    const pad = parseInt(canvas.dataset.sequencePad ?? '3', 10);

    const context = canvas.getContext('2d');
    const frames = new Array(totalFrames);
    let currentFrameIndex = null;
    let loadedCount = 0;
    let successCount = 0;
    let ready = false;

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.max(rect.width * ratio, 1);
        canvas.height = Math.max(rect.height * ratio, 1);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(ratio, ratio);
        if (currentFrameIndex !== null) {
            draw(currentFrameIndex);
        }
    };

    const draw = (index) => {
        currentFrameIndex = index;
        const image = frames[index];
        if (!image) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        context.clearRect(0, 0, width, height);
        const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
        const drawWidth = image.naturalWidth * scale;
        const drawHeight = image.naturalHeight * scale;
        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const frameName = (index) => {
        const frameNumber = String(index + 1).padStart(pad, '0');
        return `${prefix}${frameNumber}${extension}`;
    };

    const checkCompletion = () => {
        if (loadedCount === totalFrames && successCount === 0 && fallbackImage) {
            fallbackImage.classList.remove('is-hidden');
        }
    };

    for (let i = 0; i < totalFrames; i += 1) {
        const img = new Image();
        img.decoding = 'async';
        img.src = frameName(i);
        img.onload = () => {
            frames[i] = img;
            successCount += 1;
            loadedCount += 1;
            if (fallbackImage && !fallbackImage.classList.contains('is-hidden')) {
                fallbackImage.classList.add('is-hidden');
            }
            if (!ready) {
                ready = true;
                resize();
                draw(i);
            } else if (currentFrameIndex === i) {
                draw(i);
            }
            checkCompletion();
        };
        img.onerror = () => {
            frames[i] = null;
            loadedCount += 1;
            checkCompletion();
        };
    }

    resize();

    return {
        get ready() {
            return ready;
        },
        totalFrames,
        draw,
        resize
    };
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

    requestAnimationFrame(() => observeRevealElements());
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

function observeRevealElements() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) {
        return;
    }

    const applyInstantly = () => {
        elements.forEach((el) => {
            const delay = el.dataset.revealDelay ?? '0s';
            el.style.setProperty('--reveal-delay', delay);
            el.classList.add('is-visible');
        });
    };

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        applyInstantly();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    elements.forEach((el) => {
        const delay = el.dataset.revealDelay ?? '0s';
        el.style.setProperty('--reveal-delay', delay);
        observer.observe(el);
    });
}

function setupAudioToggle() {
    const audio = document.querySelector('[data-hero-audio]');
    const control = document.querySelector('[data-audio-control]');
    if (!audio || !control) {
        return;
    }

    const toggleButton = control.querySelector('.audio-toggle');
    const label = control.querySelector('.audio-toggle__label');
    let isPlaying = false;

    const updateLabel = () => {
        label.textContent = isPlaying ? 'Music: ON' : 'Music: Off';
        toggleButton.setAttribute('aria-pressed', String(isPlaying));
    };

    const play = async () => {
        try {
            await audio.play();
            isPlaying = true;
            updateLabel();
        } catch (error) {
            isPlaying = false;
            updateLabel();
        }
    };

    const pause = () => {
        audio.pause();
        isPlaying = false;
        updateLabel();
    };

    toggleButton.addEventListener('click', () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        updateLabel();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pause();
        }
    });

    updateLabel();
}

function setupInteractiveEffects() {
    const root = document.documentElement;
    const lens = document.querySelector('[data-cursor-lens]');
    if (!lens || window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let rafId = null;
    const state = {
        pointerShift: 0,
        pointerScale: 0,
        scrollScale: 0
    };

    const apply = () => {
        rafId = null;
        lens.classList.add('is-visible');
        lens.style.left = `${pointerX}px`;
        lens.style.top = `${pointerY}px`;

        const ratioY = pointerY / window.innerHeight - 0.5;
        state.pointerShift = ratioY * 40;
        state.pointerScale = Math.min(0.04, Math.abs(ratioY) * 0.08);

        root.style.setProperty('--bg-shift', `${state.pointerShift.toFixed(2)}px`);
        root.style.setProperty('--bg-scale', (state.pointerScale + state.scrollScale).toFixed(4));
    };

    const schedule = () => {
        if (!rafId) {
            rafId = requestAnimationFrame(apply);
        }
    };

    window.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        schedule();
    });

    window.addEventListener('pointerleave', () => {
        lens.classList.remove('is-visible');
        state.pointerShift = 0;
        state.pointerScale = 0;
        root.style.setProperty('--bg-shift', '0px');
        root.style.setProperty('--bg-scale', state.scrollScale.toFixed(4));
    });

    const updateScroll = () => {
        const docHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        state.scrollScale = Math.min(0.08, (window.scrollY / docHeight) * 0.08);
        root.style.setProperty('--bg-scale', (state.pointerScale + state.scrollScale).toFixed(4));
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', () => {
        pointerX = Math.min(pointerX, window.innerWidth);
        pointerY = Math.min(pointerY, window.innerHeight);
        updateScroll();
    });

    updateScroll();
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













