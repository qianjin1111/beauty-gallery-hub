#!/bin/bash

echo "🧪 照片墙功能验证脚本"
echo "====================="
echo ""

# 获取主页HTML
echo "📥 正在获取主页..."
HTML=$(curl -s "https://qianjin1111.github.io/beauty-gallery-hub/")

# 检查是否成功获取
if [ -z "$HTML" ]; then
    echo "❌ 无法获取主页"
    exit 1
fi

echo "✅ 成功获取主页"
echo ""

# 检查关键元素
echo "🔍 检查关键元素..."

if echo "$HTML" | grep -q "script.js"; then
    echo "✅ script.js 已加载"
else
    echo "❌ script.js 未找到"
fi

if echo "$HTML" | grep -q "config.json"; then
    echo "✅ config.json 引用存在"
else
    echo "❌ config.json 引用未找到"
fi

if echo "$HTML" | grep -q "PhotoWall"; then
    echo "✅ PhotoWall 相关元素存在"
else
    echo "⚠️  PhotoWall 元素未在HTML中找到"
fi

echo ""
echo "📋 页面内容摘要:"
echo "$HTML" | grep -E "(script|link|title)" | head -10

echo ""
echo "🌐 页面链接:"
echo "主页: https://qianjin1111.github.io/beauty-gallery-hub/"
echo "测试页面: https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/test.html"
echo "验证页面: https://qianjin1111.github.io/beauty-gallery-hub/photo-wall/verify.html"
