// components/Year_view.tsx
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
} from "date-fns";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

interface YearViewProps {
  /** Every day of the year (from Calendar.tsx) */
  days: Date[];
}

const YearView: React.FC<YearViewProps> = ({ days }) => {
  // Derive the year from the first date in the array
  const displayYear = days[0]?.getFullYear() ?? new Date().getFullYear();

  // Build array for all 12 months with grid-padded days
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const firstOfMonth = new Date(displayYear, monthIndex, 1);
    const monthStart   = startOfMonth(firstOfMonth);
    const monthEnd     = endOfMonth(firstOfMonth);
    // Sunday as start of week to match reference
    const gridStart    = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd      = endOfWeek(monthEnd,   { weekStartsOn: 0 });
    const monthDays    = eachDayOfInterval({ start: gridStart, end: gridEnd });
    return {
      name:      format(firstOfMonth, "MMMM"),
      monthDate: firstOfMonth,
      monthDays,
    };
  });

  return (
    <section className="w-full mx-auto px-2 py-8">
      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          bg-neutral-900
          p-4
          rounded-xl
          shadow-lg
        "
      >
        {months.map(({ name, monthDate, monthDays }) => (
          <div key={name}>
            {/* Month header */}
            <div className="mb-2 text-base font-semibold tracking-tight text-zinc-100">
              {name}
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-1 text-xs font-medium text-zinc-400 select-none">
              {WEEK_DAYS.map((d, i) => (
                <div key={d + i} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {monthDays.map((day) => {
                const outOfMonth = !isSameMonth(day, monthDate);
                const today      = isToday(day);
                return (
                  <div
                    key={day.toISOString()}
                    className="flex items-center justify-center h-6"
                  >
                    <span
                      className={`
                        w-6 h-6 leading-6 text-sm font-normal
                        flex items-center justify-center
                        transition-colors
                        ${today ? "bg-blue-600 border-blue-400 text-white rounded-full ring-2 ring-blue-300 shadow-lg" : ""}
                        ${outOfMonth ? "text-zinc-600" : "text-zinc-100"}
                      `}
                      aria-label={
                        today
                          ? `${format(day, "MMMM d, yyyy")} (today)`
                          : format(day, "MMMM d, yyyy")
                      }
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YearView;
