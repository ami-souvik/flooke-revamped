export interface Record {
    date: Date;
    amount: number;
    category: string;
    account: string;
}

export interface DBRecord {
    id: string;
    date: string;
    amount: number;
    category: string;
    account: string;
}