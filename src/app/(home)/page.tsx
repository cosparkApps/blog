import { source } from '@/lib/source';
import { PostCard } from '@/components/PostCard';

export default function HomePage() {
  // 獲取所有 posts 並按日期排序（最新的在前）
  const posts = source.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date || 0).getTime();
    const dateB = new Date(b.data.date || 0).getTime();
    return dateB - dateA;
  });

  // 按年份分組
  const postsByYear = posts.reduce((acc, post) => {
    const year = post.data.date
      ? new Date(post.data.date).getFullYear().toString()
      : 'Unknown';

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  // 取得排序後的年份（最新的在前）
  const years = Object.keys(postsByYear).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return Number(b) - Number(a);
  });

  return (
    <main className="container mx-auto px-4 py-12">
      {/* 頁面標題 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Matt の 小天地</h1>
        <p className="text-fd-muted-foreground max-w-2xl mx-auto">
          一個自我紀錄的小角落<br />有 時 技 術 ， 有 時 感 悟
        </p>
      </div>

      {/* 如果沒有 posts */}
      {posts.length === 0 && (
        <div className="text-center text-fd-muted-foreground py-12">
          目前還沒有文章
        </div>
      )}

      {/* 按年份分組的 Posts */}
      {years.map((year) => (
        <div key={year} className="mb-16">
          {/* 年份標題 */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">{year}</h2>
            <div className="border-b-2 border-fd-border"></div>
          </div>

          {/* Posts 網格佈局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsByYear[year].map((post) => (
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
        </div>
      ))}
    </main>
  );
}
