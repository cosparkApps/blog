import { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { BASE_URL, ADDITIONAL_SITEMAP_URLS } from '@/config';

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
    };
  });

  // 合併手動 URLs 和自動生成的 post URLs
  return [...ADDITIONAL_SITEMAP_URLS, ...postUrls];
}
