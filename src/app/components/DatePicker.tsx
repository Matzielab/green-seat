import React, { useState } from "react";
import {
  Popover,
  PopoverPanel,
  PopoverButton,
  Transition,
} from "@headlessui/react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { UseFormRegisterReturn } from "react-hook-form";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

dayjs.Ls.en.weekStart = 1;

interface DatePickerProps {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: Date;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  registration,
  defaultValue,
  error,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs(defaultValue));
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs(defaultValue)
  );

  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const getDaysInMonth = () => {
    const start = currentMonth.startOf("month").startOf("week");
    const end = currentMonth.endOf("month").endOf("week");
    const days = [];
    let day = start;

    while (day.isSameOrBefore(end)) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  };

  const handleDateSelect = (day: dayjs.Dayjs, close: () => void) => {
    setSelectedDate(day);
    if (registration.onChange) {
      registration.onChange({
        target: { value: day.toISOString(), name: registration.name },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    close();
  };

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-50 mb-1"
        htmlFor={registration.name}
      >
        {label}
      </label>
      <input
        type="hidden"
        {...registration}
        value={selectedDate ? selectedDate.toISOString() : ""}
      />
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton className="inline-flex justify-center w-full px-4 py-2 font-medium text-gray-100 bg-gray-700 border border-gray-500 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm">
              {selectedDate
                ? selectedDate.format("MMMM D, YYYY")
                : "Select a date"}
            </PopoverButton>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <PopoverPanel className="absolute right-0 z-10 w-64 mt-1 bg-gray-700 rounded-md shadow-lg">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-1 text-gray-100 hover:text-gray-50"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-gray-50">
                      {currentMonth.format("MMMM YYYY")}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="p-1 text-gray-100 hover:text-gray-50"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-center text-gray-50"
                      >
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth().map((day, dayIdx) => (
                      <button
                        key={dayIdx}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDateSelect(day, close);
                        }}
                        className={`
                          p-1 text-sm rounded-full
                          ${
                            day.month() === currentMonth.month()
                              ? "text-gray-50"
                              : "text-gray-500"
                          }
                          ${
                            selectedDate && day.isSame(selectedDate, "day")
                              ? "bg-emerald-600 text-white"
                              : "hover:bg-gray-800"
                          }
                        `}
                      >
                        {day.format("D")}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
