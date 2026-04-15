# 🚀 AI Beauty Gallery 使用指南

## 📋 快速开始

### 1. 克隆仓库（可选）

```bash
git clone git@github.com:qianjin1111/ai-beauty-gallery.git
cd ai-beauty-gallery
```

### 2. 添加图片

将AI生成的美女图片放到对应的目录：
- `images/realistic/` - 写实风格
- `images/anime/` - 二次元风格
- `images/artistic/` - 艺术风格
- `images/others/` - 其他风格

### 3. 提交到GitHub

```bash
git add .
git commit -m "添加新图片：[描述]"
git push origin main
```

---

## 📷 添加图片的详细步骤

### 步骤1：准备图片

1. 生成或下载AI美女图片
2. 确保图片质量良好
3. 按风格分类

### 步骤2：重命名图片（推荐）

建议使用以下命名格式：
```
YYYY-MM-DD-风格描述-序号.扩展名
```

示例：
- `2024-04-15-realistic-portrait-001.jpg`
- `2024-04-15-anime-girl-001.jpg`
- `2024-04-15-artistic-oil-painting-001.jpg`

### 步骤3：放到对应目录

```
ai-beauty-gallery/
└── images/
    ├── realistic/
    │   └── 2024-04-15-realistic-portrait-001.jpg
    ├── anime/
    │   └── 2024-04-15-anime-girl-001.jpg
    └── artistic/
        └── 2024-04-15-artistic-oil-painting-001.jpg
```

### 步骤4：提交到GitHub

```bash
# 添加所有图片
git add images/

# 提交（添加描述）
git commit -m "添加2024-04-15的新图片"

# 推送到GitHub
git push origin main
```

---

## 🎨 图片分类说明

### `realistic/` - 写实风格

**适合内容**：
- 真实感强的人像
- 接近摄影照片的效果
- 高清、逼真的美女图片

**特点**：
- 分辨率高
- 细节丰富
- 适合作为头像、壁纸

### `anime/` - 二次元风格

**适合内容**：
- 动漫、漫画风格的美女
- 日系、韩系动漫风格
- 游戏角色风格

**特点**：
- 色彩鲜艳
- 线条清晰
- 适合ACG爱好者

### `artistic/` - 艺术风格

**适合内容**：
- 艺术、插画风格的美女
- 油画、水彩、素描风格
- 抽象、印象派风格

**特点**：
- 艺术性强
- 独特风格
- 适合艺术欣赏

### `others/` - 其他风格

**适合内容**：
- 混合风格
- 特殊风格
- 不属于上述分类的图片

**特点**：
- 灵活分类
- 便于管理

---

## 🔧 Git操作技巧

### 查看图片历史

```bash
# 查看提交历史
git log --oneline

# 查看某个文件的修改历史
git log --follow -- images/realistic/2024-04-15-realistic-portrait-001.jpg
```

### 删除图片

```bash
# 删除文件
git rm images/realistic/2024-04-15-realistic-portrait-001.jpg

# 提交删除
git commit -m "删除图片：2024-04-15-realistic-portrait-001.jpg"

# 推送到GitHub
git push origin main
```

### 恢复删除的图片

```bash
# 查找被删除的文件
git log --diff-filter=D --summary

# 恢复文件
git checkout <commit-hash> -- images/realistic/2024-04-15-realistic-portrait-001.jpg

# 提交恢复
git commit -m "恢复图片：2024-04-15-realistic-portrait-001.jpg"
git push origin main
```

---

## 💡 最佳实践

### 1. 定期整理

建议：
- 每月整理一次图片
- 删除质量不佳的图片
- 合并重复的图片
- 优化目录结构

### 2. 备份重要图片

虽然GitHub会保存所有版本，但建议：
- 定期下载重要图片到本地
- 使用云存储备份
- 考虑使用Git LFS存储大文件

### 3. 描述性提交信息

建议使用清晰的提交信息：
- ✅ 好的例子：`添加2024-04-15的5张写实风格图片`
- ❌ 不好的例子：`添加图片`

### 4. 图片大小控制

建议：
- 单个图片大小控制在10MB以内
- 如果图片太大，考虑压缩
- 大文件可以使用Git LFS

---

## 📦 Git LFS 配置（可选）

如果图片文件很大（>10MB），建议使用Git LFS：

### 安装Git LFS

```bash
# macOS
brew install git-lfs

# Linux
sudo apt-get install git-lfs

# Windows
# 从 https://git-lfs.github.com/ 下载安装
```

### 启用Git LFS

```bash
# 在仓库中初始化Git LFS
git lfs install

# 跟踪图片文件
git lfs track "*.jpg"
git lfs track "*.png"
git lfs track "*.webp"
git lfs track "*.jpeg"

# 提交配置
git add .gitattributes
git commit -m "配置Git LFS"
git push origin main
```

---

## 🔗 相关链接

- **GitHub仓库**：https://github.com/qianjin1111/ai-beauty-gallery
- **Git LFS文档**：https://git-lfs.github.com/
- **GitHub文档**：https://docs.github.com/

---

**📅 创建日期**：2024-04-15
**👤 维护者**：qianjin1111
**🔒 可见性**：私有（Private）
