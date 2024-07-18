import React, { StyleSheet, View } from "react-native";
import { CameraView } from "expo-camera";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

export default function ScannerCam({ setPayurl }: { setPayurl: (v: string) => void }) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={'back'}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={(result) => {
            setPayurl(result?.raw || '');
          }}>
          <View style={styles.focusBox}>
            <View style={[styles.focusChild, styles.focusTopLeft]} />
            <View style={[styles.focusChild, styles.focusTopRight]} />
            <View style={[styles.focusChild, styles.focusBottomLeft]} />
            <View style={[styles.focusChild, styles.focusBottomRight]} />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="close"
              size={40}
              onPress={() => router.back()}
              style={styles.closeButton}
            />
          </View>
        </CameraView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    margin: 80,
    backgroundColor: 'transparent',
  },
  closeButton: {
    backgroundColor: 'white'
  },
  focusBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 400
  },
  focusChild: {
    width: 40,
    height: 40,
    margin: 80,
    borderRadius: 2,
    borderColor: '#ffffff'
  },
  focusTopLeft: {
    borderTopWidth: 6,
    borderLeftWidth: 6,
  },
  focusTopRight: {
    borderTopWidth: 6,
    borderRightWidth: 6,
  },
  focusBottomRight: {
    borderBottomWidth: 6,
    borderRightWidth: 6,
  },
  focusBottomLeft: {
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  }
});
  