import { DBRecord } from '@/database/schemas/record';

function extractdate(stamp: string) {
  const d = new Date(stamp);
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

export interface RecordGroupByDate {
  date: string;
  data: DBRecord[]
}

export function groupByDate(records: DBRecord[]): RecordGroupByDate[] {
  const grouped: { [key: string]: DBRecord[] } = {};
  records.forEach((rec) => {
    if (!grouped[extractdate(rec.date)]) {
      grouped[extractdate(rec.date)] = [];
    }
    grouped[extractdate(rec.date)].push(rec);
  });
  return Object.keys(grouped).map(date => ({
    date,
    data: grouped[date]
  }));
}

export function summarizeRecords(records: DBRecord[]) {
  const summary = {
    income: 0,
    expenses: 0,
    total: 0
  }
  records.forEach(rec => {
    summary.expenses += rec.amount;
  })
  return summary
}