import Link from 'next/link';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  slug: string;
}

export function PostCard({ title, description, date, tags, slug }: PostCardProps) {
  // 格式化日期
  const formattedDate = new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <Link
      href={`/posts/${slug}`}
      className="group block rounded-lg border border-fd-border bg-fd-card p-6 transition-all hover:shadow-lg hover:border-fd-primary"
    >
      {/* 標題 */}
      <h2 className="text-xl font-semibold mb-2 group-hover:text-fd-primary transition-colors">
        {title}
      </h2>

      {/* 描述 */}
      <p className="text-fd-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* 標籤 */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-fd-muted text-fd-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-fd-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* 日期 */}
      <p className="text-sm text-fd-muted-foreground">
        發布日期：{formattedDate}
      </p>
    </Link>
  );
}
