export interface Category {
  value: string;
  group: 'income' | 'expense';
}

export interface DBCategory {
  id: string;
  value: string;
  group: 'income' | 'expense';
}
