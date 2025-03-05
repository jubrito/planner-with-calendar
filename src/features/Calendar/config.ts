import { Months } from "../../utils/enums";

const year = 2025;
const month = Months.FEBRUARY;
const day = 1;
const date = new Date(year, month, day);
// const date = new Date();

export const config = Object.assign({
  locale: document.documentElement.getAttribute("lang") || "en-US",
  today: {
    date,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    time: date.getTime(),
    monthNumberOfDays: new Date(year, month + 1, 0).getDate(),
  },
});
