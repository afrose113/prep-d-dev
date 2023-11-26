import InfluencerHeader from "@/Components/InfluencerHeader";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Camera from "@/Assets/Svg/camera.svg";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";

export type ProfileItem = {
  email: string;
  full_name: string;
  id: string;
  image: string | undefined;
  intagram_id: string | null;
  mobile_number: string | null;
  role: string;
  snapchat_id: string | null;
  total_orders: number;
  user_id: string;
  username: string;
};

const InfluencerProfile = ({
  navigation,
}: HomeNavigationProps<"InfluencerProfile">) => {
  const [profile, setprofile] = useState<ProfileItem[] | null>();
  const { name } = useAppSelector((state) => state.local);

  useEffect(() => {
    const getProfile = async () => {
      const { data: user_profile } = await supabase
        .from("user_profiles")
        .select("*");
      setprofile(user_profile);
    };
    getProfile();
  }, []);
  const img: string =
    profile && profile[0]?.image === undefined
      ? ""
      : profile && profile[0].image;
  return (
    <View style={styles.container}>
      <InfluencerHeader
        head="Hello"
        name={name}
        navigation={navigation}
        icon={false}
      />
      <Pressable style={styles.btn}>
        <Image source={{ uri: img }} style={styles.profile_pic} />
        <View style={styles.camera}>
          <Camera />
        </View>
      </Pressable>
      <View style={styles.inputs}>
        <View style={styles.input}>
          <Text variant="title12black_medium">
            {profile && profile[0]?.full_name}
          </Text>
        </View>
        <View style={styles.input}>
          <Text variant="title12black_medium">
            {profile && profile[0]?.username}
          </Text>
        </View>
        <View style={styles.input}>
          <Text variant="title12black_medium">
            {profile && profile[0]?.email}
          </Text>
        </View>
        <View style={styles.input}>
          <Text variant="title12black_medium">
            {profile && profile[0]?.mobile_number}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  input: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    height: 41,
    borderRadius: 30,
    color: theme.colors.black,
    paddingHorizontal: "5%",
    marginTop: "7%",
    justifyContent: "center",
  },
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
  inputs: { marginHorizontal: "7%" },
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
export default InfluencerProfile;
