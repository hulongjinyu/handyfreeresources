# handyfreeresources.com 博客系统

## 📋 概述

这是为 `handyfreeresources.com` 图集站添加的博客功能模块。  
使用 **Markdown 写作 → Python 脚本自动构建 → 纯静态 HTML 部署** 的工作流，对 SEO 非常友好。

## 📁 新增文件结构

```
handyfreeresources/
├── blog/
│   ├── posts/                    ← 在这里写 .md 文章
│   │   ├── ai-portrait-photography-tips.md   (示例1)
│   │   └── scene-selection-guide-urban-landmarks.md  (示例2)
│   └── css/
│       └── blog.css              ← 博客样式（继承首页深色主题）
├── build_blog.py                 ← 构建脚本（md→html + 更新 sitemap）
└── .github/workflows/
    └── build-blog.yml            ← GitHub Actions 自动构建+部署
```

## 🚀 使用方法

### 1. 写文章

在 `blog/posts/` 下新建 `.md` 文件，必须包含 YAML front-matter：

```markdown
---
slug: my-article-slug
title: 文章标题
description: 简短描述（用于 SEO 和列表页显示）
keywords: 关键词1,关键词2,关键词3
author: 影相集 GALLERY
date: 2026-07-19
tags: 标签1,标签2
cover: /images/black-classic/01.jpg
---

## 正文内容

Markdown 格式，支持标题、段落、粗体、斜体、链接、图片、列表、代码块。
```

### 2. 本地构建预览

```bash
python3 build_blog.py
```

这会生成：
- `blog/index.html` ← 文章列表页
- `blog/posts/[slug]/index.html` ← 每篇文章的独立页面
- 更新根目录 `sitemap.xml`（把博客页面加入）

### 3. 提交并部署

```bash
git add .
git commit -m "blog: add new article"
git push
```

GitHub Actions 会自动构建并部署到 Cloudflare Pages。

## 🎯 SEO 特性

- ✅ 每篇文章独立 URL：`/blog/posts/[slug]/`
- ✅ JSON-LD 结构化数据（BlogPosting Schema）
- ✅ Open Graph / Twitter Card 元标签
- ✅ Canonical URL 避免重复
- ✅ Sitemap 自动包含博客文章
- ✅ 语义化 HTML（article / time / nav）
- ✅ 响应式设计，移动端友好

## 🔧 自定义配置

编辑 `build_blog.py` 顶部常量：
- `SITE_URL`：你的网站域名
- `SITE_NAME`：网站名称

## ⚙️ 部署说明

### Cloudflare Pages（推荐）

需要在 GitHub 仓库设置两个 Secrets：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### 本地手动部署

```bash
python3 build_blog.py
# 把整个项目目录上传到 Cloudflare Pages
npx wrangler pages deploy ./ --project-name=handyfreeresources
```

## 📝 首页导航

需要在 `index.html` 的 footer 区域加入博客入口链接：

```html
<a href="/blog/" style="color: #666; text-decoration: none; font-size: 11px;">BLOG</a>
```

建议加在 SITEMAP 链接旁边。

## 📚 示例文章

- `ai-portrait-photography-tips.md` — AI人像摄影提示词技巧（5个实用技巧）
- `scene-selection-guide-urban-landmarks.md` — 都市地标场景拍摄指南

可以直接作为模板，复制修改即可写新文章。
