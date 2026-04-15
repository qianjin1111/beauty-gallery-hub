#!/usr/bin/env python3
"""
批量生成AI美女照片脚本
生成100张不同风格的AI美女照片
"""

import asyncio
import os
import sys
import base64
from pathlib import Path
from datetime import datetime
from typing import List, Dict

# 添加SDK路径
sys.path.insert(0, '/skills/public/prod/image-generation/python')

from coze_coding_dev_sdk import ImageGenerationClient
from coze_coding_utils.runtime_ctx.context import Context, new_context


class BeautyImageGenerator:
    """AI美女照片生成器"""

    def __init__(self):
        """初始化生成器"""
        self.ctx = new_context(method="generate")
        self.client = ImageGenerationClient(ctx=self.ctx)
        self.project_root = Path("/workspace/projects/ai-beauty-gallery")
        self.images_dir = self.project_root / "images"

        # 分类目录
        self.categories = {
            "realistic": "写实风格",
            "anime": "二次元风格",
            "artistic": "艺术风格",
            "others": "其他风格"
        }

        # 不同风格的prompt模板
        self.prompts = {
            "realistic": [
                "A beautiful young woman with long wavy brown hair, realistic portrait photography, professional lighting, 8k ultra HD",
                "Stunning Asian woman in elegant evening dress, photorealistic, studio lighting, high fashion photography",
                "Elegant woman with short blonde hair, realistic portrait, natural beauty, professional photo",
                "Beautiful woman with hazel eyes and freckles, realistic photography, soft natural lighting",
                "Young woman with curly hair, realistic portrait, outdoor sunlight, golden hour",
                "Professional headshot of a beautiful woman, realistic photography, studio lighting, neutral background",
                "Beautiful woman with red hair, realistic portrait, soft focus, romantic atmosphere",
                "Elegant woman in casual summer dress, realistic photography, natural light, outdoor setting",
                "Young woman with braided hair, realistic portrait, warm lighting, friendly expression",
                "Beautiful woman with shoulder-length hair, realistic photography, professional makeup, studio setup",
                "Gorgeous woman with long black hair, realistic portrait, dramatic lighting, high contrast",
                "Young woman with dimples, realistic photography, natural smile, bright background",
                "Elegant woman with sophisticated makeup, realistic portrait, fashion photography style",
                "Beautiful woman with almond eyes, realistic photography, soft studio lighting",
                "Young woman with ponytail, realistic portrait, athletic look, energetic expression",
                "Professional beauty shot, realistic photography, perfect skin texture, detailed facial features",
                "Beautiful woman with vintage style hair, realistic portrait, nostalgic atmosphere",
                "Young woman with natural look, realistic photography, minimal makeup, pure beauty",
                "Elegant woman in business attire, realistic portrait, professional headshot",
                "Beautiful woman with bokeh background, realistic photography, shallow depth of field",
                "Young woman with fresh look, realistic portrait, morning light, fresh complexion",
                "Gorgeous woman with artistic pose, realistic photography, creative lighting",
                "Beautiful woman with detailed eyes, realistic portrait, macro photography",
                "Young woman with joyful expression, realistic photography, candid moment",
                "Elegant woman with classic beauty, realistic portrait, timeless elegance"
            ],
            "anime": [
                "Beautiful anime girl with long flowing pink hair, vibrant colors, anime art style, detailed illustration",
                "Cute anime girl with short blue hair, kawaii style, big expressive eyes, anime character design",
                "Stunning anime girl with purple hair, elegant kimono, traditional Japanese art style, detailed artwork",
                "Beautiful anime girl with twin tails, school uniform, anime style, vibrant colors",
                "Elegant anime girl with silver hair, fantasy armor, fantasy art style, detailed illustration",
                "Cute anime girl with orange hair, casual outfit, modern anime style, colorful design",
                "Beautiful anime girl with green eyes and long brown hair, magical girl transformation scene, anime art",
                "Gorgeous anime girl with golden hair, princess dress, fantasy anime style, detailed illustration",
                "Sweet anime girl with red hair, magical elements, fantasy art style, vibrant colors",
                "Beautiful anime girl with black hair and purple eyes, gothic style, anime character design",
                "Lovely anime girl with blonde twin tails, maid outfit, anime style, cute design",
                "Beautiful anime girl with blue hair, swimsuit, summer anime style, bright colors",
                "Elegant anime girl with pink hair and wings, angel character, fantasy anime art",
                "Cute anime girl with brown hair, glasses, smart look, anime style, school theme",
                "Beautiful anime girl with rainbow hair, futuristic outfit, sci-fi anime style, detailed illustration",
                "Gorgeous anime girl with silver hair and red eyes, vampire theme, anime art style",
                "Sweet anime girl with green hair, nature theme, anime character design, vibrant colors",
                "Beautiful anime girl with curly brown hair, witch costume, fantasy anime art",
                "Cute anime girl with short black hair, sporty outfit, action anime style",
                "Elegant anime girl with long blonde hair, ballroom dress, romance anime style, detailed illustration",
                "Beautiful anime girl with purple hair, cyberpunk theme, futuristic anime art",
                "Gorgeous anime girl with pink hair, cherry blossom background, Japanese anime style",
                "Sweet anime girl with orange hair, autumn theme, anime character design",
                "Beautiful anime girl with blue eyes and silver hair, ice magic theme, fantasy anime art",
                "Cute anime girl with brown twin tails, cat ears, anime style, kawaii design"
            ],
            "artistic": [
                "Beautiful woman portrait in impressionist style, oil painting technique, soft brushstrokes, warm colors",
                "Stunning woman in watercolor style, flowing colors, artistic portrait, dreamy atmosphere",
                "Elegant woman in pop art style, bold colors, comic book aesthetic, artistic illustration",
                "Beautiful woman in surrealistic style, fantasy elements, dreamlike composition, artistic photography",
                "Gorgeous woman in art deco style, geometric patterns, vintage elegance, artistic portrait",
                "Beautiful woman in renaissance style, classical painting technique, warm lighting, artistic masterpiece",
                "Elegant woman in abstract style, bold shapes, vibrant colors, modern art portrait",
                "Beautiful woman in gothic art style, dramatic shadows, mysterious atmosphere, artistic illustration",
                "Stunning woman in romanticism style, emotional expression, flowing hair, artistic painting",
                "Beautiful woman in cubist style, geometric forms, multiple perspectives, artistic portrait",
                "Elegant woman in baroque style, dramatic lighting, rich colors, classical art",
                "Beautiful woman in minimalism style, clean lines, simple composition, artistic photography",
                "Gorgeous woman in expressionist style, bold colors, emotional intensity, artistic portrait",
                "Beautiful woman in pointillism style, tiny dots of color, impressionist technique, artistic painting",
                "Elegant woman in art nouveau style, flowing lines, organic forms, decorative art portrait",
                "Beautiful woman in steampunk style, Victorian elements, industrial aesthetics, artistic illustration",
                "Stunning woman in tribal art style, bold patterns, cultural motifs, artistic portrait",
                "Beautiful woman in graffiti style, urban art, vibrant colors, street art aesthetic",
                "Elegant woman in mosaic style, tile patterns, colorful composition, artistic portrait",
                "Beautiful woman in ink wash style, traditional technique, subtle colors, artistic painting",
                "Gorgeous woman in neon art style, glowing lights, futuristic atmosphere, artistic illustration",
                "Beautiful woman in stained glass style, colorful segments, light effects, artistic portrait",
                "Elegant woman in charcoal drawing style, dramatic shadows, realistic shading, artistic illustration",
                "Beautiful woman in digital art style, smooth gradients, modern aesthetic, artistic portrait",
                "Stunning woman in mixed media style, collage technique, layered composition, artistic masterpiece"
            ],
            "others": [
                "Beautiful woman in cyberpunk style, neon lights, futuristic city background, sci-fi aesthetic",
                "Gorgeous woman in fairy tale style, magical forest, fantasy elements, enchanting atmosphere",
                "Beautiful woman in vintage photograph style, sepia tones, classic portrait, nostalgic feel",
                "Elegant woman in fantasy armor, medieval theme, epic background, heroic portrait",
                "Beautiful woman in tropical paradise, beach sunset, exotic flowers, dreamy atmosphere",
                "Stunning woman in winter wonderland, snow falling, cozy sweater, romantic setting",
                "Beautiful woman in ancient Egyptian style, golden jewelry, desert background, mystical atmosphere",
                "Gorgeous woman in steampunk costume, gears and gadgets, Victorian era, artistic portrait",
                "Beautiful woman in space station, futuristic setting, sci-fi elements, cosmic background",
                "Elegant woman in medieval castle, historical setting, period costume, royal portrait",
                "Beautiful woman in underwater kingdom, coral reef, sea creatures, fantasy world",
                "Stunning woman in cherry blossom garden, Japanese setting, romantic atmosphere",
                "Beautiful woman in ancient Greek style, toga, marble temple, classical beauty",
                "Gorgeous woman in magical library, books floating, enchanted atmosphere, fantasy portrait",
                "Beautiful woman in desert oasis, palm trees, golden sunset, exotic setting",
                "Elegant woman in gothic cathedral, stained glass windows, dramatic lighting, mysterious atmosphere",
                "Beautiful woman in enchanted forest, magical creatures, fantasy world, fairy tale",
                "Stunning woman in bamboo forest, traditional Asian setting, peaceful atmosphere",
                "Beautiful woman in crystal cave, sparkling crystals, magical lighting, fantasy world",
                "Gorgeous woman in ancient temple, hieroglyphics, mysterious atmosphere, historical setting",
                "Beautiful woman in moonlit garden, flowers, romantic atmosphere, night scene",
                "Elegant woman in cloud kingdom, fantasy setting, dreamlike composition, magical world",
                "Beautiful woman in volcanic landscape, dramatic scenery, intense atmosphere, epic portrait",
                "Stunning woman in ice palace, frozen beauty, sparkling crystals, fantasy world"
            ]
        }

    def generate_filename(self, category: str, index: int, style: str) -> str:
        """
        生成文件名

        Args:
            category: 分类名称
            index: 序号
            style: 风格描述

        Returns:
            文件名
        """
        date = datetime.now().strftime("%Y-%m-%d")
        padded_index = str(index + 1).zfill(3)
        return f"{date}-{category}-{style}-{padded_index}.png"

    async def generate_single_image(self, prompt: str, category: str, index: int, semaphore: asyncio.Semaphore):
        """
        生成单张图片

        Args:
            prompt: 提示词
            category: 分类
            index: 索引
            semaphore: 信号量，控制并发

        Returns:
            生成结果
        """
        async with semaphore:
            try:
                # 生成图片
                response = await self.client.generate_async(
                    prompt=prompt,
                    size="2K",
                    watermark=False,
                    response_format="b64_json"
                )

                if response.success:
                    # 生成文件名
                    style_desc = self.categories[category]
                    filename = self.generate_filename(category, index, style_desc)
                    output_path = self.images_dir / category / filename

                    # 保存图片
                    if response.image_b64_list:
                        img_data = base64.b64decode(response.image_b64_list[0])
                        with open(output_path, 'wb') as f:
                            f.write(img_data)

                        return {
                            "success": True,
                            "category": category,
                            "index": index,
                            "filename": filename,
                            "path": str(output_path),
                            "prompt": prompt
                        }
                    else:
                        return {
                            "success": False,
                            "category": category,
                            "index": index,
                            "error": "No image data returned"
                        }
                else:
                    return {
                        "success": False,
                        "category": category,
                        "index": index,
                        "error": response.error_messages
                    }
            except Exception as e:
                return {
                    "success": False,
                    "category": category,
                    "index": index,
                    "error": str(e)
                }

    async def generate_category_images(self, category: str, prompts: List[str], max_concurrent: int = 3):
        """
        生成某个分类的图片

        Args:
            category: 分类名称
            prompts: 提示词列表
            max_concurrent: 最大并发数

        Returns:
            生成结果列表
        """
        # 创建信号量，控制并发
        semaphore = asyncio.Semaphore(max_concurrent)

        # 创建任务
        tasks = [
            self.generate_single_image(prompt, category, i, semaphore)
            for i, prompt in enumerate(prompts)
        ]

        # 并发执行
        results = await asyncio.gather(*tasks)

        return results

    async def generate_all_images(self, max_concurrent: int = 3):
        """
        生成所有图片（100张）

        Args:
            max_concurrent: 最大并发数

        Returns:
            所有生成结果
        """
        all_results = []

        # 为每个分类生成图片
        for category, prompts in self.prompts.items():
            print(f"\n开始生成 {self.categories[category]} ({category})...")
            results = await self.generate_category_images(category, prompts, max_concurrent)
            all_results.extend(results)

            # 统计成功数量
            success_count = sum(1 for r in results if r['success'])
            fail_count = len(results) - success_count
            print(f"{self.categories[category]} 生成完成：成功 {success_count} 张，失败 {fail_count} 张")

        return all_results

    def generate_summary_report(self, results: List[Dict]) -> str:
        """
        生成总结报告

        Args:
            results: 生成结果列表

        Returns:
            报告内容
        """
        total = len(results)
        success = sum(1 for r in results if r['success'])
        failed = total - success

        report = []
        report.append("# AI美女照片生成报告\n")
        report.append(f"生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        report.append(f"总计划生成：{total} 张\n")
        report.append(f"成功生成：{success} 张\n")
        report.append(f"生成失败：{failed} 张\n")
        report.append("\n## 分类统计\n")

        # 按分类统计
        for category in self.categories.keys():
            category_results = [r for r in results if r['category'] == category]
            category_success = sum(1 for r in category_results if r['success'])
            report.append(f"- {self.categories[category]} ({category})：{category_success}/{len(category_results)} 张\n")

        report.append("\n## 成功生成的图片\n")

        # 列出所有成功生成的图片
        for result in results:
            if result['success']:
                report.append(f"### {result['filename']}\n")
                report.append(f"- 分类：{self.categories[result['category']]}\n")
                report.append(f"- 路径：{result['path']}\n")
                report.append(f"- 提示词：{result['prompt'][:100]}...\n\n")

        report.append("\n## 生成失败的图片\n")

        # 列出所有生成失败的图片
        for result in results:
            if not result['success']:
                report.append(f"### 分类：{self.categories[result['category']]} - 第 {result['index'] + 1} 张\n")
                report.append(f"- 错误：{result['error']}\n\n")

        return "".join(report)

    def save_report(self, report: str):
        """
        保存报告

        Args:
            report: 报告内容
        """
        report_path = self.project_root / "GENERATION_REPORT.md"
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"\n报告已保存到：{report_path}")


async def main():
    """主函数"""
    print("=" * 60)
    print("AI美女照片批量生成器")
    print("=" * 60)
    print(f"项目路径：/workspace/projects/ai-beauty-gallery")
    print(f"计划生成：100张照片")
    print(f"分类分布：")
    print("  - 写实风格：25张")
    print("  - 二次元风格：25张")
    print("  - 艺术风格：25张")
    print("  - 其他风格：25张")
    print("=" * 60)

    # 创建生成器
    generator = BeautyImageGenerator()

    # 生成所有图片
    print("\n开始生成图片...\n")
    results = await generator.generate_all_images(max_concurrent=3)

    # 生成报告
    print("\n生成完成！正在生成报告...")
    report = generator.generate_summary_report(results)
    generator.save_report(report)

    # 统计结果
    success_count = sum(1 for r in results if r['success'])
    fail_count = len(results) - success_count

    print("\n" + "=" * 60)
    print("生成统计")
    print("=" * 60)
    print(f"成功生成：{success_count} 张")
    print(f"生成失败：{fail_count} 张")
    print("=" * 60)

    if fail_count > 0:
        print("\n⚠️  部分图片生成失败，请查看详细报告了解原因")
    else:
        print("\n✅ 所有图片生成成功！")


if __name__ == "__main__":
    asyncio.run(main())
