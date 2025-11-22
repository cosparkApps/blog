import { source } from '@/lib/source';
import { PostCard } from '@/components/PostCard';

export default function HomePage() {
  // 獲取所有 posts 並按日期排序（最新的在前）
  const posts = source.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date || 0).getTime();
    const dateB = new Date(b.data.date || 0).getTime();
    return dateB - dateA;
  });

  return (
    <main className="container mx-auto px-4 py-12">
      {/* 頁面標題 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
        <p className="text-fd-muted-foreground max-w-2xl mx-auto">
          分享關於 DevOps、Kubernetes、CI/CD 和雲端技術的實戰經驗與心得
        </p>
      </div>

      {/* Posts 網格佈局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.url}
            title={post.data.title}
            description={post.data.description || ''}
            date={post.data.date || ''}
            tags={post.data.tags}
            slug={post.slugs.join('/')}
          />
        ))}
      </div>

      {/* 如果沒有 posts */}
      {posts.length === 0 && (
        <div className="text-center text-fd-muted-foreground py-12">
          目前還沒有文章
        </div>
      )}
    </main>
  );
}
