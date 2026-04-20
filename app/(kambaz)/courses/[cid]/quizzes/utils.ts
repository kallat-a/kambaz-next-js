export function availabilityLabel(quiz: {
  availableDate?: string;
  untilDate?: string;
}): string {
  const day = (s?: string) => (s ? String(s).slice(0, 10) : "");
  const today = new Date().toISOString().slice(0, 10);
  const av = day(quiz.availableDate);
  const un = day(quiz.untilDate);
  if (av && today < av) {
    return `Not available until ${av}`;
  }
  if (un && today > un) {
    return "Closed";
  }
  return "Available";
}
