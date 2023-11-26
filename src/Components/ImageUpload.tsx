import React, { ReactNode, useEffect, useState } from "react";
import { ColorValue, Image, Pressable, StyleSheet, View } from "react-native";
const includeExtra = true;
import {
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { Text, theme } from "./Theme";

interface Action {
  title: string;
  type: "capture" | "library";
  options: CameraOptions | ImageLibraryOptions;
}
const actions: Action[] = [
  {
    title: "Upload Gallery Images ",
    type: "library",
    options: {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
      includeExtra,
      maxHeight: 200,
      maxWidth: 200,
    },
  },
];
interface uploadProps {
  onSelect: (t: string) => void;
  icon: ReactNode;
  text: string;
  backgroundColor: ColorValue;
  height: number;
  borderRadius: number;
  img?: string;
}

const ImageUpload = ({
  onSelect,
  icon,
  text,
  backgroundColor,
  height,
  borderRadius,
  img,
}: uploadProps) => {
  const [response, setResponse] = useState<any>(null);
  const onButtonPress = React.useCallback((type: any, options: any) => {
    launchImageLibrary(options, setResponse);
  }, []);

  useEffect(() => {
    onSelect(response?.assets && response?.assets);
  }, [response]);

  return (
    <>
      {actions.map(({ title, type, options }) => {
        return (
          <Pressable
            key={title}
            onPress={() => {
              onButtonPress(type, options);
            }}
          >
            {img ? (
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: img }}
              />
            ) : response?.assets ? (
              response?.assets.map(({ uri }: { uri: string }) => (
                <View key={uri}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={styles.image}
                    source={{ uri: uri ? uri : img }}
                  />
                </View>
              ))
            ) : (
              <>
                <View
                  style={[
                    styles.camera,
                    {
                      height,
                      backgroundColor,
                      borderRadius,
                    },
                  ]}
                >
                  {icon}
                  <Text ms="s" variant="title12black_medium" color="white">
                    {text}
                  </Text>
                </View>
              </>
            )}
          </Pressable>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: "5%",
    paddingHorizontal: "3%",
  },
  image: {
    height: 86,
    width: 94,
    borderRadius: 10,
    marginRight: "5%",
  },
});

export default ImageUpload;
