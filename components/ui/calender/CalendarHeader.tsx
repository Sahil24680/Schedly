import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const CalendarHeader = () => {
  return (
    <div className="flex items-center justify-between   border border-zinc-700 rounded-t-xl px-4 py-3">
      {/* ─── Left side: Date badge + Month title ─── */}
      <div className="flex items-center gap-4">
        {/* Date badge */}
        
        <div className="flex flex-col items-center justify-center bg-zinc-800 rounded-lg px-3 py-2">
          <span className="text-xs font-medium text-zinc-400 bg-zinc-800 uppercase">Sep</span>
          <div className="border-t border-white w-full "></div>
          <span className="text-2xl font-bold text-white">10</span>
        </div>

        {/* Month title + date range */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white">January 2025</span>
          <span className="text-sm text-zinc-400">Jan 1, 2025 – Jan 31, 2025</span>
        </div>
      </div>

      {/* ─── Right side: Controls ─── */}
      <div className="flex items-center gap-3">
       

        

        {/* 5) View dropdown */}
        <div className="relative">
          <button
            type="button"
            className="
              flex items-center gap-1
              px-3 py-2
              bg-zinc-800/50
              border border-zinc-700
              text-sm text-white
              rounded-md
              hover:bg-zinc-800
            "
          >
            Month view
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          </button>
          {/* 
            If you need a dropdown menu, you can render it as a sibling <ul>
            positioned absolutely under this button. Omitted here for brevity.
          */}
        </div>

        {/* 6) + Add event button */}
        <button
          type="button"
          className="
            flex items-center gap-1
            px-4 py-2
            bg-indigo-600
            text-sm font-medium text-white
            rounded-md
            hover:bg-indigo-500
          "
        >
          <span className="text-lg leading-none">+</span>
          Add event
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
