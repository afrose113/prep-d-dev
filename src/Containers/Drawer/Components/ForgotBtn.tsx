import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import React, { FC, MutableRefObject, ReactNode, useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.4 * height;
const ForgotBtn = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return (
    <>
      <Pressable
        style={styles.forgot}
        onPress={() => refRBSheet.current.open()}
      >
        <Text
          variant="title12black_medium"
          fontSize={10}
          color="grey800"
          textDecorationLine="underline"
        >
          Forgot Password?
        </Text>
      </Pressable>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={SLIDE_HEIGHT2}
        customStyles={{
          draggableIcon: {
            width: 0,
            height: 0,
          },
          container: styles.container,
        }}
      >
        <View>
          <Text
            variant="market24Regular"
            fontSize={28}
            lineHeight={32}
            color="grey800"
          >
            Reset Password
          </Text>
          <Text mt="s" variant="title12black_medium" color="grey800">
            Enter your email below and we will send you a password reset link
          </Text>
          <TextInput placeholder="Email or Phone Number" />
          <TouchableOpacity style={styles.reset}>
            <Text variant="title14black_semibold" color="primary800">
              Send Link
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  forgot: { alignSelf: "flex-end", marginTop: "4%" },
  container: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
  reset: {
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginTop: "10%",
  },
});

export default ForgotBtn;
