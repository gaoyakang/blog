import { setRequestLocale } from "next-intl/server";
import { getChallengeDates, getCalendarData, CHALLENGE_TYPES } from "@/lib/challenges";
import { ChallengeCalendar } from "@/components/challenges/ChallengeCalendar";
import { BackButton } from "@/components/content/BackButton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; challenge: string }[] = [];
  
  CHALLENGE_TYPES.forEach((challenge) => {
    ["en", "zh"].forEach((locale) => {
      params.push({ locale, challenge });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; challenge: string }>;
}): Promise<Metadata> {
  const { locale, challenge } = await params;
  
  const challengeNames: { [key: string]: { en: string; zh: string } } = {
    "lose-weight": { en: "Weight Loss Challenge", zh: "减肥挑战" },
  };

  const title = challengeNames[challenge]?.[locale as "en" | "zh"] || challenge;

  return {
    title: title,
    description: locale === "zh" ? "我的挑战进度记录" : "My challenge progress",
  };
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ locale: string; challenge: string }>;
}) {
  const { locale, challenge } = await params;

  setRequestLocale(locale);

  if (!CHALLENGE_TYPES.includes(challenge as any)) {
    notFound();
  }

  const dates = await getChallengeDates(challenge);
  const { startDate, endDate, weekData } = getCalendarData(dates);

  const challengeNames: { [key: string]: { en: string; zh: string } } = {
    "lose-weight": { en: "Weight Loss Challenge", zh: "减肥挑战" },
  };

  const challengeDescription: { [key: string]: { en: string; zh: string } } = {
    "lose-weight": { 
      en: "30 days of diet and exercise plan", 
      zh: "30天饮食和锻炼计划" 
    },
  };

  const completedDays = dates.length;
  const totalDays = 30;
  const progress = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="pt-6 pb-24 w-full">
      <nav className="flex items-center justify-between mb-4">
        <BackButton
          href={`/${locale}`}
          ariaLabel={locale === "zh" ? "返回" : "Back"}
        />
        <span className="text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-2">
          {locale === "zh" ? "挑战" : "Challenges"}
        </span>
      </nav>

      <div className="border-b border-[var(--border)] mb-8" />

      

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-secondary)]">
            {locale === "zh" ? "完成进度" : "Progress"}
          </span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {completedDays} / {totalDays} {locale === "zh" ? "天" : "days"} ({progress}%)
          </span>
        </div>
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
        <ChallengeCalendar
          weekData={weekData}
          startDate={startDate}
          endDate={endDate}
          challenge={challenge}
          locale={locale}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
          {locale === "zh" ? "最近记录" : "Recent Entries"}
        </h2>
        <div className="space-y-2">
          {dates.slice(-10).reverse().map((date) => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString(
              locale === "zh" ? "zh-CN" : "en-US",
              { year: "numeric", month: "short", day: "numeric" },
            );
            return (
              <a
                key={date}
                href={`/${locale}/challenges/${challenge}/${date}`}
                className="flex items-center justify-between py-3 px-4 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <span className="text-[var(--text-primary)]">{formattedDate}</span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {locale === "zh" ? "查看详情" : "View"}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}