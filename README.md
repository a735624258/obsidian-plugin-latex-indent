# LaTeX Indent

[![version](https://img.shields.io/badge/version-1.0.0-blue.svg)](manifest.json)
[![minAppVersion](https://img.shields.io/badge/Obsidian-%3E%3D%200.15.0-7c3aed.svg)](manifest.json)
![license](https://img.shields.io/badge/license-unspecified-lightgrey.svg)

> **在 Obsidian 编辑器里按一次 Tab，插入一个 `$\qquad$ ` 公式缩进（2em）—— 缩进是渲染出来的，不是空格，导出、分享、换渲染器都不会被折叠掉。**

**English** — An Obsidian plugin: press `Tab` in the editor and it inserts a `$\qquad$ ` math snippet (a 2em indent). Because the indent is rendered math instead of whitespace, it survives export and sharing.

| | |
|---|---|
| 当前版本 | v1.0.0 |
| 许可 | 未指定（仓库暂无 `LICENSE` 文件） |
| 平台 | 桌面端 / 移动端（manifest 未标记桌面独占） |
| 支持范围 | Obsidian `>= 0.15.0`（manifest 的 `minAppVersion`） |
| 依赖 | 无 —— `obsidian` 与 `@codemirror/*` 由 Obsidian 运行时提供 |

---

## 1、为什么要做

在 Obsidian 里想让正文"段首空两格"，用空格是不成立的：

1. **Markdown 会折叠行首空白** —— 敲四个空格，预览和导出里照样顶格
2. **全角空格是假缩进** —— 看着像缩进，复制到别处、换个渲染器就露馅，还可能变乱码
3. **手打公式太啰嗦** —— `$\qquad$` 一共 8 个字符，每段都打一遍没人受得了

这个插件要解决的就是这三件事：**把缩进写成一个公式片段，让它跟着内容一起被渲染出来。**

## 2、它做什么

1. **插得进去** —— 光标处插入 `$\qquad$ `，一个 2em 的公式缩进 + 一个尾随空格
2. **接得住 Tab** —— 以编辑器键位扩展的方式注册 `Tab`，不用记新快捷键
3. **跟得住光标** —— 插入后光标落在缩进之后，接着打字不跳位
4. **不碰渲染** —— 不注册 Markdown 处理器、不加 CSS，预览与导出各走原路
5. **装上就用** —— 没有设置项、没有配置文件、没有命令面板入口

> **它的边界一句话说清：`Tab` 是唯一入口，而且不做公式环境判断。** 实现总共 27 行（`main.js`），"在公式环境里用"是使用习惯，不是代码约束。

## 3、怎么用

1. 打开一篇笔记，在实时预览或源码模式下把光标放进编辑区
2. 把光标移到要缩进的位置（通常是段落开头）
3. 按一次 `Tab` —— 该位置出现 `$\qquad$ `
4. 接着写正文，预览里看到的就是缩进后的效果

例子 —— 下面这段的第二行开头按过一次 `Tab`：

```markdown
这是顶格的段落。

$\qquad$ 这一段开头按了 Tab，渲染出来是 2em 的缩进。
```

| 操作 | 效果 |
|---|---|
| `Tab` | 在光标处插入 `$\qquad$ ` |
| `Tab`（有选区时） | 用 `$\qquad$ ` 替换整个选区 |
| `Ctrl/Cmd + Z` | 整段插入算一次编辑，一次撤销 |

插件不注册任何命令，入口只有 `Tab` 一个。

## 4、安装

### 4.1 三条路，按需要选一条

1. **要最新代码** —— clone 到插件目录（仓库目前没有 tag 和 Release，拉 `main` 分支即可）
   ```sh
   git clone git@github.com:a735624258/obsidian-plugin-latex-indent.git <vault>/.obsidian/plugins/latex-indent
   ```
2. **不想用 git** —— 在仓库页 `Code → Download ZIP`，把 `main.js` 与 `manifest.json` 放进 `<vault>/.obsidian/plugins/latex-indent/`
3. **要改代码** —— 同样是放到插件目录，直接改 `main.js`（没有构建步骤），重载插件即生效

> 目标目录名要用 `latex-indent`，与 manifest 里的 `id` 一致，否则 Obsidian 认不到这个插件。

### 4.2 装完要重载插件

Obsidian 是在启动时扫描插件目录的，新放进去的目录不会自动出现：**设置 → 第三方插件 → 关闭「受限模式」→ 用插件页右上角的刷新按钮（或重启 Obsidian）→ 打开 `LaTeX Indent` 开关**。

### 4.3 卸载

关掉插件开关 → 删除 `.obsidian/plugins/latex-indent/` 整个目录。插件不写任何数据文件，没有残留。

### 4.4 兼容性与注意事项

| 项 | 说明 |
|---|---|
| 最低 Obsidian 版本 | `0.15.0`（manifest 的 `minAppVersion`） |
| 平台 | manifest 未标桌面独占；触发依赖 `Tab` 键 |
| 公式渲染 | `$\qquad$` 需要会渲染公式的目标（Obsidian 预览、支持数学的导出） |
| 已验证范围 | 仓库只声明 `0.15.0` 起可用，更大版本未做系统性验证 |

1. **`Tab` 是全量接管** —— 用 `Prec.highest` + `preventDefault` 抢的键，Obsidian 原生的 Tab 行为（列表缩进、表格跳格、补全接受）会失效
2. **不看上下文** —— 不做公式环境检测，在普通正文里按 `Tab` 一样会插入
3. **有选区会替换** —— 选中一段文字再按 `Tab`，选中的内容会被缩进片段顶掉
4. **没有设置项** —— 没有开关也没有参数，行为固定；想恢复原生 Tab 只能关掉插件
5. **渲染器不认就露原形** —— 导出到不渲染公式的目标，看到的是字面的 `$\qquad$`

## 5、它是怎么做到的

```
[编辑器]  你按 Tab
            ↓ CodeMirror 6 keymap（Prec.highest，preventDefault: true）
[插件]    changeByRange 在光标处插入 "$\qquad$ "
            ↓ dispatch 事务
[编辑器]  文档更新，光标落到插入内容之后
            ↓ 预览 / 导出 / 分享
[渲染器]  数学渲染器把 \qquad 画成 2em 宽的空格
```

1. **缩进用公式写** —— 空格会被 Markdown 折叠，`\qquad` 交给数学渲染器画成 2em，跟着内容一起走
2. **尾随空格是刻意的** —— 插入字符串结尾有一个空格：紧挨数字时避免它被读进公式，也顺手把光标与后文隔开
3. **只占编辑器这一层** —— 仅 `registerEditorExtension`，不碰 Markdown 处理器、渲染器与 CSS，所以预览、导出、分享各走各自原有的路径
4. **一次事务、一次撤销** —— 插入走 `changeByRange` 并显式设置光标位置，整段缩进在撤销栈里算一次编辑
5. **没有额外能力** —— 不联网、不读写仓库文件、不存数据、不注册命令，全部逻辑就是一次文本插入

## 6、开发

```sh
git clone git@github.com:a735624258/obsidian-plugin-latex-indent.git   # 取代码
# 装依赖：无（没有 package.json，obsidian 与 @codemirror/* 由 Obsidian 运行时提供）
# 构建：  无（main.js 就是产物，改完即生效）
# 测试：  无自动化测试，手动验证
```

调试方式：把仓库根目录整个放进 `<vault>/.obsidian/plugins/latex-indent/`，改完 `main.js` 后在插件页重载一次；验证就是按 `Tab` 看插入结果与预览效果。

```
obsidian-plugin-latex-indent/
├── manifest.json   # 插件清单：id / 版本 / minAppVersion / 平台标记
├── main.js         # 全部实现：注册 Tab 键位并插入缩进
└── README.md
```

---

## 更新日志

最近 3 条（当前实际只有 2 条）：

- **v1.0.0** —— 首个版本：在编辑器里按 `Tab` 插入 `$\qquad$ ` 缩进
- **文档** —— README 按规范重写，历史拆进 `CHANGELOG.md`（纯文档改动，不占版本号）

完整历史见 **[CHANGELOG.md](CHANGELOG.md)**。

---

许可未指定 · 仓库暂无 `LICENSE` 文件
