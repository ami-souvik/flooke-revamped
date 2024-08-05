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
  const { saveRecord } = useSQlite();
  const onSubmit = async (data: Record) => {
    const urlmap = {};
    let urlpref = '';
    const parts = payurl.split('&');
    parts.forEach((each) => {
      if (each.split('=')[0]) {
        urlmap[each.split('=')[0]] = each.split('=')[1];
      }
    });
    urlmap.am = data.amount;
    urlmap.cu = 'INR';
    urlmap.tr = '1234567890';
    urlmap.tid = 'akjsnckanclkas';
    urlmap.tn = 'This is my note';
    urlpref += Object.keys(urlmap)
      .map((k) => k + '=' + urlmap[k])
      .join('&');
    urlpref = urlpref.replace('upi://pay?', 'paytmmp://pay?');
    console.log(urlpref);
    const result = await Linking.openURL(
      'phonepe://pay?pa=chowdhuryshreya811@okhdfcbank&pn=Shreya Chowdhury&tn=Test UPI&am=1&cu=INR&mc=1234&tr=01234',
    );
    data.confirmed = false;
    saveRecord(data);
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
