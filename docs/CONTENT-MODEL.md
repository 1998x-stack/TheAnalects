# 原典与译文的数据模型

## 第一层：20篇

BOOKS每项有number、title、theme、summary、units字段。number从1到20，title按通行篇序：学而、为政、八佾、里仁、公冶长、雍也、述而、泰伯、子罕、乡党、先进、颜渊、子路、宪问、卫灵公、季氏、阳货、微子、子张、尧曰。

- theme与summary是本项目为阅读导航编写的编辑性辅助信息。
- units是原文/第三方现代译文成对的记录。总共616对，**不等于标准分章数量**。
- unit.id为xx-yyy，例如01-001，前两位是篇序，后三位是数据单元序号。

## 第二层：展示句卡

passagesOf(book)会逐条读取unit：

1. 按「。！？；」分别切分古文和现代译文。
2. 如果两侧拆分数量大于1且相等，并且拼回去都与原输入字符串完全一致，则按顺序配成更短的句卡。
3. 任何一侧句数不符、有特殊空白、或不满足回拼，则保留原单元；**不机械打散摘要**。
4. 生成xx-yyy-zz ID、unitId、book、original、translation、alignment等字段。

当前所有展示卡合计1,013条，其中存在相对完整的语录单元。这个数是软件展示单元数，不是经过逐字训诂的《论语》句子总数；相同标点数量仍不能单独证明语义精准对应，必须人工复核。

## 来源和许可

原译来自Scagin/CCTC MIT资料，完整署名与上游许可见THIRD-PARTY-NOTICES.md。本仓库不主张现代译文为自身原创。古籍现代标点和流传异文需进一步校核。

## 未来审核数据

计划为每个单元新增 sourceEdition、sourceRevision、canonicalPassage、lemma、alignmentReviewed、interpretationReviewed、variants、reviewer 字段。校订时必须有完整差异记录，不可静默覆盖上游源文。