import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import axios from "axios";
interface Imagess {
  name: string;
  type: string;
}
export default function TabOneScreen() {
  const [image, setImage] = useState<string>("");
  const [permission, grantPermission] = ImagePicker.useCameraPermissions();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const captureImage = async () => {
    if (!permission) {
      grantPermission();
    } else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };
  const recognizeImage = async () => {
    if (image) {
      const data = new FormData();
      // @ts-ignore
      data.append("image", {
        name: "image",
        type: "image",
        uri: image,
      });

      fetch(`https://imaaager.onrender.com/api/upload`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose image from gallery" onPress={pickImage} />
      <Button title="Capture image" onPress={captureImage} />
      {image && (
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
      <Button title="scan photo " onPress={recognizeImage} />
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
