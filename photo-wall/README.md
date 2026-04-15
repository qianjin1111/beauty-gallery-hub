# 🦌 白鹿照片墙

> 一个功能强大的白鹿照片墙应用，支持自动轮播、图片管理、自动拉取等功能。

## ✨ 特性

- 🔄 **自动轮播** - 自动播放图片，可自定义间隔时间
- ⏯️ **手动控制** - 支持上一张、下一张、暂停/播放
- 🎲 **随机排列** - 一键随机排列所有图片
- ➕ **添加图片** - 通过URL添加新图片
- 🗑️ **删除图片** - 支持批量删除图片
- 🔄 **自动拉取** - 定时从GitHub仓库拉取新图片
- 💾 **本地存储** - 图片和设置自动保存到本地
- 📱 **响应式设计** - 完美适配手机、平板、电脑

## 🚀 快速开始

### 在线预览（已部署）

✅ **GitHub Pages已部署完成！**

🌐 **主页面**：https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/

📋 **预览页面**：https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/preview.html

> 📌 注意：照片墙是 beauty-gallery-hub 项目的一部分

### 本地运行

如果想在本地运行，可以直接打开HTML文件或使用本地服务器：

```bash
# 克隆项目
git clone https://github.com/qianjin1111/beauty-gallery-hub.git
cd beauty-gallery-hub/photo-wall

# 方法1：直接打开
open index.html

# 方法2：使用本地服务器
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 使用方法

1. **浏览图片**
   - 使用 ⬅️ 上一张 和 ➡️ 下一张 按钮切换图片
   - 点击下方的缩略图快速跳转
   - 点击图片列表中的图片直接预览

2. **控制轮播**
   - 点击 ⏸️ 暂停 或 ▶️ 播放 按钮控制轮播
   - 在设置中调整轮播间隔时间（1-60秒）

3. **添加图片**
   - 在"添加图片"区域输入图片URL
   - 输入图片分类（如：红毯/活动）
   - 点击"添加图片"按钮

4. **管理图片**
   - 在"图片列表"中勾选要删除的图片
   - 点击"删除选中"按钮批量删除
   - 使用"全选"按钮快速选择所有图片
   - 使用"清空所有"按钮删除所有图片（谨慎操作）

5. **刷新图片**
   - 点击 🔄 刷新图片 按钮从GitHub拉取新图片
   - 在设置中启用"自动拉取新图片"
   - 设置拉取间隔时间（10-1440分钟）

## 📷 默认图片来源

默认从以下GitHub仓库获取白鹿照片：

```
https://github.com/qianjin1111/ai-beauty-gallery/tree/main/images/celebrities/bai-lu
```

**仓库状态**：✅ 公开（Public）

支持的分类：
- 红毯/活动
- 写真/大片
- 剧照
- 日常/机场
- 综艺
- 广告代言
- 杂志
- 活动/公开场合
- 其他

**说明**：
- ai-beauty-gallery仓库已设置为公开
- GitHub Pages可以正常访问其中的图片
- 默认加载8张精选白鹿照片
- 可以通过"刷新图片"按钮获取更多照片

## ⚙️ 配置说明

### 轮播间隔
- 范围：1-60秒
- 默认：3秒
- 设置位置：设置面板

### 自动拉取
- 开关：启用/禁用
- 间隔：10-1440分钟
- 默认：60分钟
- 设置位置：设置面板

## 💾 数据存储

所有数据存储在浏览器的 `localStorage` 中：

- **图片数据**：`baiLuPhotos`
- **设置数据**：`baiLuSettings`

**注意事项**：
- 清除浏览器缓存会删除所有数据
- 建议定期导出数据
- 最大支持500张图片

## 📱 响应式设计

支持以下设备：
- 📱 手机（< 768px）
- 📱 平板（768px - 1024px）
- 💻 电脑（> 1024px）

## 🎨 效果预览

### 功能展示

查看 [preview.html](preview.html) 查看完整的功能特性展示。

### 主要功能

- 🔄 **自动轮播** - 照片自动播放，循环展示
- ⏯️ **手动控制** - 上一张、下一张、暂停/播放
- 🎲 **随机排列** - 一键随机排列所有照片
- ➕ **添加图片** - 通过URL添加新图片
- 🗑️ **删除图片** - 批量删除不需要的图片
- 🔄 **自动拉取** - 从GitHub仓库拉取新图片
- 💾 **本地存储** - 所有数据自动保存到本地
- 📱 **响应式设计** - 完美适配各种设备

### 预览说明

由于GitHub不支持直接在README中显示实时GIF动画，你可以：

1. 访问 [preview.html](preview.html) 查看功能展示
2. 访问 [index.html](index.html) 体验完整功能
3. 查看 [PREVIEW_GUIDE.md](PREVIEW_GUIDE.md) 了解如何生成GIF预览图

## 🔧 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **JavaScript (ES6+)** - 交互逻辑
- **LocalStorage API** - 数据存储
- **GitHub API** - 图片获取

## 📦 项目结构

```
beauty-gallery-hub/photo-wall/
├── index.html               # 主页面
├── style.css                # 样式文件（500+行）
├── script.js                # 功能脚本（600+行）
├── config.json              # 配置文件
├── preview.html             # 预览页面
├── README.md                # 说明文档
├── IMAGE_LOADING_FIX.md     # 图片加载问题修复报告
├── IMAGE_LIST_FIX.md        # 图片列表问题修复报告
└── FINAL_CONFIG_REPORT.md   # 最终配置报告
```

## 🌐 部署信息

- **部署平台**：GitHub Pages
- **部署状态**：✅ 已部署
- **最后部署**：2026-04-15 14:56:06 UTC
- **仓库可见性**：公开（Public）
- **构建类型**：Legacy（基于主分支）

### 部署链接

- **主页面**：https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/
- **预览页面**：https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/preview.html

## 🌟 功能特性详解

### 1. 自动轮播
- 自动播放所有图片
- 循环播放
- 可自定义间隔时间
- 支持暂停/播放

### 2. 手动控制
- 上一张/下一张按钮
- 缩略图快速跳转
- 图片列表直接预览
- 随机排列功能

### 3. 图片管理
- 添加新图片（通过URL）
- 批量删除图片
- 全选/反选功能
- 清空所有图片

### 4. 自动拉取
- 从GitHub仓库获取新图片
- 定时自动拉取
- 手动触发刷新
- 去重处理

### 5. 本地存储
- 图片数据持久化
- 设置自动保存
- 跨会话保持

### 6. 响应式设计
- 自适应屏幕尺寸
- 移动端优化
- 平板端适配
- 桌面端完美显示

## 🔐 隐私说明

- 所有数据存储在本地浏览器
- 不会上传任何个人信息
- 图片数据仅用于展示
- 不会收集使用统计

## 📝 更新日志

### v1.0.0 (2026-04-15)
- ✅ 初始版本发布
- ✅ 实现自动轮播功能
- ✅ 实现图片管理功能
- ✅ 实现自动拉取功能
- ✅ 实现本地存储功能
- ✅ 实现响应式设计

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👏 致谢

- 感谢 [GitHub](https://github.com) 提供的代码托管服务
- 感谢所有贡献者的支持

## 📮 联系方式

- **项目地址**：https://github.com/qianjin1111/beauty-gallery-hub
- **问题反馈**：https://github.com/qianjin1111/beauty-gallery-hub/issues

---

**🦌 白鹿照片墙 - 让美好触手可及**

*Made with ❤️ by OpenClaw AI助手*
