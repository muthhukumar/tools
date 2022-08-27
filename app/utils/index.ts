import { faker } from "@faker-js/faker";
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
    years: momentToDate.diff(momentFromDate, "years"),
    months: momentToDate.diff(momentFromDate, "months"),
    weeks: momentToDate.diff(momentFromDate, "weeks"),
    days: momentToDate.diff(momentFromDate, "days"),
    hours: momentToDate.diff(momentFromDate, "hours"),
    minutes: momentToDate.diff(momentFromDate, "minutes"),
    seconds: momentToDate.diff(momentFromDate, "seconds"),
  };
}

export function getToday() {
  return moment().utcOffset("+05:30").format("YYYY-MM-DD");
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const options = {
  name: faker.name.fullName,
  email: faker.internet.email,
  password: faker.internet.password,
  uuid: faker.datatype.uuid,
  color: faker.color.rgb,
  city: faker.address.city,
  date: faker.date.past,
  "domain name": faker.internet.domainName,
  lorem: faker.lorem.paragraph,
  word: faker.word.adjective,
  phone: faker.phone.number,
  vehicle: faker.vehicle.vehicle,
};

export function generateRandom(option: keyof typeof options) {
  if (!options[option]) {
    return "";
  }
  return options[option]();
}

export function capitalize(value: string) {
  if (typeof value !== "string") return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function stringToBoolean(value: string) {
  return value === "true" ? true : false;
}

export function generatePassword(options: {
  length: number;
  upperCaseAlphabets: boolean;
  lowerCaseAlphabets: boolean;
  numbers: boolean;
  specialCharacters: boolean;
}) {
  const upperCaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*";

  let charset = "";
  let result = "";

  if (options.upperCaseAlphabets) charset += upperCaseAlphabets;
  if (options.lowerCaseAlphabets) charset += lowerCaseAlphabets;
  if (options.numbers) charset += numbers;
  if (options.specialCharacters) charset += specialCharacters;

  for (
    let iterator = 0, length = charset.length;
    iterator < options.length;
    ++iterator
  ) {
    result += charset.charAt(Math.random() * length);
  }

  return result;
}

export function tossCoin() {
  return Math.ceil(Math.random() * 10) > 5 ? "Tails" : "Heads";
}
