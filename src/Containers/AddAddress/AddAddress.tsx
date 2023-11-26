import CartBtnHeader from "@/Components/CartBtnHeader";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import { supabase } from "@/Lib/InitSupabase";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import Geolocation from "@react-native-community/geolocation";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useAppSelector } from "@/Store";
import DropData from "@/Components/DropData";
import Toast from "react-native-toast-message";
import { AddressItem } from "@/@types/address";

const AddressSchema = Yup.object().shape({
  name: Yup.string().required("Your Name is required"),
  label: Yup.string(),
  street: Yup.string().required("Street Name is required"),
  floor: Yup.string().required("Floor is required"),
  note: Yup.string(),
});

const data = [
  { label: "Home", value: "1" },
  { label: "Office", value: "2" },
  { label: "Other", value: "3" },
];

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const AddAddress = ({
  navigation,
  route,
}: HomeNavigationProps<"AddAddress">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const params: any = route.params;
  const address: AddressItem = params?.item;
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const success = () => {
    Toast.show({
      type: "success",
      text1: "Address Uploaded",
    });
    setSubmitting(false);
    navigation.navigate("Addresses");
  };
  const uploadAddress = async (
    name: string | undefined,
    label: string | undefined,
    street: string | undefined,
    floor_unit: string | undefined,
    note: string | undefined
  ) => {
    if (!!address) {
      const { data, error } = await supabase
        .from("consumer_address")
        .update([
          {
            user_id,
            name,
            label,
            street,
            floor_unit,
            note,
            latitude: 32,
            longitude: 89,
          },
        ])
        .eq("id", address?.id)
        .select();
      data != null
        ? success()
        : Toast.show({
            type: "error",
            text1: error?.message,
          });
      setSubmitting(false);
    } else {
      const { data, error } = await supabase
        .from("consumer_address")
        .insert([
          {
            user_id,
            name,
            label,
            street,
            floor_unit,
            note,
            latitude: 32,
            longitude: 89,
          },
        ])
        .select();
      data != null
        ? success()
        : Toast.show({
            type: "error",
            text1: error?.message,
          });
      setSubmitting(false);
    }
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
    validationSchema: AddressSchema,
    initialValues: {
      name: address?.name ?? "",
      label: address?.label ?? "",
      street: address?.street ?? "",
      floor: address?.floor_unit ?? "",
      note: address?.note ?? "",
    },
    onSubmit: (value) => {
      uploadAddress(
        value.name,
        value.label,
        value.street,
        value.floor,
        value.note
      );
    },
  });

  useEffect(() => {
    const getLocation = async () => {
      // Check if permission is granted
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (permissionStatus === RESULTS.GRANTED) {
        // Get the current location
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log({ latitude });
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        // Request permission
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          getLocation();
        }
      }
    };

    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <CartBtnHeader head="Add Address" nav={navigation} />
      <View style={styles.inputs}>
        <TextInput
          placeholder="Name (Optional)"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          error={errors.name}
          touched={touched.name}
          value={values.name}
        />
        <DropData
          data={data}
          value={values.label}
          placeholder="Label (Optional)"
          onSelect={(e: any) => {
            setFieldValue("label", e.label);
          }}
        />

        <TextInput
          placeholder="Street"
          onChangeText={handleChange("street")}
          onBlur={handleBlur("street")}
          error={errors.street}
          touched={touched.street}
          value={values.street}
        />
        <TextInput
          placeholder="Floor/Unit #"
          onChangeText={handleChange("floor")}
          onBlur={handleBlur("floor")}
          error={errors.floor}
          touched={touched.floor}
          value={values.floor}
        />
        <TextInput
          placeholder="Note to rider (Optional)"
          multiline
          textAlignVertical="top"
          onChangeText={handleChange("note")}
          onBlur={handleBlur("note")}
          placeholderTextColor={theme.colors.grey500}
          style={styles.input}
          value={values.note}
        />
        <TouchableOpacity
          style={styles.savebtn}
          disabled={isSubmitting}
          onPress={handleSubmit as () => void}
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
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "15%",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    marginTop: "7%",
    height: 79,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
    paddingTop: "4%",
  },
});

export default AddAddress;
