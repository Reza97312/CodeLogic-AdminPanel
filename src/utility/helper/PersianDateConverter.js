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
