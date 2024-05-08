export function addDays(dt: Date, days: number) {
  var date = new Date(dt);
  date.setDate(date.getDate() + days);
  return date;
}