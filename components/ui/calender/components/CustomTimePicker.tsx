// components/CustomTimePicker.tsx
"use client";

import * as React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

const HOURS    = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES  = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
const MERIDIEM = ["aa","AM", "PM"] as const;

interface CustomTimePickerProps {
  value: Date | null;
  onChange: (d: Date | null) => void;
}

export default function CustomTimePicker({
  value,
  onChange,
}: CustomTimePickerProps) {
  const [hour, setHour]         = useState(12);
  const [minute, setMinute]     = useState("00");
  const [meridiem, setMeridiem] = useState<"AM" |"aa"| "PM">("aa");

  // sync incoming value → local
  useEffect(() => {
    if (value) {
      let h = value.getHours();
      setMeridiem(h >= 12 ? "PM" : "AM");
      h = h % 12 || 12;
      setHour(h);
      setMinute(String(value.getMinutes()).padStart(2, "0"));
    }
    else{
    setHour(0);
    setMinute("00");
    setMeridiem("aa");
    }
  }, [value]);

  // build a JS Date and fire back
  const commit = () => {
    let h = hour % 12;
    if (meridiem === "PM") h += 12;
    const d = new Date(value!); 
    d.setHours(h, parseInt(minute, 10), 0, 0);
    onChange(d);
  };

  return (
    <Popover className=" relative  block w-full text-left">
      {/* Trigger */}
      <PopoverButton className="inline-flex w-full items-center gap-1 px-3 py-3 border border-zinc-500 rounded-md bg-zinc-800 text-white">
        <Clock className="w-5 h-5 shrink-0 sm:block hidden" />
        <span className="font-mono text-sm px-2">
          {String(hour).padStart(2, "0")}:{minute} {meridiem}
        </span>
      </PopoverButton>

      {/* Panel */}
      <PopoverPanel className="absolute z-10 mt-1 bg-zinc-900 border border-zinc-700 rounded shadow-lg p-2 w-max
  left-1/2 -translate-x-[65%] "
>


        {/* Columns */}
        <div className="flex gap-2">
          <div className="max-h-48 overflow-y-auto">
            {HOURS.map((h) => (
              <button
              type="button"
                key={h}
                onClick={() => setHour(h)}
                className={`block w-12 text-center py-1 rounded ${
                  h === hour ? "bg-zinc-600" : "hover:bg-zinc-700"
                }`}
              >
                {String(h).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="max-h-48 overflow-y-auto">
            {MINUTES.map((m) => (
              <button
              type="button"
                key={m}
                onClick={() => setMinute(m)}
                className={`block w-12 text-center py-1 rounded ${
                  m === minute ? "bg-zinc-600" : "hover:bg-zinc-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="max-h-48 overflow-y-auto">
            {MERIDIEM.map((md) => (
              <button
              type="button"
                key={md}
                onClick={() => setMeridiem(md)}
                className={`block w-12 text-center py-1 rounded ${
                  md === meridiem ? "bg-zinc-600" : "hover:bg-zinc-700"
                }`}
              >
                {md}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm button below */}
        <div className="mt-2 flex justify-end">
          <PopoverButton
            as="button"
            onClick={commit}
            className="px-3 py-1 bg-zinc-500 rounded text-white hover:bg-zinc-600"
          >
            OK
          </PopoverButton>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
