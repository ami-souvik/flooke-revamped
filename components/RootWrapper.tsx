import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { DBProvider } from '@/contexts/DBProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surfaceVariant: '#fff',
  },
};

export default function RootWrapper({ children }: { children: any }) {
  const [loaded, error] = useFonts({
    'mukta-reg': require('@/assets/fonts/Mukta-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  return (
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
      <DBProvider>
        <PaperProvider theme={theme}>
          <NativeBaseProvider>{children}</NativeBaseProvider>
        </PaperProvider>
      </DBProvider>
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log('MIGRATE CALLED');
  // const DATABASE_VERSION = 1;
  // let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
  //   'PRAGMA user_version'
  // );
  // console.log(currentDbVersion);
  // if (currentDbVersion >= DATABASE_VERSION) {
  //   return;
  // }
  // if (currentDbVersion === 0) {
    // console.log('MIGRATE CALLED');
    
    // await db.execAsync(`
    // PRAGMA journal_mode = 'wal';
    // CREATE TABLE records (id TEXT NOT NULL, account TEXT NOT NULL, amount INTEGER NOT NULL, category TEXT NOT NULL, date TEXT NOT NULL);
    // `);
    // await db.runAsync('INSERT INTO records (id, account, amount, category, date) VALUES (?, ?, ?, ?, ?)', '1234', 'accounts', 12, 'lifestyle', '12/02/2020');
    // await db.runAsync('INSERT INTO records (id, account, amount, category, date) VALUES (?, ?, ?, ?, ?)', '3456', 'accounts', 50, 'cigerette', '12/02/2020');
  //   currentDbVersion = 1;
  // }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  // await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
