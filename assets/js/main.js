'use strict';

const showcaseVideos = [
    {
        title: 'إعلان مطعم - ستايل كرييتف',
        description: 'إعلان مطعم سريع وممتع بإيقاع بصري يجذب الانتباه ويبرز تجربة الأكل.',
        youtubeId: 'v9BjJFTXLkQ',
        category: 'cinematic',
        tags: ['restaurant', 'food', 'ad', 'creative', 'reel']
    },
    {
        title: 'إعلان مطعم - طريقة مختلفة وذكية',
        description: 'إعلان مطعم قصير بأسلوب مختلف وذكي يبرز الفكرة والإيقاع البصري بشكل جذاب.',
        youtubeId: '1dQtYD8WBvI',
        category: 'cinematic',
        tags: ['restaurant', 'food', 'ad', 'cinematic', 'shorts']
    },
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
        title: 'Engora Real Estate Ad',
        description: 'Short ad for Engora real estate company.',
        youtubeId: 'rVBxvUxl934',
        category: 'cinematic',
        tags: ['engora', 'real estate', 'ad']
    },
    {
        title: 'إعلان شقق سكنية',
        description: 'فيديو إعلان قصير عن شقق سكنية يبرز اللقطات السريعة والمساحات.',
        youtubeId: 'ZoL7wWQE1tA',
        category: 'cinematic',
        tags: ['real estate', 'apartments', 'ad', 'promo']
    },
    {
        title: 'إعلان شقة - طريقة مختلفة وذكية',
        description: 'إعلان قصير لشقة بأسلوب مختلف وذكي يبرز التفاصيل المهمة بشكل جذاب.',
        youtubeId: '3icWqJhZhPU',
        category: 'cinematic',
        tags: ['real estate', 'apartment', 'ad', 'smart', 'shorts']
    },
    {
        title: 'إعلان قطعة أرض صحراوية',
        description: 'إعلان قصير لقطعة أرض صحراوية يبرز المساحة والموقع وخيارات الاستثمار.',
        youtubeId: 'UuolXgxDlfQ',
        category: 'cinematic',
        tags: ['real estate', 'land', 'desert', 'ad']
    },
    {
        title: 'إعلان محل سريع ومميز',
        description: 'إعلان قصير لمحل بطريقة مميزة وسريعة يركز على الحركة والخدمة.',
        youtubeId: '4YUuDbyk_Jg',
        category: 'cinematic',
        tags: ['shop', 'retail', 'ad', 'promo']
    },
    {
        title: 'إعلان Bowling Trailer متنقلة',
        description: 'إعلان سريع لـ bowling trailer متنقلة يبرز التجربة المتنقلة والحماس.',
        youtubeId: '9NJDEZxmWng',
        category: 'cinematic',
        tags: ['bowling', 'trailer', 'mobile', 'ad']
    },
    {
        title: 'إيديت فارس الحصان',
        description: 'فيديو إيديت قصير لشخص راكب حصان بستايل سينمائي وحركة سريعة.',
        youtubeId: 'F7MNLdl6mhk',
        category: 'cinematic',
        tags: ['horse', 'ride', 'cinematic', 'edit']
    },
    {
        title: 'فيديو تعريفي لشباب شركة SEA',
        description: 'فيديو تعريفي قصير يعرض شباب شركة SEA بأسلوب ممتع وحضور بصري سريع.',
        youtubeId: 'a4JtnCYXP9E',
        category: 'cinematic',
        tags: ['sea', 'company', 'team', 'intro', 'shorts']
    },
    {
        title: 'محامي بيتكلم عن نشر الشائعات',
        description: 'فيديو قصير لمحامي يشرح خطورة نشر الشائعات بطريقة مباشرة وسهلة.',
        youtubeId: 'M6BUnpOEaRw',
        category: 'lawyers_creators',
        tags: ['lawyer', 'legal', 'rumors', 'awareness', 'shorts']
    },
    {
        title: 'ريل تبييض الأسنان',
        description: 'جزء بسيط من فيديو لدكتور بيتكلم عن تبييض الأسنان .',
        youtubeId: 'LL5_I8knbtU',
        category: 'medical',
        tags: ['dental', 'whitening', 'reel']
    },
    {
        title: 'إعلان دكتور أسنان',
        description: 'إعلان سريع لدكتور أسنان يبرز الخدمات ونتائج الابتسامة.',
        youtubeId: '1VbDT7sx9eQ',
        category: 'medical',
        tags: ['dental', 'doctor', 'clinic', 'ad']
    },
    {
        title: 'جلسة تنظيف - ستايل كرييتف',
        description: 'فيديو قصير لجلسة تنظيف بطريقة كرييتف وممتعة يبرز التفاصيل بأسلوب جذاب.',
        youtubeId: '9HsxzQ60hXI',
        category: 'medical',
        tags: ['dental', 'cleaning', 'clinic', 'medical', 'shorts']
    },
    {
        title: 'دكتور يتكلم عن جرثومة المعدة',
        description: 'فيديو قصير بأسلوب ممتع يشرح جرثومة المعدة بطريقة واضحة وسهلة.',
        youtubeId: 'pi2FuCpumQc',
        category: 'medical',
        tags: ['medical', 'doctor', 'gastro', 'h-pylori', 'shorts']
    },
    {
        title: 'موشن Eye Bags و Dark Circles',
        description: 'فيديو موشن طبي ممتع يشرح حالة الانتفاخات والهالات السوداء تحت العين بشكل كرييتف.',
        youtubeId: '5UhqwmNW0r0',
        category: 'medical',
        tags: ['medical', 'dermatology', 'eye bags', 'dark circles', 'motion', 'shorts']
    },
    {
        title: 'المشاكل التجميلية لدى المريضة',
        description: 'فيديو قصير يوضح أبرز المشاكل التجميلية لدى المريضة بأسلوب ممتع وسهل الفهم.',
        youtubeId: 'WZy2qclRUJ0',
        category: 'medical',
        tags: ['medical', 'cosmetic', 'patient', 'dermatology', 'shorts']
    },
    {
        title: 'الحج محمد سالم - تجربة مع دكتور اندرو',
        description: 'فيديو تعريفي يروي فيه الحج محمد سالم مشاكله وتجربته العلاجية مع دكتور اندرو.',
        youtubeId: '_l4ncMvfYQA',
        category: 'medical',
        tags: ['medical', 'patient', 'testimonial', 'doctor', 'shorts']
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
        title: 'macdonald',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: '9lQhpGcrDVA',
        category: 'youtube_long',
        tags: ['macdonald', 'youtube long', 'long video']
    },
    {
        title: 'IKEA',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: 'fNNj4rcpXPg',
        category: 'youtube_long',
        tags: ['IKEA', 'youtube long', 'long video']
    },
    {
        title: 'iphone',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: 'd633FvDxaDc',
        category: 'youtube_long',
        tags: ['iphone', 'youtube long', 'long video']
    },
    {
        title: 'حكاية اوبر',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: '5PYCt_rzzRA',
        category: 'youtube_long',
        tags: ['uber', 'story', 'youtube long', 'long video']
    },
    {
        title: 'حرب الكولا',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: 'mRZz-Lnx6Qw',
        category: 'youtube_long',
        tags: ['cola', 'war', 'youtube long', 'long video']
    },
    {
        title: 'cat',
        description: 'فيديو يوتيوب طويل ضمن أعمال المعرض.',
        youtubeId: 'k9sY6JLUqq4',
        category: 'youtube_long',
        tags: ['cat', 'youtube long', 'long video']
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
        key: 'youtube_long',
        label: 'فيديوهات يوتيوب',
        showWhenEmpty: true,
        emptyText: 'سيتم إضافة فيديوهات يوتيوب هنا قريبًا.',
        matches: (text) =>
            text.includes('youtube long') ||
            text.includes('long video') ||
            text.includes('فيديو يوتيوب طويل') ||
            text.includes('فيديوهات يوتيوب طويلة') ||
            text.includes('فيديوهات يوتيوب طويله') ||
            text.includes('يوتيوب طويل')
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
    },
    {
        key: 'lawyers_creators',
        label: 'المحامين وصناع المحتوى',
        matches: (text) =>
            text.includes('lawyer') ||
            text.includes('legal') ||
            text.includes('law') ||
            text.includes('محام') ||
            text.includes('محامي') ||
            text.includes('قانون') ||
            text.includes('قانوني') ||
            text.includes('صانع محتوى') ||
            text.includes('صناع المحتوى') ||
            text.includes('creator') ||
            text.includes('influencer')
    }
];

const FALLBACK_VIDEO_CATEGORY = {
    key: 'other',
    label: 'مشاريع متنوعة'
};

const GALLERY_PAGE_SIZE = 6;

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setCurrentYear();
    setupHeroTilt();
    setupLiteYoutubeEmbeds(document);
    renderVideoGallery();
});

function setupHeroTilt() {
    const stage = document.querySelector('.hero__stage');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (!stage || reduceMotion || coarsePointer) {
        return;
    }

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderTilt = () => {
        const bounds = stage.getBoundingClientRect();
        const x = Math.min(Math.max((pointerX - bounds.left) / bounds.width, 0), 1);
        const y = Math.min(Math.max((pointerY - bounds.top) / bounds.height, 0), 1);
        const tiltX = (0.5 - y) * 5.5;
        const tiltY = (x - 0.5) * 5.5;

        stage.style.setProperty('--hero-tilt-x', `${tiltX.toFixed(2)}deg`);
        stage.style.setProperty('--hero-tilt-y', `${tiltY.toFixed(2)}deg`);
        stage.style.setProperty('--hero-shine-x', `${(x * 100).toFixed(1)}%`);
        stage.style.setProperty('--hero-shine-y', `${(y * 100).toFixed(1)}%`);
        frameId = 0;
    };

    stage.addEventListener('pointerenter', () => {
        stage.classList.add('is-tilting');
    });

    stage.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frameId) {
            frameId = window.requestAnimationFrame(renderTilt);
        }
    });

    stage.addEventListener('pointerleave', () => {
        if (frameId) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
        }
        stage.classList.remove('is-tilting');
        stage.style.removeProperty('--hero-tilt-x');
        stage.style.removeProperty('--hero-tilt-y');
        stage.style.removeProperty('--hero-shine-x');
        stage.style.removeProperty('--hero-shine-y');
    });
}

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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navList.dataset.open === 'true') {
            closeMenu();
            navToggle.focus();
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

    document.body.classList.add('home-page');

    gallery.innerHTML = '';

    if (!Array.isArray(showcaseVideos) || !showcaseVideos.length) {
        const emptyState = document.createElement('p');
        emptyState.textContent = 'أضِف أعمال الفيديو إلى القائمة داخل main.js ليظهر المعرض هنا.';
        emptyState.setAttribute('data-reveal', '');
        gallery.appendChild(emptyState);
        return;
    }

    const groups = buildGalleryGroups();

    if (!groups.length) {
        const emptyState = document.createElement('p');
        emptyState.textContent = 'أضِف أعمال الفيديو إلى القائمة داخل main.js ليظهر المعرض هنا.';
        gallery.appendChild(emptyState);
        return;
    }

    let activeKey = groups[0].key;
    let visibleCount = GALLERY_PAGE_SIZE;

    const toolbar = document.createElement('div');
    toolbar.className = 'media-gallery__toolbar';

    const filters = document.createElement('div');
    filters.className = 'media-filters';
    filters.setAttribute('aria-label', 'تصفية معرض الأعمال');

    const status = document.createElement('p');
    status.className = 'media-gallery__status';
    status.setAttribute('aria-live', 'polite');

    const heading = document.createElement('h3');
    heading.className = 'media-gallery__active-title';

    const grid = document.createElement('div');
    grid.className = 'media-grid';
    grid.id = 'portfolio-grid';

    const loadMore = document.createElement('button');
    loadMore.className = 'media-gallery__more';
    loadMore.type = 'button';
    loadMore.textContent = 'عرض المزيد من الأعمال';

    const filterButtons = new Map();

    groups.forEach((group) => {
        const button = document.createElement('button');
        button.className = 'media-filter';
        button.type = 'button';
        button.textContent = group.label;
        button.setAttribute('aria-controls', grid.id);
        button.setAttribute('aria-pressed', String(group.key === activeKey));
        button.addEventListener('click', () => {
            if (activeKey === group.key) {
                return;
            }
            activeKey = group.key;
            visibleCount = GALLERY_PAGE_SIZE;
            paintGallery();
        });
        filterButtons.set(group.key, button);
        filters.appendChild(button);
    });

    loadMore.addEventListener('click', () => {
        visibleCount += GALLERY_PAGE_SIZE;
        paintGallery();
    });

    toolbar.append(filters, status);
    gallery.append(toolbar, heading, grid, loadMore);
    paintGallery();

    function paintGallery() {
        const group = groups.find((entry) => entry.key === activeKey) || groups[0];
        const items = group.items.slice(0, visibleCount);

        heading.textContent = group.label;
        grid.replaceChildren(...items.map((item) => createMediaCard(item)));
        status.textContent = `عرض ${items.length} من ${group.items.length} أعمال`;
        loadMore.hidden = items.length >= group.items.length;

        filterButtons.forEach((button, key) => {
            button.setAttribute('aria-pressed', String(key === group.key));
        });

        setupLiteYoutubeEmbeds(grid);
    }
}

function buildGalleryGroups() {
    const groupedItems = new Map();

    showcaseVideos.forEach((item) => {
        const categoryKey = detectVideoCategory(item);
        if (!groupedItems.has(categoryKey)) {
            groupedItems.set(categoryKey, []);
        }
        groupedItems.get(categoryKey).push(item);
    });

    const categoryOrder = [
        'medical',
        'youtube_long',
        'cinematic',
        'education',
        'fashion',
        'lawyers_creators',
        FALLBACK_VIDEO_CATEGORY.key
    ];

    const groups = categoryOrder
        .map((key) => {
            const items = groupedItems.get(key) || [];
            return {
                key,
                label: getVideoCategoryLabel(key),
                items
            };
        })
        .filter((group) => group.items.length);

    return groups;
}

function createMediaCard(item) {
    const card = document.createElement('article');
    card.className = 'media-card';
    if (item.category === 'youtube_long') {
        card.classList.add('media-card--wide');
    }

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
        if (item.category === 'youtube_long') {
            frame.classList.add('media-card__frame--wide');
        }

        frame.appendChild(createYoutubeFacade(item));
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
    fallback.textContent = 'متصفحك لا يدعم تشغيل الفيديو.';
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

function createYoutubeFacade(item) {
    const button = document.createElement('button');
    button.className = 'lite-youtube';
    button.type = 'button';
    button.dataset.youtubeLite = '';
    button.dataset.youtubeId = item.youtubeId;
    button.dataset.youtubeTitle = item.title || 'فيديو من أعمال EMRF Studio';
    button.dataset.youtubeFrameClass = 'media-card__embed';
    button.setAttribute('aria-label', `تشغيل الفيديو: ${button.dataset.youtubeTitle}`);

    const poster = document.createElement('img');
    poster.className = 'lite-youtube__poster';
    poster.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
    poster.alt = '';
    poster.loading = 'lazy';
    poster.decoding = 'async';
    poster.width = 480;
    poster.height = 360;

    const shade = document.createElement('span');
    shade.className = 'lite-youtube__shade';
    shade.setAttribute('aria-hidden', 'true');

    const play = document.createElement('span');
    play.className = 'lite-youtube__play';
    play.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'lite-youtube__label';
    label.textContent = 'تشغيل الفيديو';

    button.append(poster, shade, play, label);
    return button;
}

function setupLiteYoutubeEmbeds(root) {
    root.querySelectorAll('[data-youtube-lite]').forEach((button) => {
        if (button.dataset.youtubeEnhanced === 'true') {
            return;
        }

        button.dataset.youtubeEnhanced = 'true';
        button.addEventListener('click', () => loadYoutubeEmbed(button), { once: true });
    });
}

function loadYoutubeEmbed(button) {
    const videoId = button.dataset.youtubeId || '';
    if (!/^[A-Za-z0-9_-]{6,20}$/.test(videoId)) {
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.className = button.dataset.youtubeFrameClass || 'media-card__embed';
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = button.dataset.youtubeTitle || button.getAttribute('aria-label') || 'YouTube video';
    iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';

    button.replaceWith(iframe);
    iframe.focus();
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
