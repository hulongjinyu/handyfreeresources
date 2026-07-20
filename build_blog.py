#!/usr/bin/env python3
"""
handyfreeresources.com 博客构建脚本
功能：
1. 将 blog/posts/*.md 转换为 blog/posts/[slug]/index.html
2. 生成 blog/index.html 文章列表页
3. 更新根目录 sitemap.xml（把博客文章加进去）
用法：python3 build_blog.py
"""

import os
import re
import glob
import html
from datetime import datetime
from pathlib import Path

SITE_URL = "https://handyfreeresources.com"
SITE_NAME = "影相集 GALLERY"
BLOG_DIR = Path("blog")
POSTS_DIR = BLOG_DIR / "posts"
OUTPUT_DIR = Path("blog")  # 输出到 blog/ 目录

# ========== Markdown 简易解析 ==========
def parse_md_meta(md_text):
    """解析 YAML front-matter"""
    meta = {}
    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().split("\n"):
                if ":" in line:
                    key, val = line.split(":", 1)
                    meta[key.strip()] = val.strip().strip('"').strip("'")
            md_text = parts[2].strip()
    return meta, md_text

def md_to_html(md_text):
    """简易 Markdown → HTML（支持标题/段落/列表/粗体/斜体/链接/图片/代码）"""
    lines = md_text.split("\n")
    html_lines = []
    in_list = False
    in_code = False
    in_para = False

    for line in lines:
        # 代码块
        if line.strip().startswith("```"):
            if in_code:
                html_lines.append("</code></pre>")
                in_code = False
            else:
                if in_para:
                    html_lines.append("</p>")
                    in_para = False
                lang = line.strip()[3:].strip()
                html_lines.append(f'<pre><code class="language-{lang}">')
                in_code = True
            continue
        if in_code:
            html_lines.append(html.escape(line))
            continue

        # 空行
        if not line.strip():
            if in_list:
                html_lines.append("</ul>")
                in_list = False
            if in_para:
                html_lines.append("</p>")
                in_para = False
            continue

        # 标题
        if line.startswith("# "):
            if in_para: html_lines.append("</p>"); in_para = False
            html_lines.append(f"<h1>{html.escape(line[2:])}</h1>")
            continue
        if line.startswith("## "):
            if in_para: html_lines.append("</p>"); in_para = False
            html_lines.append(f"<h2>{html.escape(line[3:])}</h2>")
            continue
        if line.startswith("### "):
            if in_para: html_lines.append("</p>"); in_para = False
            html_lines.append(f"<h3>{html.escape(line[4:])}</h3>")
            continue

        # 列表
        if line.strip().startswith("- ") or re.match(r"^\d+\. ", line.strip()):
            if not in_list:
                html_lines.append("<ul>")
                in_list = True
            item = re.sub(r"^(\- |\d+\. )", "", line.strip())
            item = inline_format(item)
            html_lines.append(f"<li>{item}</li>")
            continue
        elif in_list:
            html_lines.append("</ul>")
            in_list = False

        # 段落
        if not in_para:
            html_lines.append("<p>")
            in_para = True
        html_lines.append(inline_format(line.strip()))

    if in_list: html_lines.append("</ul>")
    if in_para: html_lines.append("</p>")

    return "\n".join(html_lines)

def inline_format(text):
    """处理粗体/斜体/链接/图片的内联格式"""
    # 图片 ![alt](url)
    text = re.sub(r"!\[([^\]]*)\]\(([^\)]+)\)", r'<img src="\2" alt="\1" loading="lazy" />', text)
    # 链接 [text](url)
    text = re.sub(r"\[([^\]]+)\]\(([^\)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', text)
    # 粗体 **text**
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    # 斜体 *text*
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    # 行内代码 `code`
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    return text

# ========== 模板 ==========
POST_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} - {site_name}博客</title>
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />
  <meta name="author" content="{author}" />
  <link rel="canonical" href="{canonical_url}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{canonical_url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="article:published_time" content="{date_iso}" />
  {image_og}
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "{title}",
    "description": "{description}",
    "datePublished": "{date_iso}",
    "author": {{
      "@type": "Organization",
      "name": "{author}"
    }},
    "mainEntityOfPage": {{
      "@type": "WebPage",
      "@id": "{canonical_url}"
    }}
    {image_schema}
  }}
  </script>
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/blog/css/blog.css" />
</head>
<body>
  <header class="header">
    <a href="/" class="header-link"><h1 class="header-title">影 相 集</h1></a>
    <p class="header-subtitle">Sexy Lady Stocking Collection</p>
    <div class="header-divider"></div>
    <nav class="blog-nav">
      <a href="/">首页</a> | <a href="/blog/">博客</a>
    </nav>
  </header>
  <main class="blog-post-container">
    <article class="blog-post">
      <header class="post-header">
        <h1 class="post-title">{title}</h1>
        <time class="post-date" datetime="{date_iso}">{date_cn}</time>
        {tags_html}
      </header>
      <div class="post-content">
        {content}
      </div>
    </article>
    <nav class="post-nav">
      <a href="/blog/">← 返回博客列表</a>
    </nav>
  </main>
  <footer class="footer">
    SEXY LADY · STOCKING COLLECTION<br/>
    <a href="/sitemap.xml" style="color:#666;text-decoration:none;font-size:11px;">SITEMAP</a>
  </footer>
</body>
</html>"""

LIST_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>博客 - {site_name}</title>
  <meta name="description" content="影相集博客 - AI摄影、图像处理、创意内容分享" />
  <link rel="canonical" href="{site_url}/blog/" />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/blog/css/blog.css" />
</head>
<body>
  <header class="header">
    <a href="/" class="header-link"><h1 class="header-title">影 相 集</h1></a>
    <p class="header-subtitle">Sexy Lady Stocking Collection</p>
    <div class="header-divider"></div>
    <nav class="blog-nav">
      <a href="/">首页</a> | <a href="/blog/" class="active">博客</a>
    </nav>
  </header>
  <main class="blog-list-container">
    <h1 class="blog-list-title">博客文章</h1>
    <div class="blog-list">
      {posts_html}
    </div>
  </main>
  <footer class="footer">
    SEXY LADY · STOCKING COLLECTION<br/>
    <a href="/sitemap.xml" style="color:#666;text-decoration:none;font-size:11px;">SITEMAP</a>
  </footer>
</body>
</html>"""

# ========== 主流程 ==========
def build():
    posts = []
    md_files = sorted(POSTS_DIR.glob("*.md"), reverse=True)

    if not md_files:
        print("⚠️  没有找到任何 .md 文章文件")
        return

    for md_file in md_files:
        raw = md_file.read_text(encoding="utf-8")
        meta, content_md = parse_md_meta(raw)

        slug = meta.get("slug", md_file.stem)
        title = meta.get("title", slug)
        description = meta.get("description", title)
        keywords = meta.get("keywords", "")
        author = meta.get("author", SITE_NAME)
        date_str = meta.get("date", datetime.now().strftime("%Y-%m-%d"))
        tags = [t.strip() for t in meta.get("tags", "").split(",") if t.strip()]
        cover = meta.get("cover", "")

        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
        except:
            dt = datetime.now()
        date_iso = dt.strftime("%Y-%m-%d")
        date_cn = dt.strftime("%Y年%m月%d日")

        content_html = md_to_html(content_md)

        # 标签
        tags_html = ""
        if tags:
            tags_html = '<div class="post-tags">' + "".join(
                f'<span class="tag">{html.escape(t)}</span>' for t in tags
            ) + '</div>'

        # OG image
        image_og = ""
        image_schema = ""
        if cover:
            full_cover = cover if cover.startswith("http") else f"{SITE_URL}{cover}"
            image_og = f'<meta property="og:image" content="{full_cover}" />'
            image_schema = f',"image": ["{full_cover}"]'

        # 渲染文章页
        post_html = POST_TEMPLATE.format(
            title=html.escape(title),
            description=html.escape(description),
            keywords=html.escape(keywords),
            author=html.escape(author),
            canonical_url=f"{SITE_URL}/blog/posts/{slug}/",
            date_iso=date_iso,
            date_cn=date_cn,
            tags_html=tags_html,
            content=content_html,
            image_og=image_og,
            image_schema=image_schema,
            site_name=SITE_NAME,
            site_url=SITE_URL,
        )

        # 输出文章页
        out_dir = OUTPUT_DIR / "posts" / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "index.html").write_text(post_html, encoding="utf-8")
        print(f"✅ {slug}/")

        posts.append({
            "slug": slug,
            "title": title,
            "description": description,
            "date": date_iso,
            "date_cn": date_cn,
            "tags": tags,
            "url": f"{SITE_URL}/blog/posts/{slug}/",
            "cover": cover,
        })

    # 生成列表页
    posts_html = ""
    for p in posts:
        tags_str = "".join(f'<span class="tag">{html.escape(t)}</span>' for t in p["tags"])
        posts_html += f"""
      <a href="/blog/posts/{p['slug']}/" class="blog-card">
        <div class="blog-card-content">
          <h2>{html.escape(p['title'])}</h2>
          <time>{p['date_cn']}</time>
          <p>{html.escape(p['description'])}</p>
          {tags_str}
        </div>
      </a>"""

    list_html = LIST_TEMPLATE.format(
        site_name=SITE_NAME,
        site_url=SITE_URL,
        posts_html=posts_html,
    )
    (OUTPUT_DIR / "index.html").write_text(list_html, encoding="utf-8")
    print(f"✅ blog/index.html (共 {len(posts)} 篇文章)")

    # 更新 sitemap.xml
    update_sitemap(posts)

def update_sitemap(posts):
    sitemap_path = Path("sitemap.xml")
    if not sitemap_path.exists():
        print("⚠️  未找到 sitemap.xml，跳过更新")
        return

    content = sitemap_path.read_text(encoding="utf-8")

    # 移除旧的 blog urlset（如果有）
    content = re.sub(r"\s*<!-- blog-posts-start -->.*?<!-- blog-posts-end -->", "", content, flags=re.DOTALL)

    # 在 </urlset> 前插入博客条目
    blog_entries = ["\n  <!-- blog-posts-start -->"]
    today = datetime.now().strftime("%Y-%m-%d")

    # 博客列表页
    blog_entries.append(f"""
  <url>
    <loc>{SITE_URL}/blog/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>""")

    for p in posts:
        blog_entries.append(f"""
  <url>
    <loc>{p['url']}</loc>
    <lastmod>{p['date']}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")

    blog_entries.append("  <!-- blog-posts-end -->")

    content = content.replace("</urlset>", "".join(blog_entries) + "\n</urlset>")
    sitemap_path.write_text(content, encoding="utf-8")
    print(f"✅ sitemap.xml 已更新（新增 {len(posts)} 个博客 URL）")

if __name__ == "__main__":
    build()
