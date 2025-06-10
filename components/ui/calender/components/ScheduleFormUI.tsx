import {
  CalendarFold,
  Clock,
  Link2,
  MapPin,
  SquarePen,
  Shapes,
  List,
  Palette,
} from "lucide-react";
import { Button } from "@headlessui/react";
import { CalendarEvent } from "@/components/ui/calender/types/calendar";
import BasicDatePicker from "./BasicDatePicker";
import { useState } from "react";
import BasicTimePicker from "./BasicTimePicker";
type Props = {
  formData: Omit<CalendarEvent, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<CalendarEvent, "id">>>;
};

export default function ScheduleFormUI({ formData, setFormData }: Props) {
  const [selectedType, setSelectedType] = useState("Event");
  const [selectedColor, setSelectedColor] = useState("bg-indigo-400");
  
  const colors = [
    "bg-indigo-400",
    "bg-emerald-400",
    "bg-amber-400",
    "bg-rose-400",
    "bg-sky-400",
  ];

  return (
    <div className="mt-4 space-y-4">
      {/* Title */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <SquarePen className="h-6 w-6 text-white" />
          <label
            htmlFor="title"
            className="col-span-1 text-md font-medium text-white"
          >
            Title
          </label>
        </div>

        <input
          id="title"
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter a Title"
          className="col-span-2 w-full rounded-md border border-zinc-500 px-3 py-2 text-white placeholder-zinc-500  focus:ring-white"
        />
      </div>

      {/* Type */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <Shapes className="h-6 w-6 text-white" />
          <span className="col-span-1 text-md font-medium text-white">
            Type
          </span>
        </div>
        <div className="w-full flex space-x-2">
          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, type: "Event" });
              setSelectedType("Event");
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm cursor-pointer ${
              selectedType === "Event"
                ? "bg-zinc-400 text-white"
                : "bg-zinc-700 text-white hover:bg-zinc-600"
            }`}
          >
            Event
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, type: "Event" });
              setSelectedType("Meet");
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm cursor-pointer ${
              selectedType === "Meet"
                ? "bg-zinc-400 text-white"
                : "bg-zinc-700 text-white hover:bg-zinc-600"
            }`}
          >
            Meet
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, type: "Tasks" });
              setSelectedType("Meet");
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm cursor-pointer ${
              selectedType === "Tasks"
                ? "bg-zinc-400 text-white"
                : "bg-zinc-700 text-white hover:bg-zinc-600"
            }`}
          >
            Tasks
          </button>
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <CalendarFold className="h-6 w-6 text-white" />
          <span className="col-span-1 text-md font-medium text-white">
            Date
          </span>
        </div>
        <BasicDatePicker
          value={formData.date}
          onChange={(val) => setFormData({ ...formData, date: val })}
        />
      </div>

      {/* Time */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Clock className="h-6 w-6 text-white" />
          <span className="text-md font-medium text-white">Time</span>
        </div>
        <BasicTimePicker
          value={formData.time}
          onChange={(val) => setFormData({ ...formData, time: val })}
        />
      </div>

      {/* Note */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <List className="h-6 w-6 text-white" />
          <span className=" text-md font-medium text-white">Note</span>
        </div>
        <textarea
          rows={2}
          value={formData.note ?? ""}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Add description"
          className="flex-1 w-full border border-zinc-400 rounded-lg bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:ring-1 focus:ring-white resize-none break-words"
        />
      </div>

      {/* Link */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2">
          <Link2 className="h-6 w-6 text-white" />
          <span className="col-span-1 text-md font-medium text-white">
            Link
          </span>
        </div>
        <input
          type="url"
          value={formData.link ?? ""}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="https://"
          className="col-span-2 w-full border border-zinc-400 rounded-md bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:ring-1 focus:ring-white"
        />
      </div>

      {/* Location */}
      <div className="flex flex-row items-center gap-4 w-full">
        <div className="flex flex-row gap-2 imtes-center">
          <MapPin className="h-6 w-6 text-white" />
          <span className="text-sm font-medium text-white">Location</span>
        </div>
        <input
          type="text"
          placeholder="Add location"
          value={formData.location ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="flex-1 w-full border border-zinc-400 rounded-md bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:ring-1 focus:ring-white"
        />
      </div>

      {/* Colors */}
      <div className="flex flex-row items-center gap-6">
      <div className="flex flex-row gap-2">
        <Palette className="h-6 w-6 text-white" />
        <span className="text-md font-medium text-white">Color</span>
      </div>
      <div className="w-full flex space-x-3">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setSelectedColor(c);                      
              setFormData({ ...formData, color: c });    
            }}
            className={`
              ${c} h-6 w-6 rounded-full cursor-pointer ring-2 shadow-md
              ${selectedColor === c ? "ring-white" : "ring-transparent"}
              hover:ring-white
            `}
          />
        ))}
      </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm/6 font-semibold cursor-pointer text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
        >
          Add to Calendar
        </Button>
      </div>
    </div>
  );
}
