# 逐句/逐条阅读与渐进揭晓

## 结构

每个阅读单元按固定顺序排列：古文全文 →「轻触见译」独立按钮 → 该单元现代中文译文。

译文节点的HTML hidden=true；点击按钮才取消hidden，aria-expanded=true；再次点击收起。所有屏宽采用单列上下阅读顺序，不存在左右原译对照栏。

## 状态机

~~~text
ENTER_BOOK    → 所有译文 CLOSED
CLOSED        → 点击对应按钮 → OPEN
OPEN          → 再次点击对应按钮 → CLOSED
COLLAPSE_ALL  → 所有OPEN → CLOSED
CHANGE_BOOK   → 重新渲染，全部CLOSED
FONT_CHANGE   → 更改CSS变量，不改变打开状态
RELOAD        → 初始CLOSED（展开状态不持久化）
~~~

## 内容精度的重要限制

上游MIT语料包含616条原译成对记录，部分包含多个句子。项目只在两边句读数相同且原文/译文双向回拼无损时细分，因此显示1,013张阅读卡。对于无法自动可靠细分的记录，保留原译成对的长语录，不虚构单句译文。仍需人工检查细分后是否确实逐句语义对应。

## 可访问性

每条卡片采用role=listitem；控制为button原生语义，拥有aria-expanded与对应的aria-controls；隐藏译文不进入布局或辅助技术阅读流。支持Tab和Enter/Space、阅读进度状态公告、键盘/键聚焦搜索、字体大小调整与减少动画设置。