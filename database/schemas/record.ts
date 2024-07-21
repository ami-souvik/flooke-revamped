export interface Record {
  date: Date;
  amount: number;
  category: {
    emojicode: string;
    value: string;
  };
  account: {
    value: string;
  };
  confirmed: boolean;
}

export interface DBRecord {
  id: string;
  date: string;
  amount: number;
  category: string;
  categoryemojicode: string;
  account: string;
  confirmed: boolean;
}
