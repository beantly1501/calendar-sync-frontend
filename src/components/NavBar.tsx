import {
  Calendar,
  Link, Navbar,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RangeCalendar, RangeValue,
  Switch
} from "@nextui-org/react";
import {House, User, XCircle} from "@phosphor-icons/react";
import {DateValue, getLocalTimeZone, today} from "@internationalized/date";
import {RangedCalendarType} from "../types.ts";
import {Dispatch, useEffect, useState} from "react";
import {dateFormatted} from "../helpers.ts";

type Props = {
  rangedCalendar: boolean;
  selectedDate: DateValue | undefined;
  selectedDateRange: RangedCalendarType | undefined;
  handleChangeCalendarType: () => void;
  handleDateRange: (event: RangeValue<DateValue>) => void;
  setSelectedDate: Dispatch<DateValue>;
  resetCalendars: () => void;
}


export const NavBar = ({selectedDate, selectedDateRange, handleChangeCalendarType, rangedCalendar, handleDateRange, setSelectedDate, resetCalendars}: Props) => {

  const [date, setDate] = useState<string>();
  const [startDateRange, setStartDateRange] = useState<string>();
  const [endDateRange, setEndDateRange] = useState<string>();

  useEffect(() => {

    console.log(window.innerWidth)

    if (window.innerWidth <= 750) {
      if (selectedDateRange) {
        setStartDateRange(dateFormatted(selectedDateRange.start).shortDate);
        setEndDateRange(dateFormatted(selectedDateRange.end).shortDate);
      } else if (selectedDate) {
        setDate(dateFormatted(selectedDate).shortDate);
      }
    }
    else {
      if (selectedDateRange) {
        setStartDateRange(dateFormatted(selectedDateRange.start).longDate);
        setEndDateRange(dateFormatted(selectedDateRange.end).longDate);
      } else if (selectedDate) {
        setDate(dateFormatted(selectedDate).shortDate);
      }
    }
  }, [selectedDateRange, setStartDateRange, selectedDate, setSelectedDate, window, date, setDate]);

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
                      <p className="font-bold">{startDateRange}</p>
                      -
                      <p className="font-bold">{endDateRange}</p>
                    </div>
                  </div>
                )}
                {selectedDate && (
                  <div className="bg-gray-100 p-3 rounded-2xl cursor-pointer">
                    <p className="font-bold">{date}</p>
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
  )
}