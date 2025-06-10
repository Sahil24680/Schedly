export interface CalendarEvent {
  id: string | null; // UUID,
  title: string;
  type: "Event" | "Meet" | "Tasks";
  date: Date| null;
  time: Date| null;
  note: string|null;
  link: string|null;
  location: string|null;
  color: string;
    
  }
  
  export interface CalendarProps {
    month: Date;
    events: CalendarEvent[];
  }
  

  export interface MonthNavigatorUIProps {
    viewUnit: "Day" | "Month" | "Year"
    /** Handler for “previous month” click */
    onPrev?: () => void
    /** Handler for “next month” click */
    onNext?: () => void
    onViewUnitChange: (unit: "Day" | "Month" | "Year") => void;
  }