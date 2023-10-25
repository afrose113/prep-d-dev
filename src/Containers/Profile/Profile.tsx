import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Camera from "@/Assets/Svg/camera.svg";
import CartBtnHeader from "@/Components/CartBtnHeader";
import TextInput from "@/Components/TextInput";

const Profile = ({ navigation }: HomeNavigationProps<"Profile">) => {
  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head="Profile" />
      <View>
        <Pressable style={styles.btn}>
          <Image
            source={require("@/Assets/Images/chef.png")}
            style={styles.profile_pic}
          />
          <View style={styles.camera}>
            <Camera />
          </View>
        </Pressable>
        <View style={styles.inputs}>
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Mobile Number" />
        </View>
        <TouchableOpacity style={styles.savebtn}>
          <Text variant="title16black_semibold" color="white">
            Save
          </Text>
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
