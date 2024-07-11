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

export function generictimestamp(date: Date): string {
  return date.toISOString();
}