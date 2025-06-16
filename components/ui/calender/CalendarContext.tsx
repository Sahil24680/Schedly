"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import {
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from "date-fns";
import type {
  CalendarEvent,
  MonthNavigatorUIProps,
} from "@/components/ui/calender/types/calendar";
const dummyEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Meeting 1",
    type: "Exam",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 10),
    time_end: new Date(2025, 5, 12, 12),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "9",
    title: "Team Meeting 1",
    type: "Event",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 10),
    time_end: new Date(2025, 5, 12, 11),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "10",
    title: "Team Meeting 1",
    type: "Exam",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 10),
    time_end: new Date(2025, 5, 12, 11),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "4",
    title: "Team Meeting 2",
    type: "Meet",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 14),
    time_end: new Date(2025, 5, 12, 15),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "5",
    title: "Team Meeting 3",
    type: "Event",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 12, 30),
    time_end: new Date(2025, 5, 12, 13, 30),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "7",
    title: "Team Meeting 4",
    type: "Meet",
    date: new Date(2025, 5, 12),
    time_start: new Date(2025, 5, 12, 12, 30),
    time_end: new Date(2025, 5, 12, 13, 15),
    note: "Discuss Q3 roadmap",
    link: "https://zoom.us/123",
    location: "Zoom",
    color: "bg-indigo-400",
  },
  {
    id: "2",
    title: "Doctor’s Appointment",
    type: "Exam",
    date: new Date(2025, 5, 15),
    time_start: new Date(2025, 5, 15, 10),
    time_end: new Date(2025, 5, 15, 13, 30),
    note: null,
    link: null,
    location: "Main St Clinic",
    color: "bg-rose-400",
  },
];

type ViewUnit = MonthNavigatorUIProps["viewUnit"];
interface CalendarContextType {
  currentMonth: Date;
  prevDay: () => void;
  nextDay: () => void;
  prevWeek: () => void;
  nextWeek: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;
  viewUnit: ViewUnit;
  setViewUnit: (u: ViewUnit) => void;
  events: CalendarEvent[];
  setFilter(filter: string): void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewUnit, setViewUnit] = useState<ViewUnit>("Month");
  

  const [filter, setFilter] = useState<string>("Overview");


  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/s$/, "");

  const events = useMemo(() => {
    const f = normalize(filter);
    if (f === "overview") return dummyEvents;
    return dummyEvents.filter((ev) => normalize(ev.type) === f);
  }, [filter, dummyEvents]);

  const prevDay = () => setCurrentMonth((d) => subDays(d, 1));
  const nextDay = () => setCurrentMonth((d) => addDays(d, 1));
  const prevWeek = () => setCurrentMonth((d) => subWeeks(d, 1));
  const nextWeek = () => setCurrentMonth((d) => addWeeks(d, 1));
  const prevMonth = () => setCurrentMonth((d) => subMonths(d, 1));
  const nextMonth = () => setCurrentMonth((d) => addMonths(d, 1));
  const prevYear = () => setCurrentMonth((d) => subYears(d, 1));
  const nextYear = () => setCurrentMonth((d) => addYears(d, 1));

  return (
    <CalendarContext.Provider
      value={{
        currentMonth,
        prevDay,
        nextDay,
        prevWeek,
        nextWeek,
        prevMonth,
        nextMonth,
        prevYear,
        nextYear,
        viewUnit,
        setViewUnit,
        events,
        setFilter,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error("useCalendar must be inside CalendarProvider");
  return ctx;
}
