import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { DBProvider } from '@/contexts/DBProvider';
import { insertDefaultCategories } from '@/database/operations/category';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surfaceVariant: '#fff',
  },
};

export default function RootWrapper({ children }: { children: any }) {
  const [loaded, error] = useFonts({
    // 'mukta-reg': require('@/assets/fonts/Mukta-Regular.ttf'),
    'segoe ui': require('@/assets/fonts/Segoe UI.ttf'),
    tahoma: require('@/assets/fonts/tahoma.ttf'),
    'inter-reg': require('@/assets/fonts/Inter_28pt-Regular.ttf'),
    cascadia: require('@/assets/fonts/Cascadia.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
      <DBProvider>
        <FirebaseProvider>
          <NativeBaseProvider>{children}</NativeBaseProvider>
        </FirebaseProvider>
      </DBProvider>
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // MIGRATION SCRIPT

  // DROP TABLES
  await db.execAsync(`
    DROP TABLE IF EXISTS todos;
  `);
  // DROP TABLE IF EXISTS records;

  // CREATE TABLES
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY NOT NULL, account TEXT NOT NULL, amount INTEGER,\
     category TEXT NOT NULL, date TEXT NOT NULL, confirmed INTEGER);
    CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `);

  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    insertDefaultCategories(db);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
