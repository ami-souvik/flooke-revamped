import React, { createContext, useContext } from 'react';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { createRecord, deleteRecord, deleteRecords, findRecord } from '@/database/operations/record';
import { Record, DBRecord } from '@/database/schemas/record';

export interface SQliteOps {
    findRecord: (range: Date) => Promise<DBRecord[]>;
    createRecord: (v: Record) => void;
    deleteRecords: () => void;
    deleteRecord: (v: DBRecord) => void;
}

const DBContext = createContext<SQliteOps>({
    findRecord: (r) => new Promise(r => {r([])}),
    createRecord: (v) => {},
    deleteRecords: () => {},
    deleteRecord: (v) => {}
});

export function DBProvider({ children }: { children: any }) {
  
  const db: SQLiteDatabase = useSQLiteContext();
  return (
    <DBContext.Provider
      value={{
        findRecord: (range): Promise<DBRecord[]> => findRecord(db, range),
        createRecord: (v) => createRecord(db, v),
        deleteRecords: () => deleteRecords(db),
        deleteRecord: (v) => deleteRecord(db, v),
      }}
    >
      {children}
    </DBContext.Provider>
  );
}

export function useSQlite(): SQliteOps {
  return useContext(DBContext);
}
