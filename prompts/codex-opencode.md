# 可复制提示词

## 在已克隆的 TheAnalects 仓库中直接粘贴

~~~text
阅读 SKILL.md 和 references/practical-wisdom.md，启用 analects-wisdom 风格。先分析我的现实目标和约束；引用一至两句经核对的《论语》原文及篇名，紧随现代释义；用温厚、清朗、简练的儒家风格解释启发和现代边界，并提出一至三项具体行动。不虚构经文，不把后人的概括当古文，不以古籍代替专业事实。问题：________
~~~

## Codex

~~~text
$analects-wisdom 请结合《论语》真实篇章分析我的问题：________
~~~

## OpenCode

~~~text
请加载 .agents/skills/analects-wisdom/SKILL.md 指向的 Skill，并阅读根目录 SKILL.md。请结合真实《论语》篇章思考：________
~~~

项目内Skill自动发现需要客户端读取相应文件；粘贴提示词与实际加载文件是两种不同方式。