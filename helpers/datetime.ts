export function parsetimestamp(timestamp: string | number, type: 'date' | 'time', prev: Date): Date {
  if(!prev) return new Date(timestamp);
  if(type === 'date') {
    prev.setDate(new Date(timestamp).getDate())
    prev.setMonth(new Date(timestamp).getMonth())
    prev.setFullYear(new Date(timestamp).getFullYear())
  }
  else {
    prev.setMilliseconds(new Date(timestamp).getMilliseconds())
    prev.setSeconds(new Date(timestamp).getSeconds())
    prev.setMinutes(new Date(timestamp).getMinutes())
    prev.setHours(new Date(timestamp).getHours())
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

export function changeMonth(date: Date, changeBy: 1 | -1): Date {
  date = new Date(date.getTime())
  date.setMonth(date.getMonth() + changeBy)
  return date
}