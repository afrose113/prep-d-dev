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
import OTPBtn from "./OTPBtn";
import Checkbox from "@/Components/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSignup } from "@/Hooks/useSignup";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setEmail,
  setName,
  setRole,
  setUserId,
  setUsername,
} from "@/Store/slices/local";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useSignupOtp } from "@/Hooks/useSignupOtp";

const { height, width } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.6 * height;
export const SLIDE_HEIGHT = 0.45 * height;

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phonenumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Invalid Mobile number: Only numbers are allowed")
    .length(10, "Invalid Mobile number"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  checkboxField: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const SignupBtn = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const refRBSheet2 = useRef<any>();

  const dispatch = useDispatch();
  const [code, setcode] = useState<number>();
  const { mutate, isLoading } = useSignup({
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
        text1: data.message,
      });
      setSubmitting(false);
      refRBSheet2.current.open();
    },
  });

  const { mutate: signupOtp, isLoading: signupLoad } = useSignupOtp({
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
        text1: "Sign Up successful",
      });
      setSubmitting(false);
      dispatch(setRole(data.user.role));
      dispatch(setName(data.user.full_name));
      dispatch(setAccessToken(data.access_token));
      dispatch(setUserId(data.user.identities[0].user_id));
      refRBSheet2.current.close();
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
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      phonenumber: "",
      name: "",
      email: "",
      checkboxField: false,
    },
    onSubmit: (value) => {
      mutate({ phone: value.phonenumber });
      dispatch(setEmail(value.email));
      dispatch(setUsername(value.name));
    },
  });
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
          <TextInput
            placeholder="Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
            touched={touched.name}
          />
          <TextInput
            placeholder="Mobile Number"
            onChangeText={handleChange("phonenumber")}
            onBlur={handleBlur("phonenumber")}
            error={errors.phonenumber}
            touched={touched.phonenumber}
          />
          <TextInput
            placeholder="Email Address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
          />
          <Checkbox
            text="I agree to Terms and Conditions"
            size={15}
            fontSize={12}
            isChecked={values.checkboxField}
            onPress={(isChecked) => setFieldValue("checkboxField", isChecked)}
          />
          {touched.checkboxField && errors.checkboxField && (
            <Text mt="l" variant="title12black_medium" color="error">
              {errors.checkboxField}
            </Text>
          )}
          {/* <OTPBtn /> */}
          <TouchableOpacity
            style={styles.reset}
            onPress={handleSubmit as () => void}
          >
            <Text variant="title16black_semibold" color="primary800">
              Sign up
            </Text>
          </TouchableOpacity>
          <Pressable style={styles.signup}>
            <Text variant="title12black_medium" color="grey800">
              Already have an account? Login
            </Text>
          </Pressable>
          <RBSheet
            ref={refRBSheet2}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={SLIDE_HEIGHT}
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
                A One Time Password has been sent to {values.phonenumber}.
                Please enter it below to verify your phone number:
              </Text>
              <SmoothPinCodeInput
                cellSpacing={width / 25}
                codeLength={6}
                cellSize={43}
                cellStyle={styles.otpinput}
                textStyle={styles.otptext}
                cellStyleFocused={{
                  borderColor: theme.colors.primary,
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
              <TouchableOpacity
                style={styles.reset}
                onPress={() =>
                  signupOtp({
                    otp: Number(code),
                    phone: values.phonenumber,
                    user: { full_name: values.name, email: values.email },
                  })
                }
              >
                <Text variant="title14black_semibold" color="primary800">
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
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
  reset: {
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginTop: "10%",
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
});

export default SignupBtn;
