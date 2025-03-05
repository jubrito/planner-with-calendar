import { useState } from "react";

const useDate = (
  initialYear: number,
  initialMonth: number,
  initialDay: number
) => {
  const [date, setDate] = useState(
    new Date(initialYear, initialMonth, initialDay)
  );

  const updateDate = (year: number, month: number, day: number) => {
    setDate(new Date(year, month, day));
  };

  return {
    date,
    updateDate,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    time: date.getTime(),
    monthNumberOfDays: new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate(),
  };
};
