# 影相集 · GALLERY

一个简洁、电影感的纯静态图片展示网站。

## 📁 文件结构

```
.
├── index.html            # 入口页（不用改）
├── css/
│   └── style.css         # 样式（不用改）
├── js/
│   └── gallery.js        # 图片数据 + 渲染逻辑（想加图就改这里）
├── images/
│   ├── black-classic/    # 黑丝·都市经典
│   ├── black-landmark/   # 黑丝·全球地标
│   └── nude/             # 肉丝·柔美知性
└── README.md
```

## ➕ 怎么加新图片（2步搞定）

### 第一步：上传图片到对应文件夹

去 GitHub 仓库 https://github.com/hulongjinyu/handyfreeresources

- 点 `images/black-classic/` → `Add file` → `Upload files` → 拖入图片
- 命名建议：`42.jpg`、`43.jpg` 依次递增（或者你喜欢的名字也行）

支持的格式：`.jpg` / `.jpeg` / `.png` / `.webp`

### 第二步：在 `js/gallery.js` 里加一行

打开 `js/gallery.js`，找到 `galleryData` 数组，按下面格式加一行：

```js
{ id: 48, category: 'classic', title: '新场景名字', src: 'images/black-classic/42.jpg' },
```

| 字段 | 说明 | 可选值 |
|---|---|---|
| `id` | 唯一编号 | 数字（建议递增） |
| `category` | 分类 | `classic` / `landmark` / `nude` |
| `title` | 图片标题 | 任意文字 |
| `src` | 图片路径 | 相对于 index.html 的路径 |

### 第三步：保存，Cloudflare 自动重新部署

每次你 push 代码到 GitHub 的 `main` 分支，Cloudflare 会在 1-2 分钟内自动重新部署，你直接刷新网站就能看到新图了。

## 🎨 想换分类 / 加新分类？

1. 在 `images/` 下新建文件夹，比如 `images/portrait/`
2. 在 `js/gallery.js` 的 `categoryNames` 对象里加一项：
   ```js
   portrait: { name: '人像特写', icon: '◯' },
   ```
3. 上传图片时 `category` 字段填 `'portrait'`

## 🔧 高级自定义

- **改主题色**：编辑 `css/style.css` 里的 `--accent` 变量（默认金棕 `#d4a574`）
- **改网站标题**：编辑 `index.html` 里的 `<h1 class="header-title">`
- **加新分类图标**：可用符号 ✦ ◉ ◈ ◐ ◯ ◇ ❋ ★ 等

## 🌐 访问

部署完成后的网址：https://handyfreeresources.429511727.workers.dev

---

✨ 享受你的图片集
