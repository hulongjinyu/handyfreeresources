/* ============================================
 * 图库数据 - 想加图片就加一行
 *
 * 字段说明：
 *   id        - 唯一编号
 *   category  - 分类（classic / landmark / nude）
 *   title     - 图片标题（鼠标悬停时显示）
 *   src       - 图片路径
 * ============================================ */

const galleryData = [
  // ========== 黑丝·都市经典（21张）==========
  { id: 1,  category: 'classic',  title: '酒店大堂·晨光',         src: 'images/black-classic/01.jpg' },
  { id: 2,  category: 'classic',  title: '露台夕阳',                src: 'images/black-classic/02.jpg' },
  { id: 3,  category: 'classic',  title: '复古图书馆',              src: 'images/black-classic/03.jpg' },
  { id: 4,  category: 'classic',  title: '黑色皮沙发',              src: 'images/black-classic/04.jpg' },
  { id: 5,  category: 'classic',  title: '雨夜街道',                src: 'images/black-classic/05.jpg' },
  { id: 6,  category: 'classic',  title: '豪车旁',                  src: 'images/black-classic/06.jpg' },
  { id: 7,  category: 'classic',  title: '江南园林·石桥',           src: 'images/black-classic/07.jpg' },
  { id: 8,  category: 'classic',  title: '全身镜前',                src: 'images/black-classic/08.jpg' },
  { id: 9,  category: 'classic',  title: '玫瑰花墙',                src: 'images/black-classic/09.jpg' },
  { id: 10, category: 'classic',  title: '旋转楼梯',                src: 'images/black-classic/10.jpg' },
  { id: 11, category: 'classic',  title: '雪地红墙',                src: 'images/black-classic/11.jpg' },
  { id: 12, category: 'classic',  title: '飞机头等舱',              src: 'images/black-classic/12.jpg' },
  { id: 13, category: 'classic',  title: '落地窗夜景',              src: 'images/black-classic/13.jpg' },
  { id: 14, category: 'classic',  title: '派对气球墙',              src: 'images/black-classic/14.jpg' },
  { id: 15, category: 'classic',  title: '餐厅吧台',                src: 'images/black-classic/15.jpg' },
  { id: 16, category: 'classic',  title: '雪地皮草',                src: 'images/black-classic/16.jpg' },
  { id: 17, category: 'classic',  title: '园林旗袍',                src: 'images/black-classic/17.jpg' },
  { id: 18, category: 'classic',  title: '飞机舱',                  src: 'images/black-classic/18.jpg' },
  { id: 19, category: 'classic',  title: '歌剧院包厢',              src: 'images/black-classic/19.jpg' },
  { id: 20, category: 'classic',  title: '威尼斯·贡多拉',           src: 'images/black-classic/20.jpg' },
  { id: 21, category: 'classic',  title: '007 赌场',                src: 'images/black-classic/21.jpg' },

  // ========== 黑丝·全球地标（20张）==========
  { id: 22, category: 'landmark', title: '巴黎·埃菲尔铁塔',        src: 'images/black-landmark/22.jpg' },
  { id: 23, category: 'landmark', title: '迪拜·帆船酒店',           src: 'images/black-landmark/23.jpg' },
  { id: 24, category: 'landmark', title: '阿尔卑斯·木屋阳台',       src: 'images/black-landmark/24.jpg' },
  { id: 25, category: 'landmark', title: '马尔代夫·无边泳池',       src: 'images/black-landmark/25.jpg' },
  { id: 26, category: 'landmark', title: '撒哈拉·沙漠星空',         src: 'images/black-landmark/26.jpg' },
  { id: 27, category: 'landmark', title: '古巴·哈瓦那老城',         src: 'images/black-landmark/27.jpg' },
  { id: 28, category: 'landmark', title: '直升机·停机坪',           src: 'images/black-landmark/28.jpg' },
  { id: 29, category: 'landmark', title: '复古·老爷车',             src: 'images/black-landmark/29.jpg' },
  { id: 30, category: 'landmark', title: '高级·SPA 按摩池',         src: 'images/black-landmark/30.jpg' },
  { id: 31, category: 'landmark', title: '阿尔卑斯·玻璃栈道',       src: 'images/black-landmark/31.jpg' },
  { id: 32, category: 'landmark', title: '好莱坞·红毯',             src: 'images/black-landmark/32.jpg' },
  { id: 33, category: 'landmark', title: '高级·珠宝店',             src: 'images/black-landmark/33.jpg' },
  { id: 34, category: 'landmark', title: '红丝绒·舞台独舞',         src: 'images/black-landmark/34.jpg' },
  { id: 35, category: 'landmark', title: '古巴·雪茄吧',             src: 'images/black-landmark/35.jpg' },
  { id: 36, category: 'landmark', title: '伦敦·红色巴士',           src: 'images/black-landmark/36.jpg' },
  { id: 37, category: 'landmark', title: '印度·泰姬陵',             src: 'images/black-landmark/37.jpg' },
  { id: 38, category: 'landmark', title: '希腊·圣托里尼',           src: 'images/black-landmark/38.jpg' },
  { id: 39, category: 'landmark', title: '罗马·斗兽场',             src: 'images/black-landmark/39.jpg' },
  { id: 40, category: 'landmark', title: '豪华·游艇甲板',           src: 'images/black-landmark/40.jpg' },
  { id: 41, category: 'landmark', title: '巴黎·圣母院',             src: 'images/black-landmark/41.jpg' },

  // ========== 肉丝·柔美知性（6张）==========
  { id: 42, category: 'nude',     title: '哥特式·大教堂',           src: 'images/nude/01.jpg' },
  { id: 43, category: 'nude',     title: '巴黎·香水专柜',           src: 'images/nude/02.jpg' },
  { id: 44, category: 'nude',     title: '私人·花艺工作室',         src: 'images/nude/03.jpg' },
  { id: 45, category: 'nude',     title: '日式·枯山水茶室',         src: 'images/nude/04.jpg' },
  { id: 46, category: 'nude',     title: '现代·艺术馆',             src: 'images/nude/05.jpg' },
  { id: 47, category: 'nude',     title: '巴黎·左岸咖啡馆',         src: 'images/nude/06.jpg' },
];

// 分类中文名（页面 Tab 显示用）
const categoryNames = {
  all:      { name: '全部',     icon: '✦' },
  classic:  { name: '黑丝·都市经典', icon: '◉' },
  landmark: { name: '黑丝·全球地标', icon: '◈' },
  nude:     { name: '肉丝·柔美知性', icon: '◐' },
};

/* ============================================
 * 渲染逻辑（不用改）
 * ============================================ */

let currentCategory = 'all';
let lightboxIndex = 0;
let filteredList = [];

function renderTabs() {
  const tabsEl = document.getElementById('tabs');
  const counts = {
    all: galleryData.length,
    classic: galleryData.filter(x => x.category === 'classic').length,
    landmark: galleryData.filter(x => x.category === 'landmark').length,
    nude: galleryData.filter(x => x.category === 'nude').length,
  };
  tabsEl.innerHTML = Object.keys(categoryNames).map(cat => `
    <button class="tab ${cat === currentCategory ? 'active' : ''}" data-cat="${cat}">
      <span class="tab-icon">${categoryNames[cat].icon}</span>
      <span class="tab-name">${categoryNames[cat].name}</span>
      <span class="tab-count">${counts[cat]}</span>
    </button>
  `).join('');

  tabsEl.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderTabs();
      renderGallery();
    });
  });
}

function renderGallery() {
  const grid = document.getElementById('grid');
  filteredList = currentCategory === 'all'
    ? galleryData
    : galleryData.filter(x => x.category === currentCategory);

  grid.innerHTML = filteredList.map((item, idx) => `
    <div class="card" data-idx="${idx}">
      <img src="${item.src}" alt="${item.title}" loading="lazy" />
      <div class="card-overlay">
        <span class="card-title">${item.title}</span>
        <span class="card-id">№ ${String(item.id).padStart(2, '0')}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      lightboxIndex = parseInt(card.dataset.idx);
      openLightbox();
    });
  });
}

function openLightbox() {
  const item = filteredList[lightboxIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-counter').textContent =
    `${lightboxIndex + 1} / ${filteredList.length}`;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function prevImage() {
  lightboxIndex = (lightboxIndex - 1 + filteredList.length) % filteredList.length;
  openLightbox();
}

function nextImage() {
  lightboxIndex = (lightboxIndex + 1) % filteredList.length;
  openLightbox();
}

// 事件绑定
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', prevImage);
document.getElementById('lightbox-next').addEventListener('click', nextImage);
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target.id === 'lightbox') closeLightbox();
});

// 初始化
renderTabs();
renderGallery();
