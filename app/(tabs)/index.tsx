import React, { useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { useSQlite } from '@/contexts/DBProvider';
import { groupByDate, summarizeRecords } from '@/helpers/record';
import { RecordLineItem } from '@/components/RecordLineItem';
import GestureRecognizer from '@/components/GestureRecognizer';
import MonthStrip from '@/components/MonthStrip';
import { SectionHeader } from '@/components/SectionHeader';

export default function Index() {
  const { range, prevRange, nextRange, records, refreshRecord, deleteRecords } = useSQlite();
  useEffect(() => {
    // deleteRecords()
    refreshRecord(range);
  }, [range]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <MonthStrip month={range} />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#aaa',
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 12,
          }}
        >
          <Text style={{ fontFamily: 'mukta-reg' }}>Income</Text>
          <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summarizeRecords(records).income}</Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 12,
          }}
        >
          <Text style={{ color: 'red', fontFamily: 'mukta-reg' }}>Expenses</Text>
          <Text style={{ color: 'red', fontSize: 20, fontFamily: 'mukta-reg' }}>
            ₹{summarizeRecords(records).expenses}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 12,
          }}
        >
          <Text style={{ fontFamily: 'mukta-reg' }}>Total</Text>
          <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summarizeRecords(records).total}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
        <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>Account</Text>
        <Text style={{ flex: 1.5, padding: 12, fontFamily: 'mukta-reg' }}>Category</Text>
        <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg', textAlign: 'right' }}>Amount</Text>
      </View>
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
