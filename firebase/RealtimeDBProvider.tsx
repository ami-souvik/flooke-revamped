import React, { createContext, useContext, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const RealtimeDBCtxt = createContext({});

export function RealtimeDBProvider({ children }) {
  const db = getDatabase();
  const save = ({ table, id = uuidv4(), data }) => set(ref(db, `${table}/` + id), data);
  const watch = ({ table, callback }) =>
    onValue(ref(db, `${table}/`), (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  return <RealtimeDBCtxt.Provider value={{ save, watch }}>{children}</RealtimeDBCtxt.Provider>;
}

export function useRealtimeDBase() {
  return useContext(RealtimeDBCtxt);
}
