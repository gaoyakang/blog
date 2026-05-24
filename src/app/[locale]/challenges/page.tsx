import { readdir } from "fs/promises";
import Link from "next/link";

interface Challenge {
  name: string;
  title: string;
}

const challengeTitles: { [key: string]: { en: string; zh: string } } = {
  loseweight: { en: "Weight Loss Challenge", zh: "减肥挑战" },
};

async function getChallenges(): Promise<Challenge[]> {
  const challengesDir = process.cwd() + "/content/challenges";
  try {
    const entries = await readdir(challengesDir, { withFileTypes: true });
    const challengeDirs = entries.filter((entry) => entry.isDirectory());
    
    return challengeDirs.map((dir) => ({
      name: dir.name,
      title: dir.name,
    }));
  } catch {
    return [];
  }
}

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const challenges = await getChallenges();
  const isZh = locale === "zh";

  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <p className="text-[var(--text-secondary)] text-lg">
          {isZh ? "oops，当前还未曾开始任何挑战～" : "oops, no challenges have been started yet~"}
        </p>
        <Link
          href={`/${locale}`}
          className="px-6 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg hover:opacity-80 transition-opacity duration-200"
        >
          {isZh ? "返回首页" : "Back to Home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">
        {isZh ? "我的挑战" : "My Challenges"}
      </h1>
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Link
            key={challenge.name}
            href={`/${locale}/challenges/${challenge.name}`}
            className="block p-4 border border-[var(--border)] rounded-lg transition-all duration-200 hover:border-[var(--text-secondary)] hover:shadow-md hover:-translate-y-0.5"
          >
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {(challengeTitles[challenge.name] as Record<string, string>)?.[locale] || challenge.name}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {isZh ? "点击查看进度" : "Click to view progress"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}