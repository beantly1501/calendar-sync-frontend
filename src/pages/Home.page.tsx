import {
  Calendar,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RangeCalendar,
  RangeValue,
  Switch
} from "@nextui-org/react";
import {House, User, XCircle} from "@phosphor-icons/react";
import {CalendarDate, DateValue, getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";
import {RangedCalendarType} from "../types.ts";

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
    <Navbar shouldHideOnScroll isBlurred isBordered>
      <NavbarContent>
        <NavbarItem>
          <Link color="foreground" href="/" className="flex gap-2">
            <House size={32}/>
            <p className="hidden md:inline text-xl my-auto">Home</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem className="flex gap-2 items-center">
          <Popover placement="bottom" backdrop="opaque">
            <PopoverTrigger>
              <div>
                {selectedDateRange && (
                  <div className="bg-gray-100 p-3 rounded-2xl cursor-pointer">
                    <div className="flex gap-3">
                      <p className="font-bold">{selectedDateRange.start.toString()}</p>
                      -
                      <p className="font-bold">{selectedDateRange.end.toString()}</p>
                    </div>
                  </div>
                )}
                {selectedDate && (
                  <div className="bg-gray-100 p-3 rounded-2xl cursor-pointer">
                    <p className="font-bold">{selectedDate.toString()}</p>
                  </div>
                )}
                {!selectedDateRange && !selectedDate && (
                  <p className="bg-gray-100 p-3 rounded-2xl cursor-pointer">Pick a date</p>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-5">
              <div className="flex flex-col items-center gap-5">
                <Switch onClick={handleChangeCalendarType} isSelected={rangedCalendar}>
                  <p className={rangedCalendar ? 'text-blue-600' : 'text-black'}>Ranged calendar</p>
                </Switch>
                {rangedCalendar ? (
                  <RangeCalendar minValue={today(getLocalTimeZone())} onChange={(e) => handleDateRange(e)}
                                 value={selectedDateRange}/>
                ) : (
                  <Calendar minValue={today(getLocalTimeZone())} onChange={(e) => setSelectedDate(e)}
                            value={selectedDate}/>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <XCircle size={32} onClick={resetCalendars} className="cursor-pointer"/>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link color="foreground" href="/user/1" className="flex gap-2">
          <User size={32}/>
          <p className="hidden md:inline text-xl my-auto">Username</p>
        </Link>
      </NavbarContent>
    </Navbar>
  );
}