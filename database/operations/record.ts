import { type SQLiteDatabase } from "expo-sqlite";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Record, DBRecord } from "@/database/schemas/record";
import { sqlitedatetimestamp } from "@/helpers/datetime";

export async function findRecord(db: SQLiteDatabase, range: Date): Promise<DBRecord[]> {
    const yearmonth = `${range.getFullYear()}-${(range.getMonth()+1).toString().padStart(2, '0')}`
    return db.getAllAsync(`SELECT * FROM records WHERE date >= date('${yearmonth}-01') AND date <= date('${yearmonth}-31')`);
}

export function createRecord(db: SQLiteDatabase, data: Record) {
    return db.runAsync(`INSERT INTO records (id, account, amount, category, date) VALUES ("${uuidv4()}", "${data.account}", ${data.amount}, "${data.category}", "${sqlitedatetimestamp(data.date)}")`)
}

export function deleteRecords(db: SQLiteDatabase) {
    return db.runAsync('DELETE FROM records');
}

export function deleteRecord(db: SQLiteDatabase, data: DBRecord) {
    return db.runAsync(`DELETE FROM records WHERE id = \'${data.id}\'`);
}
