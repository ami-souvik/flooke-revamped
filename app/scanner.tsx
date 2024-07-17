import React, { useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';
import ExpenseEntryQRDialog, { UPIInfo } from '@/components/ExpenseEntryQRDialog';
import { useSQlite } from '@/contexts/DBProvider';
import { Record } from '@/database/schemas/record';

function extractdata(payurl: string): UPIInfo | null {
  if (payurl.length === 0) {
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
  const [showEntry, setShowEntry] = useState(false);
  const [payurl, setPayurl] = useState('?pn=Souvik&pa=amsouvik@paytm');
  const { createRecord } = useSQlite();
  const onSubmit = async (data: Record) => {
    console.log(payurl);
    console.log(data);
    const result = await Linking.openURL(`${payurl}&am=${data.amount}`);
    console.log(result);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ExpenseEntryQRDialog data={extractdata(payurl)} onClose={() => setShowEntry(false)} onSubmit={onSubmit} />
      {/* {!showEntry && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={(result) => {
            setShowEntry(true);
            setPayurl(result.raw);
          }}
        ></CameraView>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
