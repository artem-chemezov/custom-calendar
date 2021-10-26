import moment from "moment";

export const clickPeriod = (calculateStartDate) => {
  let stop = moment();
  stop.set("date", stop.date() - stop.day());
  let start = moment(stop);
  calculateStartDate(start, stop);
  return { start, stop };
}