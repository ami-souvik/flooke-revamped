import React, { useCallback, useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Dialog, IconButton, Button, Text, TextInput } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

const thingstoremember = [
  'Remove Your EGO',
  'Enter Expenses',
  'Monthly / Discretionary',
  'Summarize + Analyze',
  'Reward Yourself',
];

export default function Index() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showEntry, setShowEntry] = useState(false);
  const [payurl, setPayurl] = useState('');
  const [amount, setAmount] = useState(0);
  // const url = 'phonepe://pay';
  // const url = 'tez://upi/pay?pa=9000000009@upi&pn=User1&tn=Test UPI&am=20&cu=INR&mc=1234&tr=01234';
  // const url = 'paytmmp://pay?pa=9000000009@upi&pn=User1&tn=Test UPI&am=20&cu=INR&mc=1234&tr=01234';
  // const url = 'upi://pay?pa=suyashvashishtha@axl&pn=Suyash%20Vashishtha&am=20&mc=0000&mode=02&purpose=00';
  const handlePress = useCallback(async () => {
    console.log(`${payurl}&am=${amount}`);

    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(`${payurl}&am=${amount}`);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(`${payurl}&am=${amount}`);
    } else {
      Alert.alert(`Don't know how to open this URL: ${payurl}`);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {/* <List.Section>
        <List.Subheader>
          <Text variant="titleLarge">KEEP IN MIND</Text>
        </List.Subheader>
        {thingstoremember.map((each, idx) => (
          <List.Item title={<Text variant="bodyLarge">{each}</Text>} left={() => <Text>{idx + 1}</Text>} />
        ))}
      </List.Section> */}
      {
        <Dialog visible={showEntry} onDismiss={() => setShowEntry(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Amount" onChangeText={(text) => setAmount(text)} value={amount} />
            <Text>{payurl}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handlePress}>Go ahead</Button>
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
        >
          <View style={styles.buttonContainer}></View>
        </CameraView>
      )}
      <IconButton icon="camera" size={20} onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
