"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import GooeyNav from "@/components/GooeyNav/GooeyNav";
import CalendarHeader from "@/components/ui/calender/CalendarHeader"
import Calendar from "@/components/ui/calender/Calendar";
import {CalendarEvent} from "@/components/ui/calender/types/calendar"
const Calender_view = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
  const events: CalendarEvent[] = [
    { id: "1", title: "Coffee", date: new Date(2025,0,6,11,30) },
    { id: "2", title: "Standup", date: new Date(2025,0,6,9,0) },
  ];
  const items = [
    { label: "Exams", href: "#" },
    { label: "Meetings", href: "#" },
    { label: "classes", href: "#" },
  ];
  return (
    <div className="p-4 md:p-10 w-full ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 md:gap-0">
        <h1 className="font-bold text-white text-2xl">Calender</h1>
        <div className="relative w-full max-w-xs">
          {/*input field */}
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 rounded-md bg-zinc-800/50 border border-zinc-700 pl-10 pr-3 text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm"
          />
          {/*  Magnifying-glass icon on the left */}
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
      <div className="mt-6 md:mt-0 border border-zinc-700 bg-gray-800 rounded-md inline-block " >
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={15}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      <div className="mt-2">
        <CalendarHeader/>
        <Calendar month={currentMonth} events={events} />
        </div>




    </div>
  );
};

export default Calender_view;
