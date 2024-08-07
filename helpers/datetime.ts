export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function parsetimestamp(timestamp: string | number, type: 'date' | 'time', prev: Date): Date {
  if (!prev) return new Date(timestamp);
  if (type === 'date') {
    prev.setDate(new Date(timestamp).getDate());
    prev.setMonth(new Date(timestamp).getMonth());
    prev.setFullYear(new Date(timestamp).getFullYear());
  } else {
    prev.setMilliseconds(new Date(timestamp).getMilliseconds());
    prev.setSeconds(new Date(timestamp).getSeconds());
    prev.setMinutes(new Date(timestamp).getMinutes());
    prev.setHours(new Date(timestamp).getHours());
  }
  return prev;
}

export function formatdate(date: Date): string {
  return date.toLocaleDateString();
}

export function formattime(date: Date): string {
  return date.toLocaleTimeString();
}

export function sqlitedatetimestamp(date: Date): string {
  return date.toISOString();
}

export function whichMonth(num: number) {
  const montths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return montths[num];
}

export function changeMonth(date: Date, op: -1 | 1): Date {
  return new Date(date.getFullYear(), date.getMonth() + op);
}

export function monthYear(date: Date): string {
  return `${whichMonth(date.getMonth()).substring(0, 3)}, ${date.getFullYear()}`;
}
