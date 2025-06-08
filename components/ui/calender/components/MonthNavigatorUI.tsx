import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthNavigatorUIProps } from "@/components/ui/calender/types/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MonthNavigatorUI: React.FC<MonthNavigatorUIProps> = ({
  viewUnit,
  onPrev,
  onNext,
  onViewUnitChange,
}) => {
  return (
    <div className="inline-flex  overflow-hidden border border-zinc-700 rounded-md  text-white shadow-sm">
      <button
        onClick={onPrev}
        className="flex items-center border-r border-zinc-700  justify-center px-2 py-2 cursor-pointer hover:bg-gray-700 focus:outline-none"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center justify-center px-3 py-2 font-medium  text-sm sm:text-base">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <span className="block cursor-pointer">{viewUnit}</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center">
            {(["Day", "Month", "Year"] as const).map((unit) => (
              <DropdownMenuItem
                key={unit}
                onClick={() => onViewUnitChange(unit)}
              >
                {unit}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <button
        onClick={onNext}
        className="flex items-center border-l border-zinc-700 justify-center px-2 py-2 cursor-pointer hover:bg-gray-700 focus:outline-none"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
