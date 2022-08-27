import moment from "moment";

export function getDiffBetweenTwoDates({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);

  return {
    days: momentToDate.diff(momentFromDate, "days"),
    years: momentToDate.diff(momentFromDate, "years"),
    seconds: momentToDate.diff(momentFromDate, "hours"),
    weeks: momentToDate.diff(momentFromDate, "weeks"),
    months: momentToDate.diff(momentFromDate, "months"),
  };
}

export function getToday() {
  return moment().utcOffset("+05:30").format("YYYY-MM-DD");
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
