import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

const { height, width } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.45 * height;
const OTPBtn = () => {
  const [code, setcode] = useState<number>();
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return (
    <>
      <TouchableOpacity
        style={styles.otpbtn}
        onPress={() => refRBSheet.current.open()}
      >
        <Text variant="title14black_semibold" color="primary800">
          Sign up
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
            color="grey800"
            textAlign="center"
          >
            OTP Verification{" "}
          </Text>
          <Text mt="s" mb="l" variant="title12black_medium" color="grey800">
            A One Time Password has been sent to 123 456 789. Please enter it
            below to verify your phone number:
          </Text>
          <SmoothPinCodeInput
            cellSpacing={width / 25}
            codeLength={6}
            cellSize={43}
            cellStyle={styles.otpinput}
            textStyle={styles.otptext}
            cellStyleFocused={{
              borderColor: theme.colors.grey400,
            }}
            value={code}
            onTextChange={(c: number) => {
              setcode(c);
            }}
          />
          <Pressable>
            <Text mt="l" variant="title12black_medium" color="grey800">
              Didn’t receive the OTP?
              <Text
                variant="title12black_medium"
                textDecorationLine="underline"
                color="grey800"
              >
                {" "}
                Resend
              </Text>
            </Text>
          </Pressable>
          <TouchableOpacity style={styles.reset}>
            <Text variant="title14black_semibold" color="primary800">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  forgot: { alignSelf: "flex-end", marginTop: "4%" },
  otpbtn: {
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
  otpinput: {
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  otptext: {
    fontSize: 14,
    color: theme.colors.grey800,
    fontFamily: "Metropolis-Medium",
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

export default OTPBtn;
