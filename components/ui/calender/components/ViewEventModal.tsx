"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { CalendarEvent } from "@/components/ui/calender/types/calendar";

interface ViewEventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewEventModal({
  event,
  isOpen,
  onClose,
}: ViewEventModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="
            w-full max-w-md
            rounded-2xl bg-zinc-800 p-6
            backdrop-blur-2xl shadow-xl
            duration-300 ease-out
            data-closed:transform-[scale(95%)]
            data-closed:opacity-0
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <DialogTitle className="text-xl font-semibold text-white  mb-3">
              {event?.title ?? ""}
            </DialogTitle>
            {event?.type && (
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20 mb-2">
                {event.type}
              </span>
            )}
            <div className="w-full border border-zinc-500 mb-4 "></div>
          </div>
          

          {/* Content Section */}
          <div className="space-y-6 text-sm text-white">
            {/* Date & Time */}
            {(event?.date || event?.time_start) && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-zinc-700/40 rounded-lg flex items-center justify-center">
                  <Calendar size={18} className="text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0">
                  {event?.date && (
                    <p className="font-medium mb-1">
                      {event.date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  {event?.time_start && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock size={14} />
                      <span>
                        {event.time_start.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" – "}
                        {event.time_end?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            {event?.location && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-zinc-700/40 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 font-medium mb-1">Location</p>
                  <p className="text-white">{event.location}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            {event?.note && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-zinc-700/40 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 font-medium mb-1">Notes</p>
                  <p className="leading-relaxed text-white">{event.note}</p>
                </div>
              </div>
            )}

            {/* Link */}
            {event?.link && (
              <div className="pt-2 border-t border-zinc-700 mt-4">
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors w-full justify-center group"
                >
                  <ExternalLink size={16} />
                  Join Meeting
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
