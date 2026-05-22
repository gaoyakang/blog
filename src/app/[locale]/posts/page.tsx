import { PostList } from "@/components/posts/PostList";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="pt-0">
      <PostList locale={locale} />
    </div>
  );
}
