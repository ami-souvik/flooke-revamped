import { SQLiteRunResult, type SQLiteDatabase } from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Record, DBRecord } from '@/database/schemas/record';
import { sqlitedatetimestamp } from '@/helpers/datetime';

export async function findRecord(db: SQLiteDatabase, range: Date): Promise<DBRecord[]> {
  const yearmonth = `${range.getFullYear()}-${(range.getMonth() + 1).toString().padStart(2, '0')}`;
  return db.getAllAsync(
    `SELECT * FROM records WHERE date >= date('${yearmonth}-01') AND date <= date('${yearmonth}-31')`,
  );
}

export function saveRecord(db: SQLiteDatabase, data: Record): Promise<SQLiteRunResult> {
  return db.runAsync(
    `INSERT INTO records (id, account, amount, category, date, confirmed) VALUES\
     ("${data.id ? data.id : uuidv4()}", "${data.account}", ${Number(data.amount)}, "${data.category}",\
     "${sqlitedatetimestamp(data.date)}", "${data.confirmed ? 1 : 0}")
     ON CONFLICT(id) DO
      UPDATE
      SET
        account = excluded.account,
        amount = excluded.amount,
        category = excluded.category,
        date = excluded.date`,
  );
}

export function deleteRecords(db: SQLiteDatabase): Promise<SQLiteRunResult> {
  return db.runAsync('DELETE FROM records');
}

export function deleteRecord(db: SQLiteDatabase, id: string): Promise<SQLiteRunResult> {
  return db.runAsync(`DELETE FROM records WHERE id = \'${id}\'`);
}
