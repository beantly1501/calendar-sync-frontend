import {RangeValue} from "@nextui-org/react";
import {CalendarDate, DateValue} from "@internationalized/date";
import {useState} from "react";
import {RangedCalendarType} from "../types.ts";
import {NavBar} from "../components/NavBar.tsx";

export default function HomePage() {

  const [rangedCalendar, setRangedCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateValue>();
  const [selectedDateRange, setSelectedDateRange] = useState<RangedCalendarType>();

  function handleDateRange(event: RangeValue<DateValue>) {
    const start = new CalendarDate(event.start.year, event.start.month, event.start.day);
    const end = new CalendarDate(event.end.year, event.end.month, event.end.day);
    setSelectedDateRange({
      start,
      end
    })
  }

  function handleChangeCalendarType() {
    setRangedCalendar(!rangedCalendar);
    setSelectedDate(undefined);
    setSelectedDateRange(undefined);
  }

  function resetCalendars() {
    setSelectedDate(undefined);
    setSelectedDateRange(undefined);
  }

  return (
    <div>
      <NavBar setSelectedDate={setSelectedDate} selectedDateRange={selectedDateRange} rangedCalendar={rangedCalendar}
              handleDateRange={handleDateRange} resetCalendars={resetCalendars} selectedDate={selectedDate}
              handleChangeCalendarType={handleChangeCalendarType}/>
    </div>
  );
}