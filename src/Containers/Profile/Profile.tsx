import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Camera from "@/Assets/Svg/camera.svg";
import CartBtnHeader from "@/Components/CartBtnHeader";
import TextInput from "@/Components/TextInput";
import { supabase } from "@/Lib/InitSupabase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProfileItem } from "../InfluencerProfile/InfluencerProfile";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@/Store";

const ProfileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Invalid Mobile number: Only numbers are allowed"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  name: Yup.string().required("Name is Required"),
});

const Profile = ({ navigation }: HomeNavigationProps<"Profile">) => {
  const [profile, setprofile] = useState<ProfileItem>();
  const { user_id } = useAppSelector((state) => state.local);
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase.from("user_profiles").select("*");
      setprofile(data && data[0]);
    };
    getProfile();
  }, []);
  const success = () => {
    Toast.show({
      type: "success",
      text1: "Profile Updated",
    });
    setSubmitting(false);
  };
  const updateProfile = async (
    full_name: string | undefined,
    email: string | undefined,
    mobile_number: string | undefined
  ) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .update([
        {
          full_name,
          email,
          mobile_number,
          image: profile?.image,
        },
      ])
      .eq("user_id", user_id)
      .select("*");
    data != null
      ? success()
      : Toast.show({
          type: "error",
          text1: error?.message,
        });
    console.log({ data });
    setSubmitting(false);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    values,
  } = useFormik({
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    initialValues: {
      name: profile?.full_name,
      email: profile?.email ?? "",
      mobile: profile?.mobile_number ?? "",
    },
    onSubmit: (value) => {
      updateProfile(value.name, value.email, value.mobile);
    },
  });
  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head="Profile" />
      <View>
        <Pressable style={styles.btn}>
          <Image source={{ uri: profile?.image }} style={styles.profile_pic} />
          <View style={styles.camera}>
            <Camera />
          </View>
        </Pressable>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            error={errors.name}
            touched={touched.name}
          />
          <TextInput
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
          />
          <TextInput
            placeholder="Mobile Number"
            value={values.mobile}
            onChangeText={handleChange("mobile")}
            onBlur={handleBlur("mobile")}
            error={errors.mobile}
            touched={touched.mobile}
          />
        </View>
        <TouchableOpacity
          style={styles.savebtn}
          onPress={handleSubmit as () => void}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text variant="title16black_semibold" color="white">
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  inputs: { marginHorizontal: "7%" },
  head: {
    backgroundColor: theme.colors.primary,
    paddingBottom: "5%",
    paddingHorizontal: "7%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "15%",
    marginHorizontal: "7%",
  },
  line: { flexDirection: "row", alignItems: "center" },
  profile_pic: {
    height: 105,
    width: 105,
    borderRadius: 52.5,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 120,
    width: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  camera: {
    backgroundColor: theme.colors.primary800,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "5%",
    right: "2%",
  },
});

export default Profile;
