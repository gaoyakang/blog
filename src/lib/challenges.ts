import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CHALLENGES_DIR = path.join(process.cwd(), "content", "challenges");

export interface ChallengeEntryFrontmatter {
  title: string;
  date: string;
  summary?: string;
  [key: string]: unknown;
}

export interface ChallengeEntry {
  date: string;
  frontmatter: ChallengeEntryFrontmatter;
  content: string;
}

export interface ChallengeInfo {
  challenge: string;
  dates: string[];
}

export const CHALLENGE_TYPES = ["loseweight"] as const;
export type ChallengeType = (typeof CHALLENGE_TYPES)[number];

export async function getChallengeTypes(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CHALLENGES_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export async function getChallengeDates(challenge: string): Promise<string[]> {
  const dir = path.join(CHALLENGES_DIR, challenge);

  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(".mdx", ""))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  } catch {
    return [];
  }
}

export async function getAllChallenges(): Promise<ChallengeInfo[]> {
  const challenges: ChallengeInfo[] = [];

  try {
    const challengeTypes = await getChallengeTypes();

    for (const challenge of challengeTypes) {
      const dates = await getChallengeDates(challenge);
      challenges.push({ challenge, dates });
    }
  } catch {
    // 目录不存在时返回空数组
  }

  return challenges;
}

export async function getChallengeEntry(
  challenge: string,
  date: string,
): Promise<ChallengeEntry | null> {
  const filePath = path.join(CHALLENGES_DIR, challenge, `${date}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      date,
      frontmatter: {
        title: String(data.title || date),
        date: String(data.date || date),
        summary: data.summary ? String(data.summary) : "",
      },
      content,
    };
  } catch {
    return null;
  }
}

export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

export function getWeekData(dates: string[]): { [key: string]: number } {
  const weekData: { [key: string]: number } = {};
  
  dates.forEach((date) => {
    const dateObj = new Date(date);
    const weekKey = dateObj.toISOString().split("T")[0];
    weekData[weekKey] = (weekData[weekKey] || 0) + 1;
  });
  
  return weekData;
}

export function getCalendarData(dates: string[]): {
  startDate: Date;
  endDate: Date;
  weekData: { [key: string]: number };
} {
  if (dates.length === 0) {
    const now = new Date();
    return {
      startDate: now,
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      weekData: {},
    };
  }

  const sortedDates = [...dates].sort();
  const startDate = new Date(sortedDates[0]);
  const endDate = new Date(startDate.getTime() + 29 * 24 * 60 * 60 * 1000);
  
  return {
    startDate,
    endDate,
    weekData: getWeekData(dates),
  };
}