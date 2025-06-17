"use client";

import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
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
            rounded-xl bg-zinc-800 p-6
            backdrop-blur-2xl
            duration-300 ease-out
            data-closed:transform-[scale(95%)]
            data-closed:opacity-0
          "
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Title */}
          <DialogTitle className="text-xl font-semibold text-white text-center">
            {event?.title ?? ""}
          </DialogTitle>

          {/* Details */}
          <div className="mt-4 space-y-2 text-sm text-zinc-200">
            {event?.type && (
              <p>
                <strong>Type:</strong> {event.type}
              </p>
            )}
            {event?.date && (
              <p>
                <strong>Date:</strong>{" "}
                {event.date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
            {event?.time_start && (
              <p>
                <strong>Time:</strong>{" "}
                {event.time_start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" – "}
                {event.time_end?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
            {event?.location && (
              <p>
                <strong>Location:</strong> {event.location}
              </p>
            )}
            {event?.note && (
              <p>
                <strong>Notes:</strong> {event.note}
              </p>
            )}
            {event?.link && (
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 underline"
                >
                  {event.link}
                </a>
              </p>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
