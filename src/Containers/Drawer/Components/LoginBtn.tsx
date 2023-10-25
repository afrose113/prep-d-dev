import { Text, theme } from "@/Components/Theme";
import React, { FC, MutableRefObject, ReactNode, useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Logout from "@/Assets/Svg/Logout.svg";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import TextInput from "@/Components/TextInput";
import ForgotBtn from "./ForgotBtn";
import SignupBtn from "./SignupBtn";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;
const LoginBtn = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return (
    <>
      <TouchableOpacity
        style={styles.line}
        onPress={() => refRBSheet.current.open()}
      >
        <Logout />
        <Text ms="s" color="grey800" variant="title12black_medium">
          Login
        </Text>
      </TouchableOpacity>
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
            Log In
          </Text>
          <TextInput placeholder="Email or Phone Number" />
          <TextInput placeholder="Password" secureTextEntry />
          <ForgotBtn />
          <TouchableOpacity style={styles.login}>
            <Text variant="title14black_semibold" color="primary800">
              Log In
            </Text>
          </TouchableOpacity>
          <SignupBtn />
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "5%",
    paddingHorizontal: "7%",
  },
  login: {
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginTop: "10%",
  },
  container: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
});
export default LoginBtn;
