import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";
import ScheduleFormUI from "./ScheduleFormUI";
import { CalendarEvent } from "@/components/ui/calender/types/calendar";
import { toast } from "react-toastify";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const makeEmptyForm = (): Omit<CalendarEvent, "id"> => ({
  title: "",
  type: "Event",
  date: null,
  time_start: null,
  time_end:   null,
  note: null,
  link: null,
  location: null,
  color: "",
});

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState(makeEmptyForm());
  const handleClose = () => {
    setFormData(makeEmptyForm());
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please select a title");
      return;
    }
    if (!formData.date) {
      toast.error("Please select a date", {
        className: "bg-red-700 text-white rounded-md",
        progressClassName: "bg-yellow-300",
      });
      
      return;
    }
    if (!formData.time_start) {
      toast.error("Please select a time");
      return;
    }
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      ...formData,
    };
    console.log("Created event:", newEvent);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 cursor-pointer text-white hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
              <DialogTitle
                as="h3"
                className="mt-4 text-lg font-medium text-white text-center"
              >
                Schedule Event
              </DialogTitle>
              <form onSubmit={handleSubmit} className="mt-4">
                <ScheduleFormUI formData={formData} setFormData={setFormData} />
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
