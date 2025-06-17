"use client";
import { useState ,useEffect} from "react";
import { Search } from "lucide-react";
import GooeyNav from "@/components/ui/calender/components/GooeyNav/GooeyNav";
import CalendarHeader from "@/components/ui/calender/CalendarHeader";
import Calendar from "@/components/ui/calender/Calendar";
import { CalendarProvider } from "@/components/ui/calender/CalendarContext";
import { useCalendar } from "@/components/ui/calender/CalendarContext";
import AIChat from "./components/AIChat";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";
import ViewEventModal from "./components/ViewEventModal"
import SearchBar from "./components/SearchBar";
const Calender_view = () => (
  <CalendarProvider>
    <CalenderInner />
  </CalendarProvider>
);
const CalenderInner = () => {
const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { setFilter,events } = useCalendar();
  const items = [
    { label: "Overview", href: "#" },
    { label: "Exams", href: "#" },
    { label: "Meetings", href: "#" },
    { label: "Events", href: "#" },
  ];
  return (
    <div className="p-4 md:p-10 w-full ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 md:gap-0">
        <h1 className="font-bold text-white text-2xl">Calender</h1>
        <SearchBar events={events} onSelect={setSelectedEvent} />
      </div>
      <div className="mt-6 md:mt-0 border border-zinc-700 bg-gray-800 rounded-sm inline-block ">
        <GooeyNav
          items={items}
          particleCount={15}
          onChange={setFilter}
          particleDistances={[90, 10]}
          particleR={15}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      <div className="mt-2 pb-24">
        <CalendarHeader />
        <Calendar onEventClick={setSelectedEvent}/>
      </div>
      <ViewEventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
      <AIChat />

    </div>
  );
};

export default Calender_view;
