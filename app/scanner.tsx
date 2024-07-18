import React, { useState } from 'react';
import { Linking, View } from 'react-native';
import ExpenseEntryQRDialog, { UPIInfo } from '@/components/ExpenseEntryQRDialog';
import { useSQlite } from '@/contexts/DBProvider';
import { Record } from '@/database/schemas/record';
import ScannerCam from '@/components/ScannerCam';

function extractdata(payurl: string): UPIInfo | null {
  if (!payurl) {
    return null;
  }
  const data: UPIInfo = {
    name: '',
    upiid: '',
  };
  const paramstr = payurl.split('?')[1];
  paramstr.split('&').forEach((k) => {
    let key = k.split('=')[0];
    let value = k.split('=')[1];
    if (key === 'pn') {
      data.name = decodeURI(value);
    } else if (key === 'pa') {
      data.upiid = value;
    }
  });
  return data;
}

export default function Scanner() {
  const [payurl, setPayurl] = useState<string>('');
  const { createRecord } = useSQlite();
  const onSubmit = async (data: Record) => {
    const result = await Linking.openURL(`${payurl}&am=${data.amount}`);
    data.confirmed = false;
    createRecord(result);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ExpenseEntryQRDialog data={extractdata(payurl)} onClose={() => setPayurl('')} onSubmit={onSubmit} />
      {!payurl && <ScannerCam setPayurl={setPayurl} />}
    </View>
  );
}
