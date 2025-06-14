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
import {CalendarEvent,CalendarProps } from "@/components/ui/calender/types/calendar"



const Calendar = () => {
  // 1) figure out the block of dates we need (Mon–Sun weeks)
  const today      = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd   = endOfMonth(today);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });   
  const gridEnd   = endOfWeek(monthEnd,   { weekStartsOn: 1 });   

  const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div className="border border-zinc-700  grid grid-cols-7 gap-px  text-white">
      {/* Weekday headers */}
      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
        <div key={d} className="py-2 text-center border border-zinc-700 font-medium">
          {d}
        </div>
      ))}

      {/* Calendar cells */}
      {allDays.map(day => {
        return (
          <div
            key={day.toString()}
            className="h-28 p-1 border border-zinc-700 " >
            {/* date number */}
            <div className="text-sm mb-1">{format(day, "d")}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
