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
