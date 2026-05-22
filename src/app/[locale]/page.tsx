import { PostList } from "@/components/posts/PostList";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="pt-0 max-w-2xl mx-auto w-full">
      <PostList locale={locale} />
    </div>
  );
}
