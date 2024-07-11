import { type SQLiteDatabase } from "expo-sqlite";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Record, DBRecord } from "@/database/schemas/record";
import { generictimestamp } from "@/helpers/datetime";

export async function findRecord(db: SQLiteDatabase): Promise<DBRecord[]> {
    return db.getAllAsync('SELECT * FROM records');
}

export function createRecord(db: SQLiteDatabase, data: Record) {
    return db.runAsync(`INSERT INTO records (id, account, amount, category, date) VALUES ("${uuidv4()}", "${data.account}", ${data.amount}, "${data.category}", "${generictimestamp(data.date)}")`)
}

export function deleteRecord(db: SQLiteDatabase) {
    return db.runAsync('DELETE FROM records');
}
