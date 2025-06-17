"use client";
import React, { useMemo } from "react";
import {
  startOfDay,
  addMinutes,
  differenceInMinutes,
  format,
  isSameDay,
} from "date-fns";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  slotHeight?: number;
  onEventClick: (event: CalendarEvent) => void;
}

const Day_View: React.FC<DayViewProps> = ({ date, events, slotHeight = 1,onEventClick,  }) => {
  const dayStart = startOfDay(date);

  // 1) filter to today and compute minute offset & height
  const dayEvents = useMemo(() => {
    return events
      .filter((ev) => ev.date && ev.time_start && isSameDay(ev.date!, date))
      .map((ev) => {
        const start = ev.time_start!;
        const end = ev.time_end!;
        const offset = differenceInMinutes(start, dayStart);
        const height = differenceInMinutes(end, start);
        return { ev, offset, height };
      });
  }, [events, date]);

  // 2) group by offset
  const groups = useMemo(() => {
    return dayEvents.reduce<Record<number, typeof dayEvents>>((acc, item) => {
      (acc[item.offset] ||= []).push(item);
      return acc;
    }, {});
  }, [dayEvents]);

  return (
    <div className="relative border border-zinc-700 bg-zinc-900 overflow-y-auto  text-white">
      <div className="absolute left-0 top-0 w-full">
        {Array.from({ length: 24 }).map((_, h) => (
          <div
            key={h}
            className="border-b border-zinc-700 py-0.5  text-[0.65rem] text-zinc-400 pl-1"
            style={{ height: 60 * slotHeight }}
          >
            {format(addMinutes(dayStart, h * 60), "h a")}
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="ml-12 relative" style={{ height: 1440 * slotHeight }}>
        {Object.entries(groups).map(([offsetStr, items]) => {
          const offset = Number(offsetStr);
          const widthPct = 100 / items.length;

          return items.map(({ ev, height }, idx) => (
            <div
              key={ev.id}
              onClick={() => onEventClick(ev)}
              className={`${ev.color} absolute rounded-lg p-1 cursor-pointer text-[0.7rem] overflow-hidden transition-transform duration-150 ease-in-out
              hover:scale-105
              hover:shadow-lg hover:brightness-90`}
              style={{
                top: offset * slotHeight,
                height: height * slotHeight,
                left: `${idx * widthPct}%`,
                width: `${widthPct}%`,
              }}
            >
              <div className="font-medium truncate">{ev.title}</div>
              <div className="text-[0.6rem] text-gray-200">
                {format(ev.time_start!, "h:mm a")} –{" "}
                {format(ev.time_end!, "h:mm a")}
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Day_View;
