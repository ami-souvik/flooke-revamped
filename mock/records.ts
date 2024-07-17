import { categories } from './categories';
import { accounts } from './accounts';

export const generateRecords = (num: number) => {
  const records = [];
  for (let i = 0; i < num; i++) {
    records.push({
      id: i.toString(),
      date: new Date(`2024-06-${i.toString().padStart(2, '0')}`).toISOString(),
      category: accounts[Math.ceil(Math.random() * 10) % accounts.length].value,
      account: categories[Math.ceil(Math.random() * 10) % categories.length].value,
      amount: Math.ceil(Math.random() * 1000),
    });
  }
  return records;
};
