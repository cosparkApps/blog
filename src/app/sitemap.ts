import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

// 網站基礎 URL（請根據實際部署網址修改）
const BASE_URL = 'https://blog.cosparks.app';

// 手動加入的額外 URLs
// 可以在這裡添加不在 posts 中的頁面
const ADDITIONAL_URLS: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  // 範例：如果有關於我頁面
  // {
  //   url: `${BASE_URL}/about`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.8,
  // },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 從 fumadocs source 獲取所有 posts
  const posts = source.getPages();

  // 將 posts 轉換為 sitemap 格式
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const lastModified = post.data.date
      ? new Date(post.data.date)
      : new Date();

    return {
      url: `${BASE_URL}/posts/${post.slugs.join('/')}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // 合併手動 URLs 和自動生成的 post URLs
  return [...ADDITIONAL_URLS, ...postUrls];
}
