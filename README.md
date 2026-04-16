# 白鹿美图馆 - 项目说明

## 🌟 项目简介

白鹿美图馆是一个现代化的照片展示平台，提供两种不同的浏览模式：瀑布流和3D星海。项目采用纯前端技术实现，无需后端支持，部署在 GitHub Pages 上。

## 🎯 项目特点

### 两种浏览模式

#### 📷 瀑布流模式
- 自动轮播照片
- 大图预览功能
- 图片分类管理
- 键盘快捷键支持
- 图片添加和删除

#### ✨ 3D星海模式
- 3D旋转木马效果
- 星空背景动画
- 分类筛选功能
- 沉浸式体验
- 响应式设计

### 技术亮点
- 纯前端实现（HTML + CSS + JavaScript）
- 无框架依赖
- 响应式设计
- 移动端完美支持
- GitHub Pages 自动部署
- 开源免费

## 🚀 快速开始

### 访问地址
- **主页**: https://qianjin1111.github.io/beauty-gallery-hub/
- **瀑布流**: https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/
- **3D星海**: https://qianjin1111.github.io/beauty-gallery-hub/photo-wall-3d/

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/qianjin1111/beauty-gallery-hub.git

# 进入目录
cd beauty-gallery-hub

# 使用 Live Server 或其他 HTTP 服务器
# 例如使用 Python:
python -m http.server 8000

# 访问 http://localhost:8000
```

## 📁 项目结构

```
beauty-gallery-hub/
├── index.html                    # 主页导航页面
├── photo-wall/                   # 瀑布流模式
│   ├── index.html               # 主页面
│   ├── style.css                # 样式文件
│   ├── script.js                # 功能脚本
│   ├── config.json              # 配置文件
│   ├── test.html                # 测试页面
│   ├── test-images.html         # 图片测试
│   ├── verify.html              # 验证页面
│   ├── diagnosis.html           # 诊断页面
│   └── MODAL_FEATURE.md         # 功能说明
├── photo-wall-3d/               # 3D星海模式
│   ├── index.html               # 主页面
│   ├── preview.html             # 预览页面
│   └── config.json              # 配置文件
├── .github/                     # GitHub 配置
│   └── workflows/
│       └── pages.yml            # 自动部署配置
├── images/                      # 图片资源
│   └── celebrities/
│       └── bai-lu/              # 白鹿照片
├── docs/                        # 项目文档
├── README.md                    # 项目说明
└── ...                          # 其他文档
```

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 页面结构
- **CSS3**: 样式和动画
- **JavaScript**: 交互功能
- **Three.js**: 3D效果（仅3D星海模式）

### 开发工具
- **Git**: 版本控制
- **GitHub Pages**: 托管和部署
- **GitHub Actions**: 自动部署

## 📚 功能说明

### 瀑布流模式
- ✅ 自动轮播照片
- ✅ 大图预览功能
- ✅ 图片分类管理
- ✅ 添加/删除照片
- ✅ 随机切换
- ✅ 键盘快捷键
- ✅ 图片懒加载
- ✅ 本地存储

### 3D星海模式
- ✅ 3D旋转木马
- ✅ 星空背景动画
- ✅ 分类筛选
- ✅ 鼠标拖拽交互
- ✅ 自动旋转
- ✅ 响应式设计

### 主页导航
- ✅ 动态星空背景
- ✅ 卡片式导航
- ✅ 流畅动画效果
- ✅ 移动端适配

## 🔧 配置说明

### 瀑布流配置
```json
{
  "images": [
    {
      "url": "图片URL",
      "category": "分类名称",
      "source": "图片来源"
    }
  ],
  "settings": {
    "interval": 3000,
    "autoFetch": true,
    "fetchInterval": 60
  }
}
```

### 3D星海配置
```json
{
  "categories": ["广告/代言", "写真/大片", "红毯"],
  "defaultCategory": "全部"
}
```

## 🌐 部署说明

### 自动部署
项目使用 GitHub Actions 自动部署到 GitHub Pages：
- 推送代码到 master 分支
- 自动触发部署流程
- 约 18s 完成部署
- 自动更新网站

### 手动部署
```bash
# 推送代码
git add .
git commit -m "更新内容"
git push origin master

# 等待 GitHub Actions 完成部署
# 访问 https://qianjin1111.github.io/beauty-gallery-hub/
```

## 📖 使用文档

- **快速指南**: [USER_GUIDE.md](./USER_GUIDE.md)
- **部署文档**: [NAVIGATION_DEPLOYMENT.md](./NAVIGATION_DEPLOYMENT.md)
- **功能总结**: [DEPLOYMENT_COMPLETE.md](./DEPLOYMENT_COMPLETE.md)
- **大图预览**: [photo-wall/MODAL_FEATURE.md](./photo-wall/MODAL_FEATURE.md)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 👥 作者

- 项目维护者: qianjin1111
- GitHub: https://github.com/qianjin1111/beauty-gallery-hub

## 🙏 致谢

- 白鹿照片来源
- Three.js 团队
- GitHub Pages

## 📞 联系方式

- GitHub Issues: https://github.com/qianjin1111/beauty-gallery-hub/issues

---

**版本**: v2.2
**更新时间**: 2026-04-16
**状态**: ✅ 正常运行
