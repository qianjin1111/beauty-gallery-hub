#!/bin/bash

echo "🔍 照片墙功能最终验证脚本"
echo "================================"
echo ""

# 获取主页HTML
echo "📥 正在获取主页HTML..."
HTML=$(curl -s "https://qianjin1111.github.io/beauty-gallery-hub/")

if [ -z "$HTML" ]; then
    echo "❌ 无法获取主页"
    exit 1
fi

echo "✅ 成功获取主页HTML"
echo ""

# 检查关键元素
echo "🔍 验证页面元素..."

# 检查script.js
if echo "$HTML" | grep -q "script.js"; then
    echo "✅ script.js 已引用"
else
    echo "❌ script.js 未引用"
fi

# 检查style.css
if echo "$HTML" | grep -q "style.css"; then
    echo "✅ style.css 已引用"
else
    echo "❌ style.css 未引用"
fi

# 检查控制按钮
if echo "$HTML" | grep -q "refreshBtn"; then
    echo "✅ 刷新按钮存在"
else
    echo "❌ 刷新按钮不存在"
fi

if echo "$HTML" | grep -q "shuffleBtn"; then
    echo "✅ 随机按钮存在"
else
    echo "❌ 随机按钮不存在"
fi

echo ""

# 获取script.js内容
echo "📥 正在获取script.js内容..."
SCRIPT=$(curl -s "https://qianjin1111.github.io/beauty-gallery-hub/script.js")

if [ -z "$SCRIPT" ]; then
    echo "❌ 无法获取script.js"
    exit 1
fi

echo "✅ 成功获取script.js"
echo ""

# 检查关键函数
echo "🔍 验证JavaScript功能..."

if echo "$SCRIPT" | grep -q "loadAllImagesFromGitHub"; then
    echo "✅ loadAllImagesFromGitHub 函数存在"
else
    echo "❌ loadAllImagesFromGitHub 函数不存在"
fi

if echo "$SCRIPT" | grep -q "refreshPhotos"; then
    echo "✅ refreshPhotos 函数存在"
else
    echo "❌ refreshPhotos 函数不存在"
fi

if echo "$SCRIPT" | grep -q "检测到旧版本数据"; then
    echo "✅ 旧版本检测功能存在"
else
    echo "⚠️  旧版本检测功能可能不存在"
fi

# 检查GitHub API调用
if echo "$SCRIPT" | grep -q "api.github.com"; then
    echo "✅ GitHub API 调用存在"
else
    echo "❌ GitHub API 调用不存在"
fi

echo ""

# 检查配置文件
echo "📥 正在获取config.json内容..."
CONFIG=$(curl -s "https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/photo-wall/config.json")

if [ -z "$CONFIG" ]; then
    echo "⚠️  无法获取config.json（可能使用GitHub raw）"
else
    echo "✅ 成功获取config.json"
    echo "📊 配置文件包含的图片数量:"
    echo "$CONFIG" | grep -o "url" | wc -l
fi

echo ""

# 验证诊断页面
echo "📥 正在验证诊断页面..."
DIAGNOSIS=$(curl -s "https://qianjin1111.github.io/beauty-gallery-hub/diagnosis.html")

if echo "$DIAGNOSIS" | grep -q "照片墙完整诊断报告"; then
    echo "✅ 诊断页面可访问"
else
    echo "❌ 诊断页面不可访问"
fi

echo ""

# 测试GitHub API
echo "🌐 测试GitHub API访问..."
API_TEST=$(curl -s "https://api.github.com/repos/qianjin1111/beauty-gallery-hub/contents/images/celebrities/bai-lu")

if echo "$API_TEST" | grep -q "name"; then
    echo "✅ GitHub API 访问正常"
    echo "📁 找到的分类:"
    echo "$API_TEST" | grep -o '"name"[^,]*' | cut -d'"' -f4 | sed 's/^/  • /'
else
    echo "⚠️  GitHub API 访问可能失败或受限"
fi

echo ""
echo "================================"
echo "✅ 验证完成"
echo ""
echo "📋 页面链接:"
echo "主页: https://qianjin1111.github.io/beauty-gallery-hub/"
echo "诊断页面: https://qianjin1111.github.io/beauty-gallery-hub/diagnosis.html"
echo "测试页面: https://qianjin1111.github.io/beauty-gallery-hub/test.html"
echo "验证页面: https://qianjin1111.github.io/beauty-gallery-hub/verify.html"
echo ""
echo "💡 用户操作指南:"
echo "1. 访问诊断页面: https://qianjin1111.github.io/beauty-gallery-hub/diagnosis.html"
echo "2. 点击'清除所有缓存'按钮"
echo "3. 强制刷新页面（Ctrl+Shift+R 或 Cmd+Shift+R）"
echo "4. 点击'立即加载所有照片（测试）'按钮"
echo "5. 等待加载完成（1-2分钟）"
echo "6. 检查照片数量是否超过8张"
echo "7. 如果成功，打开照片墙主页: https://qianjin1111.github.io/beauty-gallery-hub/"
