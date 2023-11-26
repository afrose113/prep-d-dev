import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { supabase } from "@/Lib/InitSupabase";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Pending = {
  approval_admin: boolean;
  approval_cloud: boolean;
  cuisine_type: string;
  description: string;
  id: string;
  ingredients: [[Object], [Object]];
  is_draft: boolean;
  method: string | null;
  name: string;
  pdf: string | null;
  photo: string | null;
  preparation_link: string | null;
  price: string | null;
  total_orders: string | null;
  user_id: string;
};

const PendingApprovals = ({
  navigation,
}: HomeNavigationProps<"PendingApprovals">) => {
  const [pending, setpending] = useState<Pending[] | null>();
  useEffect(() => {
    const getPendingApprovals = async () => {
      let { data: pending_app } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("is_draft", false)
        .eq("approval_cloud", false);
      setpending(pending_app);
    };
    getPendingApprovals();
  }, []);

  return (
    <View style={styles.container}>
      <InfluencerHeader head="Pending Approvals" navigation={navigation} icon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="title12black_medium" color="grey800" ms="l" mt="l">
          Please note, approvals take 24-48 hours
        </Text>
        {pending?.map((item) => {
          return (
            <View key={item.id} style={styles.list}>
              <View>
                <Text variant="title16black_medium" color="grey800">
                  {item.name}
                </Text>
                <Text mt="s" variant="title12black_medium" color="grey500">
                  Status: {!item.approval_admin ? "Pending" : "Approval"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("DishDescription", { item } as any)
                }
              >
                <Text variant="title12black_semibold" color="white">
                  View Details
                </Text>
              </TouchableOpacity>
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
  },
  btn: {
    backgroundColor: theme.colors.orange,
    height: 30,
    borderRadius: 38,
    paddingHorizontal: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PendingApprovals;
