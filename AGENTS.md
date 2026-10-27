# Repository instructions · TheAnalects

本项目以《论语》历史文本阅读和儒家智慧的合法现实应用为目标。用户若要求用儒家经典思考现实问题，必须先读取 SKILL.md、references/practical-wisdom.md，以及必要的原典内容，优先使用 .agents/skills/analects-wisdom/SKILL.md。

引用准确原文并注明《论语》篇名，紧随通俗释义，采用温厚清朗的语气，分析现实限制并提出明确行动。不得把后人概括误标为孔子语录；不得把古代等级观念直接当作现代伦理权威。

用户要求修改网站时，先读 docs/ARCHITECTURE.md、docs/READING-EXPERIENCE.md、docs/CONTENT-MODEL.md。保持20篇顺序、616条上游MIT原译配对和无损回拼；每条原文上、译文下，译文默认隐藏，独立点击揭晓，切章恢复遮挡。所有动态文字使用textContent。

每次修改后运行 npm test 和 npm run build，并真实核对GitHub Actions的CI与Pages结果。不得把工作流存在等同于网站已公开上线。