export const config = Object.assign({
  locale: document.documentElement.getAttribute("lang") || "en-US",
  today: {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
});
