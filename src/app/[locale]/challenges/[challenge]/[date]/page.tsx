import { setRequestLocale } from "next-intl/server";
import { getChallengeEntry, getChallengeDates, CHALLENGE_TYPES } from "@/lib/challenges";
import { MDXContentWithLightbox } from "@/components/content/MDXContentWithLightbox";
import { BackButton } from "@/components/content/BackButton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; challenge: string; date: string }[] = [];

  for (const challenge of CHALLENGE_TYPES) {
    const dates = await getChallengeDates(challenge);
    for (const date of dates) {
      ["en", "zh"].forEach((locale) => {
        params.push({ locale, challenge, date });
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; challenge: string; date: string }>;
}): Promise<Metadata> {
  const { locale, challenge, date } = await params;
  
  const challengeNames: { [key: string]: { en: string; zh: string } } = {
    loseweight: { en: "Weight Loss", zh: "减肥" },
  };

  const title = `${challengeNames[challenge]?.[locale as "en" | "zh"] || challenge} - ${date}`;

  return {
    title: title,
    description: locale === "zh" ? "挑战日记" : "Challenge journal",
  };
}

export default async function ChallengeEntryPage({
  params,
}: {
  params: Promise<{ locale: string; challenge: string; date: string }>;
}) {
  const { locale, challenge, date } = await params;

  setRequestLocale(locale);

  if (!CHALLENGE_TYPES.includes(challenge as any)) {
    notFound();
  }

  const entry = await getChallengeEntry(challenge, date);

  if (!entry) {
    notFound();
  }

  const challengeNames: { [key: string]: { en: string; zh: string } } = {
    loseweight: { en: "Weight Loss Challenge", zh: "减肥挑战" },
  };

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric", weekday: "long" },
  );

  return (
    <article className="pt-6 pb-24 w-full">
      <nav className="flex items-center justify-between mb-4">
        <BackButton
          href={`/${locale}/challenges/${challenge}`}
          ariaLabel={locale === "zh" ? "返回" : "Back"}
        />
        <span className="text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-2">
          {challengeNames[challenge]?.[locale as "en" | "zh"] || challenge}
        </span>
      </nav>

      <div className="border-b border-[var(--border)] mb-8" />

      <div className="max-w-2xl mx-auto">
        <header className="mb-16">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 text-[var(--text-primary)]">
            {entry.frontmatter.title || formattedDate}
          </h1>
          <div className="flex items-center gap-4">
            <time className="text-[13px] text-[var(--text-secondary)]">
              {formattedDate}
            </time>
          </div>
        </header>

        <div className="prose-custom">
          <MDXContentWithLightbox content={entry.content} />
        </div>
      </div>
    </article>
  );
}