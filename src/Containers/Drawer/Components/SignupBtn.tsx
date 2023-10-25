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
import OTPBtn from "./OTPBtn";
import Checkbox from "@/Components/Checkbox";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;

const SignupBtn = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return (
    <View>
      <Pressable
        style={styles.signup}
        onPress={() => refRBSheet.current.open()}
      >
        <Text variant="title12black_medium" color="grey800">
          Don’t have an account? Sign Up
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
            textAlign="center"
            color="grey800"
          >
            Sign Up
          </Text>
          <TextInput placeholder="Email or Phone Number" />
          <TextInput placeholder="Password" secureTextEntry />
          <Checkbox
            text="I agree to Terms and Conditions"
            size={15}
            fontSize={12}
          />
          <OTPBtn />
          <Pressable style={styles.signup}>
            <Text variant="title12black_medium" color="grey800">
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  signup: { alignSelf: "center", marginTop: "5%" },
  container: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
});

export default SignupBtn;
