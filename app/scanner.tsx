import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import { CameraView } from 'expo-camera';

export default function Scanner() {
  const [showEntry, setShowEntry] = useState(false);
  const [payurl, setPayurl] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
  });
  const onSubmit = (data: { amount: string }) => {
    console.log(payurl);
    console.log(data);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {
        <Dialog visible={showEntry} onDismiss={() => setShowEntry(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <InputField control={control} name="amount" label="Amount" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmit(onSubmit)}>Go ahead</Button>
          </Dialog.Actions>
        </Dialog>
      }
      {!showEntry && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={(result) => {
            console.log(result.raw);
            setShowEntry(true);
            setPayurl(result.raw);
          }}
        ></CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
