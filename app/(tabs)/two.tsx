import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function TabTwoScreen() {
  const [type, setType] = useState(CameraType.back);
  const [status, requestPermission] = Camera.useCameraPermissions();
  if (!status || !status.granted) {
    return (
      <View>
        <Text>Give camera permission</Text>
        <Button title="enable camera" onPress={requestPermission} />
      </View>
    );
  }
  const handleFlipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };
  return (
    <View style={styles.container}>
      <Camera style={{ flex: 1, width: "100%" }} type={type}>
        <Button title="FLIP CAMERA" onPress={handleFlipCamera} />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
