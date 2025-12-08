import { DateObject } from "react-multi-date-picker";

export const PersianDateConverter = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};
export const convertToUTC = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new DateObject({
      date: dateString,
      format: "YYYY/MM/DD",
      calendar: persian,
      locale: persian_fa,
    });
    return date.toDate().toISOString();
  } catch (err) {
    console.error("Invalid date:", dateString);
    return "";
  }
};
export const toJalali = (date) => {
  if (!date) return "";
  try {
    return new DateObject({
      date,
    })
      .convert(persian, persian_fa)
      .format("YYYY/MM/DD");
  } catch {
    return "";
  }
};
