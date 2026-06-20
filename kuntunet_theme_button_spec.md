# KunSuite 主题配色与按钮规范


适用范围：复用当前项目的桌面控制台视觉语言，重点覆盖主题色、状态色、按钮体系、交互状态和迁移注意事项。

## 1. 设计定位

- 视觉气质：浅色优先、企业控制台、低饱和灰底、深蓝主操作、状态色明确。
- 按钮策略：主操作使用深蓝，危险操作使用红色，普通操作保持白底浅边框，开关类操作使用绿色表达开启状态。
- 信息密度：控件高度偏紧凑，普通按钮 `34px`，高频图标按钮 `30px`，适合桌面管理工具。
- 圆角策略：卡片 `8px`，普通按钮/图标按钮 `6px`，输入框 `4px`，Switch 使用胶囊圆角。

## 2. 主题色令牌

| Token | 浅色模式 | 暗色模式 | 用途规范 |
| --- | --- | --- | --- |
| `--primary` | `#1e3a8a` | `#3168f4` | 主按钮、导航激活、品牌标识、重点线路/数据 |
| `--primary-soft` | `#dbeafe` | `#172554` | 主色弱背景、信息提示、浅蓝 hover 容器 |
| `--surface` | `#ffffff` | `#111827` | 卡片、弹窗、toast、表单分区背景 |
| `--canvas` | `#f3f4f6` | `#0f172a` | 应用主背景 |
| `--sidebar` | `#e5e7eb` | `#080d14` | 左侧导航背景 |
| `--line` | `#d1d5db` | `#273244` | 按钮/输入框边框、switch 关闭态 |
| `--line-soft` | `#e5e7eb` | `#1f2937` | 面板边框、弱分隔线 |
| `--text` | `#374151` | `#f8fafc` | 主文本、普通按钮文字 |
| `--muted` | `#9ca3af` | `#8b96a8` | 辅助说明、图标按钮默认色 |
| `--muted-strong` | `#6b7280` | `#b7c0cf` | 导航文字、较强辅助信息 |
| `--success` | `#10b981` | `#22c55e` | 成功、在线、switch 开启态 |
| `--danger` | `#ef4444` | `#fb7185` | 危险、错误、删除、离线 |
| `--warning` | `#f59e0b` | `#fbbf24` | 警告、启动中、停止提示 |
| `--shadow` | `0 2px 10px rgba(0, 0, 0, 0.04)` | `none` | 浅色面板轻阴影；暗色模式取消阴影 |

## 3. 推荐主题 CSS

```css
:root {
  color-scheme: light;
  --primary: #1e3a8a;
  --primary-soft: #dbeafe;
  --surface: #ffffff;
  --canvas: #f3f4f6;
  --sidebar: #e5e7eb;
  --line: #d1d5db;
  --line-soft: #e5e7eb;
  --text: #374151;
  --muted: #9ca3af;
  --muted-strong: #6b7280;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.theme-dark {
  color-scheme: dark;
  --primary: #3168f4;
  --primary-soft: #172554;
  --surface: #111827;
  --canvas: #0f172a;
  --sidebar: #080d14;
  --line: #273244;
  --line-soft: #1f2937;
  --text: #f8fafc;
  --muted: #8b96a8;
  --muted-strong: #b7c0cf;
  --success: #22c55e;
  --danger: #fb7185;
  --warning: #fbbf24;
  --shadow: none;
}
```

## 4. 按钮基础规范

| 属性 | 当前值 | 说明 |
| --- | --- | --- |
| 高度 | `34px` | 普通按钮统一高度 |
| 最小宽度 | `76px` | 保证中文双字命令不会过窄 |
| 左右内边距 | `13px` | 用于 icon + text 的紧凑按钮 |
| 图标间距 | `7px` | 按钮内 icon 与文字的 gap |
| 圆角 | `6px` | 控制台风格小圆角，不使用胶囊按钮 |
| 边框 | `1px solid var(--line)` | 普通按钮默认边框 |
| 字重 | `720` | 按钮文字偏粗，保证扫描效率 |
| 过渡 | `140ms ease` | `background`、`border`、`box-shadow`、`color` |
| 禁用态 | `opacity: 0.55; cursor: not-allowed` | 所有按钮继承统一 disabled 反馈 |

## 5. 按钮类型与配色

| 类型 | 默认配色 | Hover 配色 | 使用场景 |
| --- | --- | --- | --- |
| 默认按钮 / Secondary | 背景 `#ffffff`；边框 `var(--line)`；文字 `var(--text)` | 背景 `#f9fafb`；边框 `#b8c1cc`；阴影 `0 5px 12px rgba(17, 24, 39, 0.06)` | 取消、清空、普通操作、低风险命令 |
| 主按钮 / Primary | 背景 `var(--primary)`；边框 `var(--primary)`；文字 `#ffffff` | 背景/边框 `#2548a4` | 新建、保存、主要提交动作 |
| 危险按钮 / Danger | 背景 `var(--danger)`；边框 `var(--danger)`；文字 `#ffffff` | 背景/边框 `#dc2626` | 删除、破坏性操作、明确危险命令 |
| 图标按钮 | 透明背景；图标 `var(--muted)`；尺寸 `30px` | 背景 `#eff6ff`；图标 `var(--primary)` | 编辑、关闭、查看、轻量工具按钮 |
| 危险图标按钮 | 透明背景；图标 `var(--muted)` | 背景 `#fef2f2`；图标 `var(--danger)` | 删除图标、危险快捷操作 |
| 主题切换按钮 | 背景 `var(--surface)`；边框 `var(--line)`；文字 `var(--muted-strong)` | 边框/文字 `var(--primary)`；蓝色轻阴影 | 浅色/暗色切换 |
| 侧边栏激活按钮 | 背景 `var(--primary)`；文字 `#ffffff` | 保持主色激活态 | 当前页面导航 |
| Switch 关闭态 | 背景 `var(--line)`；白色圆点 | 无显式 hover | 关闭、未运行 |
| Switch 开启态 | 背景 `var(--success)`；圆点右移 `16px` | 无显式 hover | 启用、运行、在线 |
| Switch loading | 背景 `var(--primary)`；文字 `#ffffff`；spinner | disabled opacity 保持 `1` | 启动/停止请求进行中 |

## 6. 普通按钮 CSS

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 76px;
  height: 34px;
  padding: 0 13px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #ffffff;
  color: var(--text);
  font-weight: 720;
  transition: background 140ms ease, border 140ms ease, box-shadow 140ms ease, color 140ms ease;
}

.button:hover:not(:disabled) {
  border-color: #b8c1cc;
  background: #f9fafb;
  box-shadow: 0 5px 12px rgba(17, 24, 39, 0.06);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
```

## 7. 主按钮与危险按钮 CSS

```css
.button-primary {
  border-color: var(--primary);
  background: var(--primary);
  color: #ffffff;
}

.button-primary:hover:not(:disabled) {
  border-color: #2548a4;
  background: #2548a4;
}

.button-danger {
  border-color: var(--danger);
  background: var(--danger);
  color: #ffffff;
}

.button-danger:hover:not(:disabled) {
  border-color: #dc2626;
  background: #dc2626;
}
```

## 8. 图标按钮 CSS

```css
.icon-button {
  display: inline-grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  transition: color 140ms ease, background 140ms ease;
}

.icon-button:hover:not(:disabled) {
  background: #eff6ff;
  color: var(--primary);
}

.icon-button-danger:hover:not(:disabled) {
  background: #fef2f2;
  color: var(--danger);
}
```

## 9. Switch CSS

```css
.switch {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 24px;
  min-height: 24px;
  max-height: 24px;
  flex: 0 0 auto;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  background: var(--line);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12);
  transition: background 180ms ease;
}

.switch span {
  width: 20px;
  flex: 0 0 20px;
  height: 20px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 180ms ease;
}

.switch-on {
  background: var(--success);
}

.switch-on span {
  transform: translateX(16px);
}

.switch-loading {
  justify-content: center;
  background: var(--primary);
  color: #ffffff;
}

.switch-loading:disabled {
  opacity: 1;
}
```

## 10. 状态色使用规则

| 状态 | 颜色 | 使用位置 |
| --- | --- | --- |
| 成功 / 在线 | `var(--success)` | `switch-on`、`status-dot-online`、success toast icon |
| 警告 / 进行中 | `var(--warning)` | `status-dot-warning`、warning toast icon、停止提示 |
| 错误 / 离线 / 危险 | `var(--danger)` | `button-danger`、danger icon hover、`status-dot-offline`、error toast |
| 主操作 / 加载 | `var(--primary)` | `button-primary`、`switch-loading`、导航 active、focus ring |

## 11. 暗色模式按钮规则

当前项目已有暗色按钮覆盖：

```css
.theme-dark .button {
  background: #111827;
  color: var(--text);
  border-color: var(--line);
}

.theme-dark .button:hover:not(:disabled) {
  background: #182235;
  border-color: #3b4a61;
  box-shadow: none;
}

.theme-dark .icon-button:hover:not(:disabled) {
  background: #172554;
}

.theme-dark .icon-button-danger:hover:not(:disabled) {
  background: rgba(251, 113, 133, 0.14);
}
```

注意：当前 CSS 中 `.theme-dark .button` 写在 `.button-primary` 与 `.button-danger` 后面，会覆盖主按钮和危险按钮的背景、边框与文字，使其在暗色模式下更接近普通按钮。

如果希望暗色模式保留 primary/danger 语义色，建议补充：

```css
.theme-dark .button-primary {
  border-color: var(--primary);
  background: var(--primary);
  color: #ffffff;
}

.theme-dark .button-primary:hover:not(:disabled) {
  border-color: #4f7cff;
  background: #4f7cff;
}

.theme-dark .button-danger {
  border-color: var(--danger);
  background: var(--danger);
  color: #ffffff;
}

.theme-dark .button-danger:hover:not(:disabled) {
  border-color: #fb8fa0;
  background: #fb8fa0;
}
```

## 12. 弹窗设计规范

当前项目弹窗用于“新建隧道规则 / 编辑隧道规则”这类短表单操作，属于桌面控制台里的轻量编辑模态。

### 12.1 结构

| 区域 | 组成 | 设计规则 |
| --- | --- | --- |
| 遮罩层 | `.modal-backdrop` | 固定覆盖全屏，居中承载弹窗，弱化背景内容 |
| 弹窗主体 | `.modal` | 宽度 `min(480px, calc(100vw - 48px))`，适合 3-5 个表单项 |
| 弹窗头部 | `.modal-head` | 左侧标题，右侧关闭图标按钮 |
| 弹窗内容 | `.modal-body` | 表单主体，使用 grid 纵向排布 |
| 提示说明 | `.modal-note` | 图标 + 说明文字，用于补充规则或风险提示 |
| 弹窗底部 | `.modal-foot` | 右对齐操作按钮，通常是“取消 + 主操作” |

### 12.2 尺寸与层级

| 属性 | 当前值 | 说明 |
| --- | --- | --- |
| 遮罩层定位 | `position: fixed; inset: 0` | 覆盖整个应用窗口 |
| 遮罩层级 | `z-index: 40` | 低于 toast 的 `z-index: 50` |
| 对齐方式 | `display: grid; place-items: center` | 弹窗在视口中居中 |
| 弹窗宽度 | `min(480px, calc(100vw - 48px))` | 桌面宽度 480px，小窗口保留左右 24px 安全边距 |
| 弹窗圆角 | `10px` | 比普通卡片 `8px` 略大，突出浮层层级 |
| 弹窗阴影 | `0 24px 60px rgba(0, 0, 0, 0.25)` | 强阴影表达模态浮层 |
| 头尾内边距 | `16px 20px` | 标题区和操作区保持一致 |
| 内容内边距 | `20px` | 表单区域留出更完整的阅读空间 |
| 内容间距 | `14px` | 表单项纵向间距 |

### 12.3 配色

| 元素 | 浅色模式 | 暗色模式 | 说明 |
| --- | --- | --- | --- |
| 遮罩 | `rgba(17, 24, 39, 0.36)` | 同浅色 | 半透明深灰，避免纯黑压迫感 |
| 背景模糊 | `blur(5px)` | 同浅色 | 强化当前任务焦点 |
| 弹窗主体 | `#ffffff` | `#111827` | 暗色模式由 `.theme-dark .modal` 覆盖 |
| 头部/底部 | `#fafafa` | `#0f172a` | 与主体形成轻微分区 |
| 分隔线 | `var(--line-soft)` | `var(--line-soft)` | 头部底线、底部顶线 |
| 标题文字 | `var(--text)` | `var(--text)` | 使用主题主文本色 |
| 说明文字 | `var(--muted)` | `var(--muted)` | 用于 `.modal-note` |

### 12.4 操作按钮规则

- 关闭按钮使用 `IconButton`，放在头部右侧，图标为 `X`。
- 底部按钮右对齐，按钮顺序为“取消”在左，“保存/确认”在右。
- 取消按钮使用默认按钮样式，不使用危险色。
- 保存、确认、新建等提交动作使用 `button-primary`。
- 删除、重置等破坏性确认弹窗应使用 `button-danger`，并在内容区增加明确说明。
- 弹窗内不要放超过一个主按钮；避免“保存”“应用”“确认”同时出现。

### 12.5 动效

弹窗主体使用 `animate-slide-up`：

```css
.animate-slide-up {
  animation: slideUp 240ms ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

动效规则：

- 只对弹窗主体做轻微上移和缩放，不对遮罩做复杂动画。
- 时长保持在 `240ms` 左右，避免桌面工具显得拖沓。
- 弹窗出现时应立即聚焦任务，不使用弹跳、旋转等装饰性动效。

### 12.6 当前 CSS

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  background: rgba(17, 24, 39, 0.36);
  backdrop-filter: blur(5px);
}

.modal {
  width: min(480px, calc(100vw - 48px));
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.modal-head,
.modal-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  background: #fafafa;
}

.modal-head {
  border-bottom: 1px solid var(--line-soft);
}

.modal-head h3 {
  color: var(--text);
  font-size: 17px;
}

.modal-body {
  display: grid;
  gap: 14px;
  padding: 20px;
}

.modal-note {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--muted);
  font-size: 12px;
}

.modal-foot {
  justify-content: flex-end;
  border-top: 1px solid var(--line-soft);
}

.theme-dark .modal,
.theme-dark .toast {
  background: #111827;
}

.theme-dark .modal-head,
.theme-dark .modal-foot {
  background: #0f172a;
}
```

### 12.7 复用建议

- 弹窗适合短任务，不适合承载复杂多步骤流程；超过 5-6 个关键字段建议改为独立页面或抽屉。
- 内容区优先使用项目已有 `Field`、`TextInput`、`Button`、`IconButton`，保持控件一致。
- 表单弹窗宽度默认 `480px`；确认弹窗可缩小到 `400px` 左右，但仍保留 `calc(100vw - 48px)` 的安全边距。
- 弹窗说明文案使用 `modal-note`，不要把重要错误提示只放在 toast 里。
- 遮罩层级应低于 toast，确保弹窗内操作结果仍可被用户看到。
- 暗色模式下建议把弹窗主体、头尾区域、输入框背景都变量化，减少硬编码浅色残留。

## 13. 复用建议

- 保持 `primary / success / danger / warning` 四类语义色，不要为同一状态引入第二套颜色。
- 主按钮只用于页面的主要提交动作，例如“保存”“新建”。
- 危险按钮只用于破坏性操作，例如“删除”“停止后不可恢复”的动作。
- 普通按钮用于取消、清空、刷新、关闭等低风险操作。
- 高频小操作优先使用 `icon-button`，配合 `title` 或 tooltip 表达含义。
- Switch 只用于二元状态或启停动作，不要用于普通表单提交。
- 迁移到其他项目时，建议先复制主题 token，再迁移按钮 CSS，最后按业务补充组件变体。
