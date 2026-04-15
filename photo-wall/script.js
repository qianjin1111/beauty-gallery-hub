// 白鹿照片墙 - JavaScript功能

class PhotoWall {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.isPlaying = true;
        this.interval = 3000;
        this.timer = null;
        this.settings = {
            autoFetch: true,
            fetchInterval: 60,
            sourceUrl: 'https://github.com/qianjin1111/beauty-gallery-hub/tree/main/images/celebrities/bai-lu'
        };

        this.init();
    }

    async init() {
        // 从本地存储加载图片
        this.loadImagesFromStorage();
        this.loadSettingsFromStorage();

        // 如果没有图片，从默认源加载
        if (this.images.length === 0) {
            await this.loadDefaultImages();
        }

        // 初始化UI
        this.initUI();

        // 开始轮播
        this.startSlideshow();

        // 如果启用自动拉取，设置定时器
        if (this.settings.autoFetch) {
            this.setFetchTimer();
        }
    }

    // 从本地存储加载图片
    loadImagesFromStorage() {
        const stored = localStorage.getItem('baiLuPhotos');
        if (stored) {
            this.images = JSON.parse(stored);
        }
    }

    // 保存图片到本地存储
    saveImagesToStorage() {
        localStorage.setItem('baiLuPhotos', JSON.stringify(this.images));
    }

    // 从本地存储加载设置
    loadSettingsFromStorage() {
        const stored = localStorage.getItem('baiLuSettings');
        if (stored) {
            this.settings = { ...this.settings, ...JSON.parse(stored) };
        }
    }

    // 保存设置到本地存储
    saveSettingsToStorage() {
        localStorage.setItem('baiLuSettings', JSON.stringify(this.settings));
    }

    // 加载默认图片
    async loadDefaultImages() {
        try {
            const defaultImages = [
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/bb1b4ec8-33f4-4da5-8f44-487fba5bcbdb.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/6a721898-21f8-4644-b7de-11b08f14a68e.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/6ac2ef07-7cc8-4587-ab31-aa8b23a812bb.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/43fad7ba-ce32-4eda-ad9f-a8d48b06734e.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/daily/be5fe7de-721b-4fb8-bafd-330d48591bcb.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/daily/51b9992b-281b-4fb9-ba7d-abbaf10b9663.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/events/07c6c2b4-f962-4b9b-a6da-ad981162adf6.jpg',
                    category: '活动/公开场合',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/events/d889f8af-f51e-458e-8679-3d1145b39759.jpg',
                    category: '活动/公开场合',
                    source: 'beauty-gallery-hub'
                }
            ];

            this.images = defaultImages;
            this.saveImagesToStorage();
            this.showToast('已加载白鹿照片', 'success');
        } catch (error) {
            this.showToast('加载默认图片失败', 'error');
            console.error('加载默认图片失败:', error);
        }
    }

    // 初始化UI
    initUI() {
        // 绑定按钮事件
        document.getElementById('prevBtn').addEventListener('click', () => this.previousPhoto());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextPhoto());
        document.getElementById('toggleBtn').addEventListener('click', () => this.toggleSlideshow());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shufflePhotos());
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshPhotos());
        document.getElementById('addBtn').addEventListener('click', () => this.addPhoto());
        document.getElementById('deleteSelectedBtn').addEventListener('click', () => this.deleteSelected());
        document.getElementById('selectAllBtn').addEventListener('click', () => this.selectAll());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());

        // 加载设置到UI
        document.getElementById('interval').value = this.interval / 1000;
        document.getElementById('autoFetch').checked = this.settings.autoFetch;
        document.getElementById('fetchInterval').value = this.settings.fetchInterval;

        // 更新显示
        this.updateDisplay();
        this.updateThumbnails();
        this.updateImageList();
        this.updateStats();
    }

    // 更新显示
    updateDisplay() {
        const currentPhoto = document.getElementById('currentPhoto');
        const photoIndex = document.getElementById('photoIndex');
        const photoCategory = document.getElementById('photoCategory');

        if (this.images.length > 0) {
            const currentImage = this.images[this.currentIndex];

            // 添加加载中状态
            currentPhoto.style.opacity = '0.5';
            photoIndex.textContent = `加载中...`;
            photoCategory.textContent = currentImage.category || '未分类';

            // 设置图片源
            currentPhoto.src = currentImage.url;

            // 添加加载完成事件
            currentPhoto.onload = function() {
                this.style.opacity = '1';
                photoIndex.textContent = `${parseInt(this.dataset.index) + 1} / ${parseInt(this.dataset.total)}`;
            };

            // 添加加载错误处理
            currentPhoto.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3Ctext fill="%23dc3545" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3E图片加载失败%3C/text%3E%3Ctext fill="%23666" font-family="Arial" font-size="16" x="50%25" y="60%25" text-anchor="middle"%3E请刷新页面重试%3C/text%3E%3C/svg%3E';
                this.style.opacity = '1';
            };

            // 设置数据属性
            currentPhoto.dataset.index = this.currentIndex;
            currentPhoto.dataset.total = this.images.length;
        } else {
            currentPhoto.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3Ctext fill="%23666" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3E暂无图片%3C/text%3E%3C/svg%3E';
            currentPhoto.style.opacity = '1';
            photoIndex.textContent = '0 / 0';
            photoCategory.textContent = '暂无图片';
        }
    }

    // 更新缩略图
    updateThumbnails() {
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = '';

        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.url;
            thumbnail.className = `thumbnail ${index === this.currentIndex ? 'active' : ''}`;
            thumbnail.loading = 'lazy';

            // 添加加载错误处理
            thumbnail.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23f0f0f0" width="80" height="80"/%3E%3Ctext fill="%23999" font-family="Arial" font-size="10" x="50%25" y="50%25" text-anchor="middle"%3E错误%3C/text%3E%3C/svg%3E';
            };

            thumbnail.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateDisplay();
                this.updateThumbnails();
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // 更新图片列表
    updateImageList() {
        const imageListContainer = document.getElementById('imageList');
        imageListContainer.innerHTML = '';

        this.images.forEach((image, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.dataset.index = index;

            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.category || '未分类';
            img.loading = 'lazy';

            // 添加加载错误处理
            img.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23f0f0f0" width="150" height="150"/%3E%3Ctext fill="%23999" font-family="Arial" font-size="12" x="50%25" y="50%25" text-anchor="middle"%3E加载失败%3C/text%3E%3C/svg%3E';
            };

            // 添加加载完成事件
            img.onload = function() {
                imageItem.classList.add('loaded');
            };

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'image-item-checkbox';
            checkbox.dataset.index = index;

            const info = document.createElement('div');
            info.className = 'image-item-info';
            info.innerHTML = `<span>${index + 1}. ${image.category || '未分类'}</span>`;

            imageItem.appendChild(checkbox);
            imageItem.appendChild(img);
            imageItem.appendChild(info);

            imageItem.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    this.currentIndex = index;
                    this.updateDisplay();
                    this.updateThumbnails();
                }
            });

            imageListContainer.appendChild(imageItem);
        });
    }

    // 更新统计信息
    updateStats() {
        document.getElementById('totalImages').textContent = this.images.length;

        const categories = [...new Set(this.images.map(img => img.category || '未分类'))];
        document.getElementById('totalCategories').textContent = categories.length;

        const now = new Date();
        document.getElementById('lastUpdate').textContent = now.toLocaleString('zh-CN');
    }

    // 上一张
    previousPhoto() {
        if (this.images.length === 0) return;

        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateDisplay();
        this.updateThumbnails();
    }

    // 下一张
    nextPhoto() {
        if (this.images.length === 0) return;

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateDisplay();
        this.updateThumbnails();
    }

    // 开始轮播
    startSlideshow() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.nextPhoto();
        }, this.interval);

        this.isPlaying = true;
        this.updateToggleButtonText();
    }

    // 停止轮播
    stopSlideshow() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.isPlaying = false;
        this.updateToggleButtonText();
    }

    // 切换轮播
    toggleSlideshow() {
        if (this.isPlaying) {
            this.stopSlideshow();
            this.showToast('轮播已暂停', 'info');
        } else {
            this.startSlideshow();
            this.showToast('轮播已开始', 'success');
        }
    }

    // 更新切换按钮文字
    updateToggleButtonText() {
        const toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.textContent = this.isPlaying ? '⏸️ 暂停' : '▶️ 播放';
    }

    // 随机排列
    shufflePhotos() {
        if (this.images.length < 2) {
            this.showToast('图片数量不足，无法随机排列', 'error');
            return;
        }

        // Fisher-Yates 洗牌算法
        for (let i = this.images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
        }

        this.currentIndex = 0;
        this.saveImagesToStorage();
        this.updateDisplay();
        this.updateThumbnails();
        this.updateImageList();
        this.showToast('已随机排列图片', 'success');
    }

    // 刷新图片（从GitHub拉取）
    async refreshPhotos() {
        try {
            this.showToast('正在刷新白鹿照片...', 'info');

            // 从beauty-gallery-hub仓库获取更多白鹿照片
            const newImages = [
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/feb9456c-c1b2-43ff-95fd-f28e9d5ccfb1.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/1a8d0370-226f-4383-96ce-9e302651b309.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/38f5c696-28ff-4f9b-8102-9eaacb569a08.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/photoshoot/cb94868e-8448-4139-b842-54a6de164b62.jpg',
                    category: '写真/大片',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/main/images/celebrities/bai-lu/daily/8d0c1dda-e15e-4287-9bea-a717237e94a9.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                }
            ];

            // 添加新图片（去重）
            let addedCount = 0;
            newImages.forEach(newImage => {
                const exists = this.images.some(img => img.url === newImage.url);
                if (!exists) {
                    this.images.push(newImage);
                    addedCount++;
                }
            });

            if (addedCount > 0) {
                this.saveImagesToStorage();
                this.updateDisplay();
                this.updateThumbnails();
                this.updateImageList();
                this.updateStats();
                this.showToast(`已添加 ${addedCount} 张白鹿照片`, 'success');
            } else {
                this.showToast('没有新照片可添加', 'info');
            }

            // 重置最后更新时间
            const now = new Date();
            document.getElementById('lastUpdate').textContent = now.toLocaleString('zh-CN');

        } catch (error) {
            this.showToast('刷新照片失败', 'error');
            console.error('刷新照片失败:', error);
        }
    }

    // 添加图片
    addPhoto() {
        const urlInput = document.getElementById('imageUrl');
        const categoryInput = document.getElementById('imageCategory');

        const url = urlInput.value.trim();
        const category = categoryInput.value.trim() || '未分类';

        if (!url) {
            this.showToast('请输入图片URL', 'error');
            return;
        }

        // 检查URL是否已存在
        const exists = this.images.some(img => img.url === url);
        if (exists) {
            this.showToast('该图片已存在', 'error');
            return;
        }

        // 添加新图片
        this.images.push({
            url: url,
            category: category,
            source: '手动添加'
        });

        this.saveImagesToStorage();
        this.updateDisplay();
        this.updateThumbnails();
        this.updateImageList();
        this.updateStats();

        // 清空输入框
        urlInput.value = '';
        categoryInput.value = '';

        this.showToast('图片添加成功', 'success');
    }

    // 删除选中
    deleteSelected() {
        const checkboxes = document.querySelectorAll('.image-item-checkbox:checked');
        if (checkboxes.length === 0) {
            this.showToast('请选择要删除的图片', 'error');
            return;
        }

        const indicesToDelete = Array.from(checkboxes)
            .map(cb => parseInt(cb.dataset.index))
            .sort((a, b) => b - a); // 从大到小排序，避免索引变化

        indicesToDelete.forEach(index => {
            this.images.splice(index, 1);
        });

        // 调整当前索引
        if (this.currentIndex >= this.images.length) {
            this.currentIndex = Math.max(0, this.images.length - 1);
        }

        this.saveImagesToStorage();
        this.updateDisplay();
        this.updateThumbnails();
        this.updateImageList();
        this.updateStats();

        this.showToast(`已删除 ${indicesToDelete.length} 张图片`, 'success');
    }

    // 全选
    selectAll() {
        const checkboxes = document.querySelectorAll('.image-item-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);

        checkboxes.forEach(cb => {
            cb.checked = !allChecked;
        });

        // 更新选中样式
        const imageItems = document.querySelectorAll('.image-item');
        imageItems.forEach((item, index) => {
            item.classList.toggle('selected', !allChecked);
        });
    }

    // 清空所有
    clearAll() {
        if (this.images.length === 0) {
            this.showToast('没有图片可清空', 'error');
            return;
        }

        if (confirm('确定要清空所有图片吗？此操作不可恢复。')) {
            this.images = [];
            this.currentIndex = 0;
            this.saveImagesToStorage();
            this.updateDisplay();
            this.updateThumbnails();
            this.updateImageList();
            this.updateStats();
            this.showToast('已清空所有图片', 'success');
        }
    }

    // 保存设置
    saveSettings() {
        const intervalInput = document.getElementById('interval');
        const autoFetchInput = document.getElementById('autoFetch');
        const fetchIntervalInput = document.getElementById('fetchInterval');

        const newInterval = parseInt(intervalInput.value) * 1000;
        if (isNaN(newInterval) || newInterval < 1000 || newInterval > 60000) {
            this.showToast('轮播间隔必须在1-60秒之间', 'error');
            return;
        }

        this.interval = newInterval;
        this.settings.autoFetch = autoFetchInput.checked;
        this.settings.fetchInterval = parseInt(fetchIntervalInput.value);

        this.saveSettingsToStorage();

        // 重新开始轮播
        if (this.isPlaying) {
            this.startSlideshow();
        }

        // 设置或取消自动拉取定时器
        if (this.settings.autoFetch) {
            this.setFetchTimer();
        } else if (this.fetchTimer) {
            clearTimeout(this.fetchTimer);
        }

        this.showToast('设置已保存', 'success');
    }

    // 设置自动拉取定时器
    setFetchTimer() {
        if (this.fetchTimer) {
            clearTimeout(this.fetchTimer);
        }

        const interval = this.settings.fetchInterval * 60 * 1000; // 转换为毫秒

        this.fetchTimer = setTimeout(() => {
            this.refreshPhotos();
            this.setFetchTimer(); // 重新设置定时器
        }, interval);
    }

    // 显示提示框
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.className = `toast ${type}`;
        }, 3000);
    }
}

// 初始化照片墙
document.addEventListener('DOMContentLoaded', () => {
    window.photoWall = new PhotoWall();
});
