import React, { createContext, useContext, useState } from 'react';
import { SQLiteRunResult, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { Record, DBRecord } from '@/database/schemas/record';
import { Category, DBCategory } from '@/database/schemas/category';
import { saveRecord, deleteRecord, deleteRecords, findRecord } from '@/database/operations/record';
import { findCategory, saveCategory, deleteCategory } from '@/database/operations/category';
import { changeMonth } from '@/helpers/datetime';

export interface SQliteOps {
  range: Date;
  records: DBRecord[];
  categories: DBCategory[];

  setRange: (d: Date) => void;
  prevRange: () => void;
  nextRange: () => void;

  refreshRecord: () => Promise<void>;
  findRecord: (range: Date) => Promise<DBRecord[]>;
  saveRecord: (v: Record) => void;
  deleteRecords: () => void;
  deleteRecord: (v: string) => void;

  refreshCategory: () => Promise<void>;
  findCategory: () => Promise<DBCategory[]>;
  saveCategory: (v: Category) => void;
  deleteCategory: (v: string) => void;
}

const DBContext = createContext<SQliteOps>({
  range: new Date(),
  records: [],
  categories: [],

  setRange: (d: Date) => new Date(),
  prevRange: () => {},
  nextRange: () => {},

  refreshRecord: () => new Promise(() => {}),
  findRecord: (r) => new Promise(() => {}),
  saveRecord: (v) => {},
  deleteRecords: () => {},
  deleteRecord: (v) => {},

  refreshCategory: () => new Promise(() => {}),
  findCategory: () => new Promise(() => {}),
  saveCategory: (v) => {},
  deleteCategory: (v) => {},
});

export function DBProvider({ children }: { children: any }) {
  const db: SQLiteDatabase = useSQLiteContext();
  const [range, setRange] = useState<Date>(new Date());
  const [records, setRecords] = useState<DBRecord[]>([]);
  const [categories, setCategpories] = useState<DBCategory[]>([]);
  const prevRange = async () => {
    setRange((m) => changeMonth(m, -1));
  };
  const nextRange = async () => {
    setRange((m) => changeMonth(m, 1));
  };
  const refreshRecord = async () => {
    setRecords(await findRecord(db, range));
  };
  const refreshCategory = async () => {
    setCategpories(await findCategory(db));
  };
  return (
    <DBContext.Provider
      value={{
        range,
        records,
        categories,

        setRange,
        prevRange: prevRange,
        nextRange: nextRange,

        refreshRecord: refreshRecord,
        findRecord: (range) => findRecord(db, range),
        saveRecord: (v) => {
          saveRecord(db, v)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          refreshRecord();
        },
        deleteRecords: () => {
          deleteRecords(db)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          refreshRecord();
        },
        deleteRecord: (v) => {
          deleteRecord(db, v)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          refreshRecord();
        },

        refreshCategory: refreshCategory,
        findCategory: () => findCategory(db),
        saveCategory: (v) => {
          saveCategory(db, v)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          refreshCategory();
        },
        deleteCategory: (v) => {
          deleteCategory(db, v)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          refreshCategory();
        },
      }}
    >
      {children}
    </DBContext.Provider>
  );
}

export function useSQlite(): SQliteOps {
  return useContext(DBContext);
}
