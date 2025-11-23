
// sitemap 相關配置
export const BASE_URL = 'https://blog.cosparks.app';
export const ADDITIONAL_SITEMAP_URLS = [
    {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    },
    // 手動新增範例
    // {
    //   url: `${BASE_URL}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
];
