"use client";
import React, { useMemo } from "react";
import {
  addDays,
  startOfWeek,
  isToday,
  format,
  differenceInMinutes,
  setHours,
  setMinutes,
  isSameDay,
} from "date-fns";

import type { CalendarEvent } from "@/components/ui/calender/types/calendar";

export interface WeekViewProps {
  referenceDate?: Date;
  events: CalendarEvent[];
  slotHeight?: number; // px per minute
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function getWeekDates(refDate: Date) {
  const weekStart = startOfWeek(refDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

function getEventPosition(ev: CalendarEvent, slotHeight: number) {
  const start = ev.time_start!;
  const end = ev.time_end!;
  const gridStart = setHours(setMinutes(start, 0), 0);
  const minutesFromTop = Math.max(0, differenceInMinutes(start, gridStart));
  const duration = Math.max(15, differenceInMinutes(end, start));
  return {
    top: minutesFromTop * slotHeight,
    height: duration * slotHeight,
  };
}

function computeEventLayout(dayEvents: CalendarEvent[]) {
  const entries = dayEvents
    .map((ev, i) => ({ ev, idx: i, start: ev.time_start!, end: ev.time_end! }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const lanes: { end: Date; lane: number }[] = [];
  const layoutMeta = Array(entries.length);
  for (const ent of entries) {
    let lane = 0;
    while (lane < lanes.length && ent.start < lanes[lane].end) lane++;
    if (lane === lanes.length) lanes.push({ end: ent.end, lane });
    else lanes[lane].end = ent.end;
    layoutMeta[ent.idx] = lane;
  }

  return entries.map((ent, i) => {
    const thisLane = layoutMeta[i] as number;
    const overlapping = entries.filter(
      (o) => o !== ent && o.start < ent.end && o.end > ent.start
    );
    const colCount = Math.max(1, overlapping.length + 1);
    return {
      left: (thisLane / colCount) * 100,
      width: (1 / colCount) * 100,
    };
  });
}

export default function WeekView({
  referenceDate = new Date(),
  events,
  slotHeight = 1,
}: WeekViewProps) {
  const weekDates = useMemo(() => getWeekDates(referenceDate), [referenceDate]);

  const eventsPerDay: CalendarEvent[][] = useMemo(() => {
    return weekDates.map(day =>
      events.filter(ev => ev.date !== null && isSameDay(ev.date, day))
    );
  }, [events, weekDates]);

  const gridHeight = 1440 * slotHeight;

  return (
    <div className="flex flex-col w-full h-full text-white rounded-lg border border-zinc-700 overflow-hidden">
      {/* HEADER */}
      <div
        className="grid border-b border-zinc-700 bg-zinc-900"
        style={{ gridTemplateColumns: "56px repeat(7, minmax(0,1fr))" }}
      >
        {/* empty gutter cell */}
        <div />
        {weekDates.map((date, i) => {
          const today = isToday(date);
          return (
            <div
              key={i}
              className="flex items-center justify-center flex-col border-l border-zinc-700 py-2"
            >
              <span className="text-[0.77rem] text-zinc-400 uppercase font-semibold tracking-wide">
                {DAYS_OF_WEEK[i]}
              </span>
              <span
                className={`mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-base font-bold border-2
                  ${
                    today
                      ? "bg-blue-600 border-blue-400 text-white ring-2 ring-blue-300 shadow-lg"
                      : "bg-zinc-800 border-zinc-700 text-zinc-100"
                  }
                `}
              >
                {format(date, "d")}
              </span>
            </div>
          );
        })}
      </div>

      {/* BODY */}
      <div className="relative flex-1 flex min-h-0 overflow-y-auto">
        {/* hour lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {HOURS.map((h) => (
            <div
              key={h}
              className="absolute left-0 w-full border border-zinc-700 opacity-70"
              style={{ top: h * 60 * slotHeight }}
            />
          ))}
        </div>

        {/* gutter */}
        <div className="w-14 flex-shrink-0 border-r border-zinc-700 bg-zinc-900 z-10">
          <div className="sticky top-0 bg-zinc-900 py-1">
            <span className="block text-[0.58rem] text-zinc-500 text-right pr-1 pb-1 tracking-wide select-none">
              GMT
            </span>
          </div>
          {HOURS.map((h) => (
            <div
              key={h}
              className="h-[0px] py-0.5 px-1 text-[0.78rem] text-zinc-400 text-right select-none"
              style={{ height: 60 * slotHeight }}
            >
              {format(setHours(new Date(), h), "HH:00")}
            </div>
          ))}
        </div>

        {/* day columns */}
        <div className="flex flex-1 min-w-0">
          {weekDates.map((_, i) => {
            const dayEvents = eventsPerDay[i];
            const layouts = computeEventLayout(dayEvents);
            return (
              <div
                key={i}
                className="relative flex-1 min-w-0 border border-zinc-700"
                style={{ height: gridHeight }}
              >
                {dayEvents.map((ev, idx) => {
                  const { top, height } = getEventPosition(ev, slotHeight);
                  const { left, width } = layouts[idx];
                  return (
                    <div
                      key={ev.id?.toString()}
                      className={`absolute px-2 py-1 rounded-lg shadow text-[0.85rem] font-medium cursor-pointer overflow-hidden ${ev.color}`}
                      style={{
                        top,
                        height,
                        left: `calc(${left}% + 4px)`,
                        width: `calc(${width}% - 8px)`,
                        minHeight: 19,
                        zIndex: 10 + idx,
                      }}
                    >
                      <div className="truncate">{ev.title}</div>
                      <div className="text-[0.715em] text-zinc-300">
                        {format(ev.time_start!, "HH:mm")}–
                        {format(ev.time_end!, "HH:mm")}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
