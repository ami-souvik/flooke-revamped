export interface Record {
  date: Date;
  amount: number;
  category: string;
  account: string;
  confirmed: boolean;
}

export interface DBRecord {
  id: string;
  date: string;
  amount: number;
  category: string;
  account: string;
  confirmed: boolean;
}
