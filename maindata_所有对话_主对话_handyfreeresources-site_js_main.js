/**
 * HandyFreeResources - 图片展示站 JavaScript
 * 功能：分类筛选、灯箱查看、图片懒加载、键盘导航
 * 作者：HandyFreeResources Team
 */

// ============================================
// 图片数据 - 演示用占位图片
// 替换真实图片时，只需修改此数组
// ============================================
const galleryImages = [
    // 性感写真分类
    { id: 1, src: 'https://picsum.photos/seed/sexy1/400/711', title: '私房摄影 - 光影交织', category: 'sexy', categoryName: '性感写真' },
    { id: 2, src: 'https://picsum.photos/seed/sexy2/400/711', title: '时尚内衣系列', category: 'sexy', categoryName: '性感写真' },
    { id: 3, src: 'https://picsum.photos/seed/sexy3/400/711', title: '极致诱惑', category: 'sexy', categoryName: '性感写真' },
    { id: 4, src: 'https://picsum.photos/seed/sexy4/400/711', title: '魅力绽放', category: 'sexy', categoryName: '性感写真' },
    { id: 5, src: 'https://picsum.photos/seed/sexy5/400/711', title: '私房写真 - 午后时光', category: 'sexy', categoryName: '性感写真' },
    
    // 丝袜美腿分类
    { id: 6, src: 'https://picsum.photos/seed/legs1/400/711', title: '黑色丝袜诱惑', category: 'legs', categoryName: '丝袜美腿' },
    { id: 7, src: 'https://picsum.photos/seed/legs2/400/711', title: '精致穿搭', category: 'legs', categoryName: '丝袜美腿' },
    { id: 8, src: 'https://picsum.photos/seed/legs3/400/711', title: '高跟鞋系列', category: 'legs', categoryName: '丝袜美腿' },
    { id: 9, src: 'https://picsum.photos/seed/legs4/400/711', title: '优雅线条', category: 'legs', categoryName: '丝袜美腿' },
    { id: 10, src: 'https://picsum.photos/seed/legs5/400/711', title: '时尚美腿', category: 'legs', categoryName: '丝袜美腿' },
    
    // 御姐风分类
    { id: 11, src: 'https://picsum.photos/seed/mature1/400/711', title: '成熟魅力', category: 'mature', categoryName: '御姐风' },
    { id: 12, src: 'https://picsum.photos/seed/mature2/400/711', title: '都市丽人', category: 'mature', categoryName: '御姐风' },
    { id: 13, src: 'https://picsum.photos/seed/mature3/400/711', title: '职场女王', category: 'mature', categoryName: '御姐风' },
    { id: 14, src: 'https://picsum.photos/seed/mature4/400/711', title: '优雅从容', category: 'mature', categoryName: '御姐风' },
    { id: 15, src: 'https://picsum.photos/seed/mature5/400/711', title: '知性之美', category: 'mature', categoryName: '御姐风' },
    
    // 清纯风分类
    { id: 16, src: 'https://picsum.photos/seed/pure1/400/711', title: '清新少女', category: 'pure', categoryName: '清纯风' },
    { id: 17, src: 'https://picsum.photos/seed/pure2/400/711', title: '校园时光', category: 'pure', categoryName: '清纯风' },
    { id: 18, src: 'https://picsum.photos/seed/pure3/400/711', title: '邻家女孩', category: 'pure', categoryName: '清纯风' },
    { id: 19, src: 'https://picsum.photos/seed/pure4/400/711', title: '阳光少女', category: 'pure', categoryName: '清纯风' },
    { id: 20, src: 'https://picsum.photos/seed/pure5/400/711', title: '纯真年代', category: 'pure', categoryName: '清纯风' },
    
    // 街拍分类
    { id: 21, src: 'https://picsum.photos/seed/street1/400/711', title: '都市街拍 - 时尚前沿', category: 'street', categoryName: '街拍' },
    { id: 22, src: 'https://picsum.photos/seed/street2/400/711', title: '街头潮流', category: 'street', categoryName: '街拍' },
    { id: 23, src: 'https://picsum.photos/seed/street3/400/711', title: '时尚街拍', category: 'street', categoryName: '街拍' },
    { id: 24, src: 'https://picsum.photos/seed/street4/400/711', title: '潮流穿搭', category: 'street', categoryName: '街拍' },
    { id: 25, src: 'https://picsum.photos/seed/street5/400/711', title: '城市风景线', category: 'street', categoryName: '街拍' },
    
    // 更多分类图片以增加数量
    { id: 26, src: 'https://picsum.photos/seed/sexy6/400/711', title: '私密空间', category: 'sexy', categoryName: '性感写真' },
    { id: 27, src: 'https://picsum.photos/seed/legs6/400/711', title: '美腿诱惑', category: 'legs', categoryName: '丝袜美腿' },
    { id: 28, src: 'https://picsum.photos/seed/mature6/400/711', title: '万种风情', category: 'mature', categoryName: '御姐风' },
    { id: 29, src: 'https://picsum.photos/seed/pure6/400/711', title: '樱花少女', category: 'pure', categoryName: '清纯风' },
    { id: 30, src: 'https://picsum.photos/seed/street6/400/711', title: '街拍达人', category: 'street', categoryName: '街拍' },
];

// ============================================
// 全局变量
// ============================================
let currentCategory = 'all';       // 当前选中的分类
let currentLightboxIndex = 0;      // 灯箱当前显示的图片索引
let filteredImages = [...galleryImages]; // 筛选后的图片列表
let displayedCount = 12;           // 初始显示的图片数量
const batchSize = 6;               // 每次加载的图片数量

// ============================================
// DOM 元素引用
// ============================================
const galleryGrid = document.getElementById('galleryGrid');
const categoryList = document.getElementById('categoryList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const emptyState = document.getElementById('emptyState');
const totalCountEl = document.getElementById('totalCount');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const categoryNav = document.getElementById('categoryNav');

// 灯箱元素
const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxLoading = document.getElementById('lightboxLoading');

// ============================================
// 初始化函数
// ============================================
function init() {
    // 更新总数量显示
    totalCountEl.textContent = galleryImages.length;
    
    // 渲染初始图片
    renderGallery();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化懒加载
    initLazyLoading();
}

/**
 * 绑定所有事件监听器
 */
function bindEventListeners() {
    // 分类筛选按钮点击
    categoryList.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (btn) {
            const category = btn.dataset.category;
            filterByCategory(category);
        }
    });
    
    // 移动端菜单按钮
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // 点击导航外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!categoryNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            categoryNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // 加载更多按钮
    loadMoreBtn.addEventListener('click', loadMoreImages);
    
    // 灯箱事件绑定
    bindLightboxEvents();
    
    // 键盘事件
    document.addEventListener('keydown', handleKeyboard);
}

/**
 * 移动端菜单切换
 */
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    categoryNav.classList.toggle('active');
}

/**
 * 按分类筛选图片
 * @param {string} category - 分类标识符
 */
function filterByCategory(category) {
    // 更新当前分类
    currentCategory = category;
    
    // 更新按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    // 筛选图片
    if (category === 'all') {
        filteredImages = [...galleryImages];
    } else {
        filteredImages = galleryImages.filter(img => img.category === category);
    }
    
    // 重置显示数量
    displayedCount = Math.min(12, filteredImages.length);
    
    // 重新渲染画廊
    renderGallery();
    
    // 关闭移动端菜单
    categoryNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

/**
 * 渲染画廊图片
 */
function renderGallery() {
    // 清空画廊
    galleryGrid.innerHTML = '';
    
    // 显示空状态或隐藏
    if (filteredImages.length === 0) {
        emptyState.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // 显示加载更多按钮或隐藏
    if (displayedCount >= filteredImages.length) {
        loadMoreContainer.style.display = 'none';
    } else {
        loadMoreContainer.style.display = 'flex';
    }
    
    // 渲染图片卡片
    const imagesToShow = filteredImages.slice(0, displayedCount);
    imagesToShow.forEach((image, index) => {
        const card = createImageCard(image, index);
        galleryGrid.appendChild(card);
    });
    
    // 为新添加的图片启用懒加载
    initLazyLoading();
    
    // 更新懒加载占位效果
    updatePlaceholderAnimation();
}

/**
 * 创建图片卡片元素
 * @param {Object} image - 图片数据对象
 * @param {number} index - 图片索引
 * @returns {HTMLElement} 卡片元素
 */
function createImageCard(image, index) {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.dataset.id = image.id;
    card.dataset.index = index;
    card.style.animationDelay = `${index * 50}ms`;
    
    card.innerHTML = `
        <div class="card-image-wrapper">
            <img 
                class="card-image lazy" 
                data-src="${image.src}" 
                alt="${image.title}"
                loading="lazy"
            >
            <div class="card-view-btn">⊕</div>
        </div>
        <div class="card-overlay">
            <span class="card-category">${image.categoryName}</span>
            <h3 class="card-title">${image.title}</h3>
        </div>
    `;
    
    // 点击卡片打开灯箱
    card.addEventListener('click', () => {
        openLightbox(index);
    });
    
    return card;
}

/**
 * 加载更多图片
 */
function loadMoreImages() {
    const oldCount = displayedCount;
    displayedCount = Math.min(displayedCount + batchSize, filteredImages.length);
    
    // 添加新的图片卡片
    const newImages = filteredImages.slice(oldCount, displayedCount);
    newImages.forEach((image, i) => {
        const card = createImageCard(image, oldCount + i);
        card.style.animation = 'none'; // 取消动画以实现平滑过渡
        galleryGrid.appendChild(card);
    });
    
    // 重新启用懒加载
    initLazyLoading();
    updatePlaceholderAnimation();
    
    // 隐藏或显示加载更多按钮
    if (displayedCount >= filteredImages.length) {
        loadMoreContainer.style.display = 'none';
    }
    
    // 滚动到新添加的图片
    setTimeout(() => {
        const newCards = galleryGrid.querySelectorAll('.gallery-card');
        const lastNewCard = newCards[newCards.length - 1];
        if (lastNewCard) {
            lastNewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

/**
 * 初始化图片懒加载 - 使用 Intersection Observer
 */
function initLazyLoading() {
    const images = document.querySelectorAll('.card-image.lazy:not(.loaded)');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理：直接加载所有图片
        images.forEach(img => loadImage(img));
    }
}

/**
 * 加载单张图片
 * @param {HTMLImageElement} img - 图片元素
 */
function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    img.src = src;
    
    img.onload = () => {
        img.classList.add('loaded');
        img.parentElement.classList.add('loaded');
    };
    
    img.onerror = () => {
        // 图片加载失败时的处理
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 711"%3E%3Crect fill="%231a1a1a" width="400" height="711"/%3E%3Ctext x="200" y="355" text-anchor="middle" fill="%23666" font-size="14"%3E图片加载失败%3C/text%3E%3C/svg%3E';
        img.classList.add('loaded');
        img.parentElement.classList.add('loaded');
    };
}

/**
 * 更新懒加载占位动画
 */
function updatePlaceholderAnimation() {
    const loadedImages = document.querySelectorAll('.card-image.loaded');
    loadedImages.forEach(img => {
        img.parentElement.classList.add('loaded');
    });
}

// ============================================
// 灯箱功能
// ============================================
/**
 * 绑定灯箱事件
 */
function bindLightboxEvents() {
    // 关闭按钮
    lightboxClose.addEventListener('click', closeLightbox);
    
    // 遮罩层点击关闭
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // 上一张按钮
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    
    // 下一张按钮
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
    
    // 图片容器点击（防止冒泡）
    document.querySelector('.lightbox-image-container').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

/**
 * 打开灯箱
 * @param {number} index - 图片索引
 */
function openLightbox(index) {
    currentLightboxIndex = index;
    
    // 显示灯箱
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 加载图片
    updateLightboxImage();
}

/**
 * 关闭灯箱
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // 清除图片
    lightboxImage.classList.remove('loaded');
}

/**
 * 更新灯箱图片内容
 */
function updateLightboxImage() {
    const image = filteredImages[currentLightboxIndex];
    if (!image) return;
    
    // 显示加载动画
    lightboxLoading.classList.add('active');
    lightboxImage.classList.remove('loaded');
    
    // 更新图片
    lightboxImage.src = image.src;
    lightboxTitle.textContent = image.title;
    lightboxCategory.textContent = image.categoryName;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
    
    // 图片加载完成
    lightboxImage.onload = () => {
        lightboxLoading.classList.remove('active');
        lightboxImage.classList.add('loaded');
    };
    
    lightboxImage.onerror = () => {
        lightboxLoading.classList.remove('active');
        lightboxImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 711"%3E%3Crect fill="%231a1a1a" width="400" height="711"/%3E%3Ctext x="200" y="355" text-anchor="middle" fill="%23666" font-size="14"%3E图片加载失败%3C/text%3E%3C/svg%3E';
        lightboxImage.classList.add('loaded');
    };
    
    // 更新导航按钮可见性
    updateNavButtons();
}

/**
 * 更新导航按钮可见性
 */
function updateNavButtons() {
    // 只有一个图片时隐藏导航按钮
    if (filteredImages.length <= 1) {
        lightboxPrev.style.visibility = 'hidden';
        lightboxNext.style.visibility = 'hidden';
    } else {
        lightboxPrev.style.visibility = 'visible';
        lightboxNext.style.visibility = 'visible';
    }
}

/**
 * 显示上一张图片
 */
function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

/**
 * 显示下一张图片
 */
function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

/**
 * 处理键盘事件
 * @param {KeyboardEvent} e - 键盘事件
 */
function handleKeyboard(e) {
    // 只有灯箱打开时才响应键盘
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case ' ':
            e.preventDefault();
            showNextImage();
            break;
    }
}

// ============================================
// 启动应用
// ============================================
document.addEventListener('DOMContentLoaded', init);
