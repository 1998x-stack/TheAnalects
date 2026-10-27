# 论语 · The Analects

> **学而时习之，不亦说乎？** ——《论语·学而》

一座采用**竹影、朱砂、宣纸**美学的《论语》数字阅读馆，也是一项可在 Codex / OpenCode 中直接调用的儒家智慧 Skill 项目。

[**阅读网站（Pages已部署）**](https://1998x-stack.github.io/TheAnalects/) · [**SKILL.md**](./SKILL.md) · [**文档中心**](./docs/README.md) · [**GitHub Actions**](https://github.com/1998x-stack/TheAnalects/actions)

> GitHub Pages 发布工作流已成功；尚未独立完成真实浏览器的跨设备与辅助技术验收。

## 功能与数据

| 功能 | 实现 |
| --- | --- |
| 全书阅读 | 通行顺序20篇、616个开源原译配对语录单元；按可无损对应的句读细分为**1,013张阅读卡** |
| 点击揭晓 | 古文在上、白话译文在下；译文初始隐藏、点击单独展开，再点收起；切篇重置 |
| 阅读工具 | 全文检索、主题筛选、章节导航、书签、字号、深墨/宣纸配色、链接直达 |
| AI Skill | 以仁、义、礼、智、信和自省解决学习、教育、职场、人际等现实问题；引用真实原文与篇名 |
| 工程质量 | 原生ES Modules、无第三方运行时依赖、内容回拼验证、自动化CI与Pages发布 |

**关于原译关系：** 数据来源为 Scagin/CCTC 开源MIT语料，共616组对应记录，这不是传统底本的标准章数。对古文、现代译文句数一致且两者均可逐字回拼的语录进一步细分；其余保留完整对应，不凭空编造译句。1,013张阅读卡并非1,013个已人工训诂的权威古文句子。第三方译文版权与许可见 [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)。

## 让 Codex / OpenCode 使用这个 Skill

### 方式 A：直接复制以下提示词

在已经克隆的项目目录中，向 Codex 或 OpenCode 粘贴：

~~~text
请完整读取当前仓库 SKILL.md，并按需读取 references/practical-wisdom.md、references/chapter-guide.md 和 data/ 中的《论语》原文。
从现在起，以 analects-wisdom Skill 协助我思考现实问题：
1. 先理解我的具体问题、目标和约束，不机械套格言。
2. 借《论语》的仁、义、礼、智、信、学思结合、自省、忠恕进行分析。
3. 用温厚儒雅、简练易懂的中文回复；引用真实的《论语》原文短句与明确篇名，紧跟白话释义。
4. 结合我的现实情形说明这句经文的启发和现代适用边界；尊重他人权利和个人自主。
5. 给出1—3项可执行、可验证的行动。
6. 不编造经典文字，不把后人概括当孔子原文，不把经典替代专业事实。
我的问题是：________
~~~

### 方式 B：客户端自动发现（推荐）

本项目提供根目录 [SKILL.md](./SKILL.md)、[.agents/skills/analects-wisdom/SKILL.md](./.agents/skills/analects-wisdom/SKILL.md)、[AGENTS.md](./AGENTS.md)。

~~~bash
git clone https://github.com/1998x-stack/TheAnalects.git
cd TheAnalects
codex
# 或者
opencode
~~~

**Codex 对话中粘贴：**

~~~text
$analects-wisdom 请用《论语》原文和篇名分析我在学习、教育、职业或人际交往中的难题，并给可执行的建议：________
~~~

**OpenCode 对话中粘贴：**

~~~text
请加载当前项目的 analects-wisdom Skill；若未发现，请阅读 .agents/skills/analects-wisdom/SKILL.md 和根目录 SKILL.md。结合《论语》准确原文与篇名回答我的问题：________
~~~

### 方式 C：全局安装

~~~bash
git clone https://github.com/1998x-stack/TheAnalects.git "$HOME/analects-wisdom-source"
mkdir -p "$HOME/.agents/skills"
ln -s "$HOME/analects-wisdom-source/.agents/skills/analects-wisdom" \
  "$HOME/.agents/skills/analects-wisdom"
~~~

执行前检查同名技能目录，避免覆盖。若未自动发现，可重启客户端。更多模板见 [prompts/codex-opencode.md](./prompts/codex-opencode.md)。

## 本地运行与验证

~~~bash
git clone https://github.com/1998x-stack/TheAnalects.git
cd TheAnalects
npm test
npm run build
npm run serve
# 浏览器访问 http://localhost:4173
~~~

要求 Node.js 20+ 和 Python 3；原生ES Modules需通过HTTP访问，不要直接打开HTML文件。

| 路径 | 职责 |
| --- | --- |
| data/books-*.js | 20篇、616组原文和配对开源译文 |
| data/index.js | 篇章索引、按可对应标点细分、无损回拼 |
| index.html、styles.css、app.js | 页面、搜索、逐条点击、主题与收藏 |
| SKILL.md、.agents/skills/、references/ | Skill行为、准确引经与Codex/OpenCode入口 |
| docs/、scripts/、.github/workflows/ | 古籍来源、内容模型、设计、测试、发布 |

## 学术与授权边界

古代《论语》经文本身属于公有领域，但项目使用的**现代中文译文来自已署名MIT开源语料**，不是本项目原创或权威逐字定本。文本字形、断句与译义存在需要复审之处。自动测试能证明结构完整，不能替代训诂和历史研究。

代码与新编工程文档依 [MIT License](./LICENSE) 发布；对第三方译文保留原有MIT版权声明和许可证，不以其他许可覆盖上游权利。

[内容模型](./docs/CONTENT-MODEL.md) · [底本来源](./docs/TEXTUAL-SOURCES.md) · [交互规范](./docs/READING-EXPERIENCE.md) · [设计系统](./docs/DESIGN-SYSTEM.md) · [验收标准](./docs/QA.md) · [部署说明](./docs/DEPLOYMENT.md) · [路线图](./docs/ROADMAP.md)

---

**温故而知新，可以为师矣。** ——《论语·为政》