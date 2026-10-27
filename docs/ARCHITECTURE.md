# 架构 · 原生模块与无损内容投影

~~~text
GitHub main
  ├─ CI: npm test → npm run build
  └─ Pages: npm test → npm run build → configure-pages → upload → deploy

静态浏览器
  index.html · styles.css · app.js
      └─ data/index.js
           ├─ data/books-01-05.js
           ├─ data/books-06-10.js
           ├─ data/books-11-15.js
           └─ data/books-16-20.js
  hash: #chapter-N
  localStorage: theme / font / bookmarks / last
~~~

## 数据设计

BOOKS[20] 中每篇 units 保存第三方现代译文与原文的成对记录。SOURCE_UNIT_COUNT=616。passagesOf 在原文与译文的标点分句数相等、双方回拼都无损时才拆出多张句卡，否则维持源单元。PASSAGE_COUNT=1013。

每张展示卡ID由上游源单元ID和拆分序号构成。映射后，按unitId归组的原文及译文分别串接，必须与输入完全一致。没有自动“补译”的网络API，避免产生伪造的对应翻译。

## 前端交互

renderChapter重新生成本篇句卡：原文始终可见，现代译文hidden=true，按钮aria-expanded=false并用aria-controls指向译文节点。单条按钮只影响自己的译文；切篇重置。字体调整仅更改CSS变量，不破坏既有展开状态。

搜索在浏览器本地完成，对篇名、编辑概览和所有原文译文检索；每条文本通过textContent输出，防止未经信任的HTML注入。书签与阅读偏好用localStorage存储，不上传行为数据。

## 部署

构建脚本将index、JS、CSS、assets及data完整复制到dist；所有路径相对本站目录，适用于 GitHub Pages 的 /TheAnalects/ 路径。必须在GitHub Settings → Pages首次开启GitHub Actions作为发布源，发布才可能完成。