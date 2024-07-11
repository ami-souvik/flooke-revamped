import React, { createContext, useContext } from 'react';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { createRecord, deleteRecord, findRecord } from '@/database/operations/record';
import { Record, DBRecord } from '@/database/schemas/record';

export interface SQliteOps {
    findRecord: () => Promise<DBRecord[]>;
    createRecord: (v: Record) => void;
    deleteRecord: () => void;
}

const DBContext = createContext<SQliteOps>({
    findRecord: () => new Promise(r => {r([])}),
    createRecord: (v) => {},
    deleteRecord: () => {}
});

export function DBProvider({ children }: { children: any }) {
  const db: SQLiteDatabase = useSQLiteContext();
  return (
    <DBContext.Provider
      value={{
        findRecord: (): Promise<DBRecord[]> => findRecord(db),
        createRecord: (v: Record) => createRecord(db, v),
        deleteRecord: () => deleteRecord(db),
      }}
    >
      {children}
    </DBContext.Provider>
  );
}

export function useSQlite(): SQliteOps {
  return useContext(DBContext);
}
