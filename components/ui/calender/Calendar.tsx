// components/ui/calender/Calendar.tsx
"use client";

import React, { useMemo } from "react";
import Day_View from "./components/Day_view";
import WeekView from "./components/Week_view";
import MonthView from "./components/MonthView";
import Year_view from "./components/Year_view";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { useCalendar } from "./CalendarContext";

interface CalendarProps {
  onEventClick: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onEventClick }) => {
  const { currentMonth, viewUnit, events } = useCalendar();

  // compute `days` array for Month & Year views
  const days = useMemo(() => {
    if (viewUnit === "Month") {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
      const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: gridStart, end: gridEnd });
    } else {
      const yearStart = startOfYear(currentMonth);
      const yearEnd = endOfYear(currentMonth);
      return eachDayOfInterval({ start: yearStart, end: yearEnd });
    }
  }, [currentMonth, viewUnit]);

  // Day view
  if (viewUnit === "Day") {
    return (
      <Day_View
        date={currentMonth}
        events={events}
        slotHeight={1}
        onEventClick={onEventClick}
      />
    );
  }

  // Week view
  if (viewUnit === "Week") {
    return (
      <WeekView
        referenceDate={currentMonth}
        events={events}
        slotHeight={1}
        onEventClick={onEventClick}
      />
    );
  }

  // Month view
  if (viewUnit === "Month") {
    return (
      <MonthView
        days={days}
        events={events}
        onEventClick={onEventClick}
      />
    );
  }

  // Year view
  if (viewUnit === "Year") {
    return (
      <Year_view
        days={days}
        
      />
    );
  }

  // fallback (shouldn't happen)
  return null;
};

export default Calendar;
