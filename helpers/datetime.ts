export function parsetimestamp(timestamp: string | number) {
  return new Date(timestamp);
}

export function formatdate(date: Date) {
  return date.toLocaleString();
}
