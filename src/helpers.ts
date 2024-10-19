import { DateFormatter, DateValue } from '@internationalized/date';

export const dateFormatted = (dateValue: DateValue): {
  shortDate: string,
  longDate: string,
} => {

  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);

  const longFormatter = new DateFormatter('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const shortFormatter = new DateFormatter('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return {
    shortDate: shortFormatter.format(date),
    longDate: longFormatter.format(date),
  }
};