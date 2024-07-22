import React, { useEffect } from 'react';
import { SectionList, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSQlite } from '@/contexts/DBProvider';
import { groupByDate, summarizeRecords } from '@/helpers/record';
import { RecordLineItem } from '@/components/RecordLineItem';
import GestureRecognizer from '@/components/GestureRecognizer';
import MonthStrip from '@/components/MonthStrip';
import { SectionHeader } from '@/components/SectionHeader';
import { SafeAreaView, Hstack, Vstack, Text } from '@/components/primitive';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Index() {
  const colors = useThemeColor()
  const { range, prevRange, nextRange, records, deleteRecords } = useSQlite();
  useEffect(() => {
    // deleteRecords()
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
        <MonthStrip month={range} />
        <Hstack
          style={{
            borderBottomWidth: 1,
          }}
        >
          <Vstack
            style={{
              flex: 1,
              padding: 12,
            }}
          >
            <Text>Income</Text>
            <Text style={{ fontSize: 20 }}>₹{summarizeRecords(records).income}</Text>
          </Vstack>
          <Vstack
            style={{
              flex: 1,
              padding: 12,
            }}
          >
            <Text style={{ color: colors.red[800] }}>Expenses</Text>
            <Text style={{ color: colors.red[800], fontSize: 20 }}>
              ₹{summarizeRecords(records).expenses}
            </Text>
          </Vstack>
          <Vstack
            style={{
              flex: 1,
              padding: 12,
            }}
          >
            <Text>Total</Text>
            <Text style={{ fontSize: 20 }}>₹{summarizeRecords(records).total}</Text>
          </Vstack>
        </Hstack>
        <Hstack style={{ borderBottomWidth: 1 }}>
          <Text style={{ flex: 1, padding: 12 }}>Account</Text>
          <Text style={{ flex: 1.5, padding: 12 }}>Category</Text>
          <Text style={{ flex: 1, padding: 12, textAlign: 'right' }}>Amount</Text>
        </Hstack>
        <GestureRecognizer
          onSwipeLeft={nextRange}
          onSwipeRight={prevRange}
          style={{
            flex: 1,
          }}
        >
          <SectionList
            sections={groupByDate(records)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => <RecordLineItem item={item} />}
            renderSectionHeader={({ section }) => <SectionHeader {...section} />}
            renderSectionFooter={({ section: { date } }) => <View style={{ borderBottomWidth: 1 }} />}
          />
        </GestureRecognizer>
        <IconButton
          mode="contained"
          icon="plus"
          size={28}
          style={{
            position: 'absolute',
            bottom: 80,
            right: 20,
          }}
          onPress={() => {
            router.push('/entry');
          }}
        />
        <IconButton
          mode="contained"
          icon="camera"
          size={28}
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          onPress={() => {
            router.push('/scanner');
          }}
        />
      </SafeAreaView>
  );
}
