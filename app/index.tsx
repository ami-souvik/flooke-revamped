import React, { useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSQlite } from '@/contexts/DBProvider';
import { groupByDate, summarizeRecords } from '@/helpers/record';
import { changeMonth } from '@/helpers/datetime';
import { DBRecord } from '@/database/schemas/record';
import { RecordLineItem } from '@/components/RecordLineItem';

export default function Index() {
  const { findRecord, deleteRecords } = useSQlite();
  const [month, setMonth] = useState(new Date());
  const [records, setRecords] = useState<DBRecord[]>([]);
  useEffect(() => {
    // deleteRecords()
    findRecord(month).then(data => setRecords(data))
  }, [month]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
      }}>
        <IconButton
          icon="less-than"
          onPress={() => {
            setMonth(m => changeMonth(m, -1))
          }}
        />
        <Text style={{ fontSize: 24 }}>{`${(month.getMonth()+1).toString().padStart(2, '0')}, ${month.getFullYear()}`}</Text>
        <IconButton
          icon="greater-than"
          onPress={() => {
            setMonth(m => changeMonth(m, 1))
          }}
        />
      </View>
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
        renderItem={({ item }) => <RecordLineItem item={item} />}
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
          findRecord(month).then(data => setRecords(data))
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
    </SafeAreaView>
  );
}
