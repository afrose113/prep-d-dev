import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Bell from "@/Assets/Svg/Notification 2.svg";

const list = [
  { key: 1, noti: "Someone gave a 5 star rating to your dish." },
  { key: 2, noti: "Your recipe has been reviewed and approved." },
  { key: 3, noti: "Your recipe has been reviewed and approved." },
];

const Notifications = ({
  navigation,
}: HomeNavigationProps<"Notifications">) => {
  return (
    <View style={styles.container}>
      <InfluencerHeader head="Notifications" navigation={navigation} icon />
      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((item) => {
          return (
            <View style={styles.list} key={item.key}>
              <View style={styles.circle}>
                <Bell />
              </View>
              <Text
                me="xl"
                ms="m"
                numberOfLines={2}
                variant="title14black_medium"
                color="grey800"
              >
                {item.noti}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.grey200,
    paddingVertical: "5%",
    alignItems: "center",
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Notifications;
