import { getPostSlugs, getPost } from "@/lib/posts";
import { PostListView } from "./PostListView";

interface PostListProps {
  locale: string;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function PostList({ locale }: PostListProps) {
  await delay(1500);
  const slugs = await getPostSlugs(locale);

  const posts = await Promise.all(slugs.map((slug) => getPost(locale, slug)));

  const validPosts = posts.filter(
    (p): p is NonNullable<typeof p> => p !== null,
  );
validPosts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  if (validPosts.length === 0) {
    return (
      <div className="text-center py-24 text-[var(--text-secondary)] text-sm">
        No posts yet
      </div>
    );
  }

  // 按年份分组
  const grouped = validPosts.reduce(
    (acc, post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof validPosts>,
  );

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <PostListView grouped={grouped} years={years} locale={locale} />
  );
}

