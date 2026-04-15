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
        console.log('🚀 照片墙初始化开始');

        // 从本地存储加载图片
        this.loadImagesFromStorage();
        this.loadSettingsFromStorage();

        console.log('📦 从localStorage加载的图片数量:', this.images.length);

        // 如果没有图片，从默认源加载
        if (this.images.length === 0) {
            console.log('⚠️ localStorage中没有图片，正在加载默认图片...');
            await this.loadDefaultImages();
            console.log('✅ 默认图片加载完成，当前图片数量:', this.images.length);
        } else {
            console.log('✅ 从localStorage加载了', this.images.length, '张图片');
        }

        // 初始化UI
        this.initUI();

        // 开始轮播
        this.startSlideshow();

        // 如果启用自动拉取，设置定时器
        if (this.settings.autoFetch) {
            this.setFetchTimer();
        }

        console.log('🎉 照片墙初始化完成');
    }

    // 从本地存储加载图片
    loadImagesFromStorage() {
        const stored = localStorage.getItem('baiLuPhotos');
        if (stored) {
            try {
                this.images = JSON.parse(stored);

                // 检查是否有旧格式的URL（ai-beauty-gallery或github.com/raw格式）
                const hasOldUrls = this.images.some(img =>
                    img.url.includes('ai-beauty-gallery') ||
                    img.url.includes('github.com/raw')
                );

                if (hasOldUrls) {
                    console.warn('⚠️ 检测到旧格式的图片URL，自动清除并重新加载...');
                    localStorage.removeItem('baiLuPhotos');
                    this.images = [];
                } else {
                    console.log('✅ 从localStorage加载了', this.images.length, '张图片');
                }
            } catch (error) {
                console.error('❌ 解析localStorage图片数据失败:', error);
                localStorage.removeItem('baiLuPhotos');
                this.images = [];
            }
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
            console.log('📥 开始加载默认白鹿照片...');
            const defaultImages = [
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/0f1782cf-c7f2-4783-b4de-cfc32b45b152.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/110454c8-da55-4b07-bf12-bcda410e3b11.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/ads/114b0986-f0f4-4297-8012-d2e17e892bad.jpg',
                    category: '广告/代言',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/ads/4d18ce6f-9ea7-4bfd-9953-bf028a416870.jpg',
                    category: '广告/代言',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/3ba01e20-719e-42e4-a81c-aaf3a43ff545.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/3e87bfea-521d-4c90-9dfa-3cfc022faa66.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/4045425a-b38b-4335-954e-f3c30ba362c5.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/437945a9-5d29-433b-ac02-3177ac7de765.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                }
            ];

            this.images = defaultImages;
            this.saveImagesToStorage();
            console.log('✅ 已加载', defaultImages.length, '张白鹿照片到localStorage');
            this.showToast('已加载白鹿照片', 'success');
        } catch (error) {
            console.error('❌ 加载默认图片失败:', error);
            this.showToast('加载默认图片失败', 'error');
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

        // 添加清除存储的按钮事件
        const clearStorageBtn = document.getElementById('clearStorage');
        if (clearStorageBtn) {
            clearStorageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearStorage();
            });
        }

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

            // 先设置数据属性（在设置src之前）
            currentPhoto.dataset.index = this.currentIndex;
            currentPhoto.dataset.total = this.images.length;

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
                console.error('图片加载失败:', this.src);
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3Ctext fill="%23dc3545" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle"%3E图片加载失败%3C/text%3E%3Ctext fill="%23666" font-family="Arial" font-size="16" x="50%25" y="60%25" text-anchor="middle"%3E请刷新页面重试%3C/text%3E%3C/svg%3E';
                this.style.opacity = '1';
            };
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
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/51b9992b-281b-4fb9-ba7d-abbaf10b9663.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/597210df-fe24-4aa1-96f2-dac2e3521bee.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/5afb9b04-751f-45b0-961f-66cee9d0a703.jpg',
                    category: '日常/机场',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/ads/fa3e7f57-b70a-424d-8c30-ade083d8f2ea.jpg',
                    category: '广告/代言',
                    source: 'beauty-gallery-hub'
                },
                {
                    url: 'https://raw.githubusercontent.com/qianjin1111/beauty-gallery-hub/master/images/celebrities/bai-lu/daily/60165cd6-d8ea-4f7a-9146-a2252f32a761.jpg',
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

    // 清除localStorage并重新加载
    clearStorage() {
        if (confirm('确定要清除所有缓存数据并重新加载吗？\n\n这将删除：\n- 所有图片缓存\n- 所有设置缓存\n\n清除后页面将自动重新加载。')) {
            localStorage.removeItem('baiLuPhotos');
            localStorage.removeItem('baiLuSettings');
            console.log('🗑️ 已清除localStorage缓存');
            alert('缓存已清除！页面将重新加载...');
            location.reload();
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
