import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import type { PageTreeTransformer } from 'fumadocs-core/source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/posts',
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [
      {
        name: 'sort-by-date-and-group-by-year',
        root(node) {
          const storage = this.storage;

          // 收集所有 page 節點
          const collectPages = (items: any[]): any[] => {
            const pages: any[] = [];
            for (const item of items) {
              if (item.type === 'page') {
                pages.push(item);
              } else if (item.type === 'folder' && 'children' in item) {
                pages.push(...collectPages(item.children));
              }
            }
            return pages;
          };

          const allPages = collectPages(node.children);

          // 按日期降序排序（最新的在前）
          const sorted = allPages.sort((a, b) => {
            // 通過 $ref 獲取原始 file data
            const refA = '$ref' in a ? (a.$ref as { file?: string } | undefined) : undefined;
            const refB = '$ref' in b ? (b.$ref as { file?: string } | undefined) : undefined;

            const fileA = refA?.file ? storage.read(refA.file) : null;
            const fileB = refB?.file ? storage.read(refB.file) : null;

            const dateA =
              fileA && 'data' in fileA && fileA.data.date
                ? new Date(fileA.data.date as string).getTime()
                : 0;
            const dateB =
              fileB && 'data' in fileB && fileB.data.date
                ? new Date(fileB.data.date as string).getTime()
                : 0;

            return dateB - dateA;
          });

          // 按年份分組
          const grouped = new Map<string, any[]>();

          for (const item of sorted) {
            if (item.type !== 'page') continue;

            // 通過 $ref 獲取原始 file data
            const ref = '$ref' in item ? (item.$ref as { file?: string } | undefined) : undefined;
            const file = ref?.file ? storage.read(ref.file) : null;
            const year =
              file && 'data' in file && file.data.date
                ? new Date(file.data.date as string).getFullYear().toString()
                : 'Unknown';

            if (!grouped.has(year)) {
              grouped.set(year, []);
            }
            grouped.get(year)!.push(item);
          }

          // 年份排序（最新的在前）
          const years = Array.from(grouped.keys()).sort((a, b) => {
            if (a === 'Unknown') return 1;
            if (b === 'Unknown') return -1;
            return Number(b) - Number(a);
          });

          // 建立新的 children，使用 folder 分組
          const newChildren: any[] = [];
          for (const year of years) {
            newChildren.push({
              type: 'folder',
              name: year,
              index: undefined,
              children: grouped.get(year) || [],
              defaultOpen: true,
            });
          }

          return {
            ...node,
            children: newChildren,
          };
        },
      } satisfies PageTreeTransformer,
    ],
  },
});
