"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";

interface SearchBarProps {
  events: CalendarEvent[];
  onSelect: (event: CalendarEvent) => void;
}

export default function SearchBar({ events, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CalendarEvent[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(events, {
      keys: [
        { name: "title", weight: 0.9 },
        { name: "note", weight: 0.1 },
      ],
      threshold: 0.3,
    });
  }, [events]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
    } else {
      const matches = fuse.search(query).map((r) => r.item);
      setResults(matches.slice(0, 5)); // limit to top 5
      setShowDropdown(true);
    }
  }, [query, fuse]);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search events…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(results.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // delay so clicks can register
        className="w-full h-9 rounded-md bg-zinc-800/50 border border-zinc-700 pl-10 pr-3 text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm"
      />
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

      {/* Dropdown */}
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-md bg-zinc-800 border border-zinc-700 shadow-lg">
          {results.map((event) => (
            <li
              key={event.id}
              onClick={() => onSelect(event)}
              className="cursor-pointer px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-600 rounded-md"
            >
              <div className="font-medium truncate">{event.title}</div>
              {event.note && (
                <div className="text-xs text-zinc-400 truncate">
                  {event.note}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
