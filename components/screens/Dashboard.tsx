import React, { useEffect } from 'react';
import { Pressable, SectionList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSQlite } from '@/contexts/DBProvider';
import { groupByDate, summarizeRecords } from '@/helpers/record';
import MonthStrip from '@/components/MonthStrip';
import { SafeAreaView } from '@/components/primitive';
import { useThemeColor } from '@/hooks/useThemeColor';
import Record from '@/components/layout/Record';
import { DAYS } from '@/helpers/datetime';

export default function Dashboard() {
  const colors = useThemeColor();
  const { range, prevRange, nextRange, records, deleteRecords } = useSQlite();
  useEffect(() => {
    // deleteRecords()
  }, []);
  return (
    <SafeAreaView>
      <MonthStrip month={range} />
      <Record
        values={[
          `Income\n₹${summarizeRecords(records).income}`,
          `Expenses\n₹${summarizeRecords(records).expenses}`,
          `Total\n₹${summarizeRecords(records).total}`,
        ]}
        caseStyle={{
          backgroundColor: colors.licorice,
        }}
      />
      <Record
        values={['Category', 'Account', 'Amount']}
        caseStyle={{
          backgroundColor: colors.licorice,
        }}
      />
      <SectionList
        sections={groupByDate(records)}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => {
          const { category, account, amount } = item;
          return (
            <Pressable onPress={() => router.push({ pathname: '/entry', params: item })}>
              <Record values={[category, account, `₹${amount}`]} />
            </Pressable>
          );
        }}
        renderSectionHeader={({ section }) => {
          const { date, summary } = section;
          return (
            <Record
              values={[
                `${date.substring(0, 2)} ${DAYS[
                  new Date(
                    Number(date.substring(6, 10)),
                    Number(date.substring(3, 5)) - 1,
                    Number(date.substring(0, 2)),
                  ).getDay()
                ].substring(0, 3)}`,
                `₹${summary.expenses}`,
              ]}
              caseStyle={{
                backgroundColor: colors.richblack,
              }}
            />
          );
        }}
      />
      <IconButton
        mode="contained"
        icon="plus"
        size={28}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          router.push('/entry');
        }}
      />
    </SafeAreaView>
  );
}
