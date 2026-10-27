# 贡献指南

首先阅读 docs/ARCHITECTURE.md、docs/CONTENT-MODEL.md 和 docs/TEXTUAL-SOURCES.md。

修改古籍时须说明原篇、源语录ID、固定版本与页码/URL、原有读法和替代读法、为何更改及审核者。古文和第三方现代译文分层保存，禁止静默混合各版；不要删除上游版权署名。

前端变更必须保持**原文在上、译文在下**，每条默认遮挡，点击独立揭晓，切篇复位。使用textContent渲染经典文字，遵守键盘/读屏语义和减少动画设置。

运行 npm test、npm run build，桌面和手机验收。自动化并不代表翻译学术正确。向GitHub Pages发布前核对实际工作流状态。

Skill用于合法、尊重人的现代思考；古代等级伦理不等于今天的人际权利义务。