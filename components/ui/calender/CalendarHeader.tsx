import ShinyText from "@/components/ui/ShinyText";
import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { MonthNavigatorUI } from "@/components/ui/calender/components/MonthNavigatorUI";
import Modal from "@/components/ui/calender/components/Add_event_modal";
import { useCalendar } from "./CalendarContext";
const CalendarHeader = () => {
  const {
    viewUnit,
    setViewUnit,
    currentMonth,
    prevDay,
    nextDay,
    prevWeek,
    nextWeek,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
  } = useCalendar();
  const [isModalOpen, setModalOpen] = useState(false);
  const label = format(currentMonth, "MMMM yyyy");
  const handlePrev = () => {
    if (viewUnit === "Day") return prevDay();
    if (viewUnit === "Week") return prevWeek();
    if (viewUnit === "Year") return prevYear();
    return prevMonth(); // Month (default)
  };
  const handleNext = () => {
    if (viewUnit === "Day") return nextDay();
    if (viewUnit === "Week") return nextWeek();
    if (viewUnit === "Year") return nextYear();
    return nextMonth(); // Month (default)
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between   border border-zinc-700 rounded-t-xl px-4 py-3">
      {/* ─── Left side: Date badge + Month title ─── */}
      <div className="flex items-center gap-4">
        {/* Date badge */}

        <div className="hidden sm:flex flex-col items-center justify-center bg-zinc-800 rounded-lg px-3 py-2">
          <span className="text-xs font-medium text-zinc-400 bg-zinc-800 uppercase">
          {format(currentMonth, "MMM").toUpperCase()}
          </span>
          <div className="border-t border-white w-full "></div>
          <span className="text-2xl font-bold text-white">{format(currentMonth, "d")}</span>
        </div>

        {/* Month title + date range */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white">{label}</span>
          <span className="text-sm text-zinc-400">{format(currentMonth, "EEEE")}</span>
        </div>
      </div>

      {/* ─── Right side: Controls ─── */}
      <div className="flex items-center gap-3">
        <MonthNavigatorUI
          viewUnit={viewUnit}
          onViewUnitChange={setViewUnit}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <button
          type="button"
          className="flex items-center gap-2 px-3  py-2 bg-zinc-800 border border-zinc-700 text-sm sm:text-base font-medium rounded-md hover:bg-zinc-700 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <ShinyText
            text="＋ Add event"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </button>
      </div>
      {/* Mount the modal just once */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default CalendarHeader;
