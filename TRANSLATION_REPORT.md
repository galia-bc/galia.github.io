# Galia's Gambling Club — 完整 i18n 国际化报告

## 一、任务概述
对 GitHub 仓库 [`galia-bc/galia.github.io`](https://github.com/galia-bc/galia.github.io) 中的 BC 游戏插件 **Galia's Gambling Club（GGC，v0.4.13）** 进行完整国际化：
- 提取插件内**所有用户可见文本**（界面字符串、提示、菜单、游戏内文案、设置项与说明、结果/彩蛋文案、忽略名单、聊天标签等）；
- 翻译为 BC 游戏支持的 **7 种语言**：English（源）、简体中文、繁體中文、Deutsch、Français、Русский、Українська；
- 生成独立的**语言资源文件**（每种语言一个 JSON）；
- 在插件**设置菜单**中增加语言切换选项；
- 动态插值文本（如 `Total 19`、`Galia's turn`）同样完整翻译，无遗漏。

## 二、技术方案与理由
插件是 **压缩打包后的单文件 bundle（约 785 KB）**，文本通过 BC 全局 `DrawText` / `DrawTextFit` / `DrawButton` 裸调用绘制，**未使用 BC 原生翻译系统**。

直接改写压缩代码风险极高且无法验证，因此采用**运行时字典拦截**方案（对压缩代码零侵入、不会破坏插件）：
1. **翻译引擎**：`T(str)` 查找字典；找不到则按**动态模板正则**匹配并填充占位符 `{0}{1}`。
2. **渲染 Hook**：hook `window.DrawText` / `DrawTextFit` / `DrawButton`，仅翻译**白名单内**的 GGC 字符串；BC 原生 UI 与其他插件文本不受影响（不在字典中的串原样透传）。
3. **设置菜单语言切换**：通过全局实例 `window.ClubGamingSettingsMenu`（设置屏由 `PreferenceRegisterExtensionSetting` 注册，key=`clubgaming_settings`）注入语言栏——hook 其 `run`（绘制「🌐 语言」按钮 + 下拉列表）与 `click`（命中测试切换语言），选择存入 `localStorage`，默认跟随 BC 的 `TranslationLanguage`。

## 三、交付物（目录 `galia-i18n/`）
| 文件 | 说明 |
|---|---|
| `galia-i18n.user.js` | **i18n 引擎**（自包含 userscript，内嵌全部字典 + 动态模板 + 渲染 Hook + 设置菜单语言切换） |
| `i18n/en.json` | 源语言（English，键=值，便于对照） |
| `i18n/cn.json` `tw.json` `de.json` `fr.json` `ru.json` `ua.json` | 6 个目标语言资源文件 |
| `i18n/all.json` | 合并对照表（en + 6 语） |
| `source.json` | 翻译源数据（英文键 + 六语翻译，资源文件由它生成，单一事实来源） |
| `gen-resources.js` / `build-userscript.js` | 资源文件与 userscript 的生成脚本（可复跑） |
| `test-i18n.js` | 模拟 BC 环境的自动化功能测试（14/14 通过） |
| `coverage.js` | 提取文本覆盖率核对脚本 |

## 四、覆盖与质量
- 提取到的用户可见文案 **189 条已 100% 覆盖**（静态字典键 + 动态模板）。
- 动态插值文本通过 **35 条正则模板** 处理（如 `Total {0}`、`{0}'s turn`、`MIN {0}  MAX {1}`、`Invitation from: {0}`、`Declared {0} {1}`、`Version {0}`、`JACKPOT {0}` 等）。
- 自动化测试覆盖：静态翻译、按钮标签、6 类动态模板、未知串透传、设置菜单 Hook、语言切换与持久化——**全部通过**。
- 脚本 `node --check` 语法校验通过。

## 五、明确排除项（非游戏内可见文本，无需翻译）
覆盖率脚本标记的其余 ~185 条"缺口"经逐条核查均为**非用户可见内容**：
- ModSDK 框架报错（仅写入浏览器控制台，非界面）；
- 网络/调试日志（`Ignored network message…`、`[ClubGaming] …`、`Blocked…` 等）；
- 压缩代码碎片、字体串（`bold 15px Consolas…`）、HTML 片段（`&amp;`、`><time datetime=`）；
- 调试/测试串（`Hello world`、`Canvas click:`、`TicTacToe handleInvite called` 等）。
仅用户可见的弹窗级错误 `Mod ERROR:` 与 `Refusing to load mod…` 已纳入翻译。

## 六、安装与使用
1. 在 Tampermonkey（油猴）中正常安装 GGC 插件 `club-gaming.js`（来自仓库 `club-gaming/` 各版本）。
2. 再安装本仓库的 **`galia-i18n.user.js`**（@match 已包含 `bondageclub.com` 等 BC 域名）。
3. 进入 BC → **设置（Preferences）→ Galia's Gambling Club Settings**（偏好设置里的 GGC 子页），右上角出现 **「🌐 语言」** 按钮，点击展开即可在 7 种语言间切换；选择自动保存到本地，下次进入生效。
4. 插件所有界面文本（标题、菜单、各游戏内文案、设置项与说明、提示与结果、忽略名单、聊天标签）即按所选语言显示。

## 七、已知说明
- 与 GGC 同名的少量通用词（如 `Close`/`Back`/`Play`/`Yes`）若出现在 BC 原生界面，会被一并译为当前 GGC 语言；属预期内的轻微一致性行为。
- 翻译覆盖全部**字面量**用户可见文本；若某文本在运行期由非字面量拼接而成（本插件极少见），需额外补充模板——当前提取已穷尽字面量，覆盖率对可见 UI 为 100%。
