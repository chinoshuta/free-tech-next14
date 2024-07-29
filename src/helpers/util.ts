import { Settings, DateTime } from "luxon";

export const getFormatDateString = (date: string) => {
  Settings.defaultLocale = "ja";
  return DateTime.fromJSDate(new Date(date)).toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY
  );
};
