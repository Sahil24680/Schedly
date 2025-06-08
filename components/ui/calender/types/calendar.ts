export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    // add other props here (e.g. startTime?: string, color?: string, etc.)
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