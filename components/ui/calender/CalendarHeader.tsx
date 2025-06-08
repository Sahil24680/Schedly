import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";
import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { MonthNavigatorUI } from "@/components/ui/calender/components/MonthNavigatorUI";
import Modal from "@/components/ui/calender/components/Modal"
const CalendarHeader = () => {
  const [current, setCurrent] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false)

  const [viewUnit, setViewUnit] = useState<"Day"|"Month"|"Year">("Month");
  const label = format(current, "MMMM yyyy");
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between   border border-zinc-700 rounded-t-xl px-4 py-3">
      {/* ─── Left side: Date badge + Month title ─── */}
      <div className="flex items-center gap-4">
        {/* Date badge */}

        <div className="hidden sm:flex flex-col items-center justify-center bg-zinc-800 rounded-lg px-3 py-2">
          <span className="text-xs font-medium text-zinc-400 bg-zinc-800 uppercase">
            Sep
          </span>
          <div className="border-t border-white w-full "></div>
          <span className="text-2xl font-bold text-white">10</span>
        </div>

        {/* Month title + date range */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white">{label}</span>
          <span className="text-sm text-zinc-400">Monday</span>
        </div>
      </div>

      {/* ─── Right side: Controls ─── */}
      <div className="flex items-center gap-3">
        <MonthNavigatorUI viewUnit={viewUnit} onViewUnitChange={setViewUnit} onPrev={() => setCurrent((d) => subMonths(d, 1))} onNext={() => setCurrent((d) => addMonths(d, 1))}/>
        <button
          type="button"
          className="flex items-center gap-2 px-3  py-2 bg-zinc-800 border border-zinc-700 text-sm sm:text-base font-medium rounded-md hover:bg-zinc-700 cursor-pointer" onClick={() => setModalOpen(true)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CalendarHeader;
