"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface CalendarProps {
  weekData: { [key: string]: number };
  startDate: Date;
  endDate: Date;
  challenge: string;
  locale: string;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ChallengeCalendar({ weekData, startDate, endDate, challenge, locale }: CalendarProps) {
  const router = useRouter();

  const handleCellClick = (date: string) => {
    if (weekData[date] > 0) {
      startTransition(() => {
        router.push(`/${locale}/challenges/${challenge}/${date}`);
      });
    }
  };

  const weeks: Array<Array<{ date: string; hasEntry: boolean; month: string } | null>> = [];
  
  const firstMonday = new Date(startDate);
  const startDayOfWeek = firstMonday.getDay();
  const daysToSubtract = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  firstMonday.setDate(firstMonday.getDate() - daysToSubtract);

  const lastSunday = new Date(endDate);
  const endDayOfWeek = lastSunday.getDay();
  const daysToAdd = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
  lastSunday.setDate(lastSunday.getDate() + daysToAdd);

  const currentDate = new Date(firstMonday);
  while (currentDate <= lastSunday) {
    const week: Array<{ date: string; hasEntry: boolean; month: string } | null> = [];
    for (let i = 0; i < 7; i++) {
      if (currentDate >= startDate && currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0];
        week.push({
          date: dateStr,
          hasEntry: weekData[dateStr] > 0,
          month: MONTHS[currentDate.getMonth()],
        });
      } else {
        week.push(null);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  const monthPositions: { [key: string]: number } = {};
  weeks.forEach((week, weekIndex) => {
    week.forEach((day) => {
      if (day && !(day.month in monthPositions)) {
        monthPositions[day.month] = weekIndex;
      }
    });
  });

  const monthOrder = Object.keys(monthPositions).sort((a, b) => monthPositions[a] - monthPositions[b]);

  const hasMonthChange = (weekIndex: number): boolean => {
    return monthOrder.some((month, index) => {
      if (index === 0) return false;
      return monthPositions[month] === weekIndex;
    });
  };

  return (
    <div className="w-full border border-[var(--border)] rounded-lg p-4">
      <div className="flex mb-3 pl-10">
        {weeks.map((_, weekIndex) => (
          <div 
            key={weekIndex} 
            className={`flex flex-col gap-1 w-5 relative ${hasMonthChange(weekIndex) ? "ml-4" : ""}`}
          >
            {Object.entries(monthPositions).map(([month, mWeekIndex]) => {
              if (mWeekIndex === weekIndex) {
                return (
                  <span 
                    key={month} 
                    className="absolute -top-4 left-0 text-xs text-[var(--text-secondary)] whitespace-nowrap"
                  >
                    {month}
                  </span>
                );
              }
              return null;
            })}
            <div className="h-5" />
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="flex flex-col gap-1 mr-3">
          {WEEKDAYS.map((day, index) => (
            <div
              key={index}
              className="h-5 w-8 text-xs text-[var(--text-secondary)] flex items-center justify-end pr-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex">
          {weeks.map((week, weekIndex) => (
            <div 
              key={weekIndex} 
              className={`flex flex-col gap-1 ${hasMonthChange(weekIndex) ? "ml-4" : "ml-1"}`}
            >
              {week.map((day, dayIndex) => {
                if (!day) {
                  return (
                    <div 
                      key={dayIndex} 
                      className="w-5 h-5 rounded-sm border border-[var(--border)] bg-transparent"
                    />
                  );
                }
                return (
                  <button
                    key={day.date}
                    onClick={() => handleCellClick(day.date)}
                    className={`w-5 h-5 rounded-sm transition-colors duration-150 ${
                      day.hasEntry
                        ? "bg-[#4ade80] cursor-pointer hover:ring-2 hover:ring-[var(--text-primary)]"
                        : "border border-[var(--border)] bg-transparent cursor-default"
                    }`}
                    title={day.hasEntry ? `${day.date}` : ""}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}