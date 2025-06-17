"use client";

import React from "react";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";
import { format, isSameDay } from "date-fns";

interface MonthViewProps {
  days: Date[];
  events: CalendarEvent[];
  onEventClick: (ev: CalendarEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ days, events, onEventClick }) => {
  return (
    <div className="border border-zinc-700 text-white">
      {/* Weekday header */}
      <div className="grid gap-px text-center font-medium border-b border-zinc-700 grid-cols-7">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
          <div key={d} className="py-2 border border-zinc-700">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid gap-px grid-cols-7 auto-rows-[112px]">
        {days.map(day => {
          const todaysEvents = events.filter(ev =>
            ev.date !== null && isSameDay(ev.date, day)
          );
          return (
            <div
              key={day.toISOString()}
              className="p-1 border border-zinc-700 flex flex-col h-28"
            >
              <div className="text-sm mb-1">{format(day, "d")}</div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {todaysEvents.map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => onEventClick(ev)}
                    className={`${ev.color} cursor-pointer flex items-center justify-between px-1 py-0.5 rounded text-xs text-white transition-colors hover:brightness-90 `}
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

export default MonthView;
