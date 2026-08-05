# Deploy to your existing repo: hulongjinyu/handyfreeresources

## Step 1: Delete old files
In GitHub, open your repo and delete these old files/folders one by one:
- blog/  folder
- css/  folder
- images/  folder
- js/  folder
- Ads.txt
- ads.txt
- build_blog.py
- index.html
- robots.txt
- sitemap.xml
- README.md (will be replaced)

To delete a file: click it -> click trash can icon top-right -> Commit changes.
For folders: you need to delete files inside, GitHub will remove empty folders automatically.

## Step 2: Upload new files
1. In repo root, click "Add file" -> "Upload files"
2. Drag ALL contents of this folder (css/, js/, all .html files, sitemap.xml, robots.txt) into the upload area
3. Click "Commit changes"

## Step 3: Wait for deploy
GitHub Pages will auto-deploy in 1-2 minutes.
Visit https://handyfreeresources.com to confirm the new site is live.

## Step 4: Submit to AdSense
1. Go to https://www.google.com/adsense
2. Add site: https://handyfreeresources.com
3. Copy your publisher ID (ca-pub-XXXXXXXX)
4. In index.html, uncomment the AdSense <script> line and replace the ID
5. Upload the updated index.html
6. Click "Request review" in AdSense

## Important
- Make sure ALL old content is deleted before uploading new content
- The old site had adult-adjacent image content which violates AdSense policy; residual files must be removed
- ads.txt: after AdSense approval, create an ads.txt with:
  google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
