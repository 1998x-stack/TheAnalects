# 代码与质量原则

- 保留简洁的HTML / CSS / 原生JS ES Modules，不引入无关依赖。
- data/books-*.js为上游来源经通行顺序排序的二十篇原译语料；data/index.js仅做无损细分与派生视图。
- 界面输入和经典内容均通过textContent写入。禁止从外部JSON直接插入innerHTML。
- 每张句卡逐条上下排列。初始translation.hidden=true，配合按钮aria-expanded和aria-controls；切换篇章重建卡片。
- GitHub Pages部署到/TheAnalects/子路径，所有URL采用相对路径。
- 使用localStorage仅存书签、上次阅读、字号与主题，不存已展开译文，也不跟踪访问者。
- 支持prefers-reduced-motion、键盘访问、移动端与字体回退，不分发版权字体。
- npm test验证20篇/616对、无损回拼、DOM契约；npm run build确保静态产物包含数据模块。
- 报告CI通过不等于GitHub Pages已经启用，也不代表真实浏览器视觉验收。