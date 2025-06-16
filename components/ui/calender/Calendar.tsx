// Calendar.tsx
"use client";

import React, { useMemo } from "react";
import Day_View from "./components/Day_view";
import WeekView from "./components/Week_view";
import Year_view from "./components/Year_view";

import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  format,
  isSameDay,
} from "date-fns";
import { useCalendar } from "./CalendarContext";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";

const Calendar: React.FC = () => {
  const { currentMonth, viewUnit,events } = useCalendar();

  

  // ---------- Day View ----------
  if (viewUnit === "Day") {
    return (
      <Day_View
        date={currentMonth}
        events={events}
        slotHeight={1}
      />
    );
  }

  // ---------- Week View ----------
  if (viewUnit === "Week") {
    return (
      <WeekView
        referenceDate={currentMonth}
        events={events}
        slotHeight={1}
      />
    );
  }

  // ---------- Month / Year Grid ----------
  const days = useMemo(() => {
    if (viewUnit === "Month") {
      const ms = startOfMonth(currentMonth);
      const me = endOfMonth(currentMonth);
      const gs = startOfWeek(ms, { weekStartsOn: 1 });
      const ge = endOfWeek(me, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: gs, end: ge });
    } else {
      const ys = startOfYear(currentMonth);
      const ye = endOfYear(currentMonth);
      return eachDayOfInterval({ start: ys, end: ye });
    }
  }, [currentMonth, viewUnit]);

  // ---------- Year View ----------
  if (viewUnit === "Year") {
    return <Year_view days={days} />;
  }

  const gridLayout = "grid-cols-7 auto-rows-[112px]";

  return (
    <div className="border border-zinc-700 text-white">
      {/* Header row */}
      <div className="grid gap-px text-center font-medium border-b border-zinc-700 grid-cols-7">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-2 border border-zinc-700">
            {d}
          </div>
        ))}
      </div>

      {/* Grid of days */}
      <div className={`grid gap-px ${gridLayout}`}>
        {days.map((day) => {
          const todaysEvents = events.filter((ev) =>
            ev.date && isSameDay(ev.date, day)
          );
          return (
            <div
              key={day.toISOString()}
              className={`p-1 border border-zinc-700 flex flex-col ${
                viewUnit === "Month" ? "h-28" : "h-full"
              }`}
            >
              <div className="text-sm mb-1">{format(day, "d")}</div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {todaysEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`${ev.color} flex items-center justify-between px-1 py-0.5 rounded text-xs text-white`}
                    title={ev.title}
                  >
                    <span className="truncate">{ev.title}</span>
                    {ev.time_start && (
                      <span className="ml-1 flex-none text-gray-200">
                        {format(ev.time_start, "h:mm aa")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
