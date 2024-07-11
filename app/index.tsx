import React, { useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSQlite } from '@/contexts/DBProvider';
import { groupByDate, summarizeRecords } from '@/helpers/record';

export default function Index() {
  const { findRecord, deleteRecord } = useSQlite();
  const [records, setRecords] = useState<DBRecord[]>([]);
  useEffect(() => {
    // deleteRecord()
    findRecord().then(data => setRecords(data))
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
      }}>
        <View style={{
          flex: 1,
          padding: 12
        }}>
          <Text style={{ fontFamily: 'mukta-reg'}}>Income</Text>
          <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summarizeRecords(records).income}</Text>
        </View>
        <View style={{
          flex: 1,
          padding: 12
        }}>
          <Text style={{ color: 'red', fontFamily: 'mukta-reg' }}>Expenses</Text>
          <Text style={{ color: 'red', fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summarizeRecords(records).expenses}</Text>
        </View>
        <View style={{
          flex: 1,
          padding: 12
        }}>
          <Text style={{ fontFamily: 'mukta-reg'}}>Total</Text>
          <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summarizeRecords(records).total}</Text>
        </View>
      </View>
      <SectionList
        sections={groupByDate(records)}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>{item.category}</Text>
            <Text style={{ flex: 1.5, padding: 12, fontFamily: 'mukta-reg' }}>{item.account}</Text>
            <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg', textAlign: 'right' }}>₹{item.amount}</Text>
          </View>
        )}
        renderSectionHeader={({section: {date}}) => (
          <View
            style={{
              width: '100%',
              padding: 12,
              flexDirection: 'row',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>{date}</Text>
          </View>
        )}
      />
      <IconButton
        mode="contained"
        icon="refresh"
        size={28}
        style={{ position: 'absolute', bottom: 140, right: 20 }}
        onPress={() => {
          findRecord().then(data => setRecords(data))
        }}
      />
      <IconButton
        mode="contained"
        icon="plus"
        size={28}
        style={{ position: 'absolute', bottom: 80, right: 20 }}
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
    </View>
  );
}
