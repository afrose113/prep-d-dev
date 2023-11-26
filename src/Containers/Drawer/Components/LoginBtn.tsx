import { Text, theme } from "@/Components/Theme";
import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "@/Assets/Svg/Login.svg";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import TextInput from "@/Components/TextInput";
import SignupBtn from "./SignupBtn";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ILoginResult, useLogin } from "@/Hooks/useLogin";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setName,
  setRefreshToken,
  setRole,
  setUserId,
} from "@/Store/slices/local";
import { supabase } from "@/Lib/InitSupabase";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.4 * height;
const LoginSchema = Yup.object().shape({
  phonenumber: Yup.string()
    .required("Phone Number is required")
    // .matches(/^[0-9]+$/, "Invalid Mobile number: Only numbers are allowed")
    .length(13, "Invalid Mobile number"),
});

const LoginBtn = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const dispatch = useDispatch();
  const [data, setdata] = useState<ILoginResult>();
  const { mutate } = useLogin({
    onError(error) {
      Toast.show({
        type: "error",
        text1: error.errors[0],
      });
      setSubmitting(false);
    },
    onSuccess(data) {
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
      });
      setSubmitting(false);
      dispatch(setRole(data.user.role));
      dispatch(setName(data.user.full_name));
      dispatch(setAccessToken(data.access_token));
      dispatch(setRefreshToken(data.refresh_token));
      dispatch(setUserId(data.user.identities[0].user_id));
      setdata(data);
      refRBSheet.current.close();
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      phonenumber: "",
    },
    onSubmit: (value) => {
      mutate({ phone: value.phonenumber, otp: 123456 });
    },
  });

  return (
    <>
      <TouchableOpacity
        style={styles.line}
        onPress={() => refRBSheet.current.open()}
      >
        <Image source={require("@/Assets/gif/Logout.gif")} style={styles.gif} />
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
          <TextInput
            placeholder="Mobile Number"
            onChangeText={handleChange("phonenumber")}
            onBlur={handleBlur("phonenumber")}
          />
          {errors.phonenumber && touched.phonenumber && (
            <Text
              fontSize={12}
              ms="xs"
              variant="title12black_semibold"
              mt="xs"
              color="error"
            >
              {errors.phonenumber as string}
            </Text>
          )}
          <TouchableOpacity
            style={styles.login}
            disabled={isSubmitting}
            onPress={handleSubmit as () => void}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text variant="title16black_semibold" color="primary800">
                Send OTP
              </Text>
            )}
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
  gif: { width: 34, height: 34 },
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
