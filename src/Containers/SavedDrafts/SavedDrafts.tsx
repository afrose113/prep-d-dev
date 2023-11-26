import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { supabase } from "@/Lib/InitSupabase";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const SavedDrafts = ({ navigation }: HomeNavigationProps<"SavedDrafts">) => {
  const [saved, setsaved] = useState<any[] | null>();
  useEffect(() => {
    const getSavedDrafts = async () => {
      let { data: saved_draft } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("is_draft", true);
      setsaved(saved_draft);
    };
    getSavedDrafts();
  }, []);
  return (
    <View style={styles.container}>
      <InfluencerHeader head="Saved Drafts" navigation={navigation} icon />
      <ScrollView showsVerticalScrollIndicator={false}>
        {saved?.map((item) => {
          return (
            <View key={item.id} style={styles.list}>
              <View>
                <Text
                  textTransform="capitalize"
                  variant="title16black_medium"
                  color="grey800"
                >
                  {item.name}
                </Text>
                <Text mt="s" variant="title12black_medium" color="grey500">
                  Last Saved:
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("UploadRecipe", {
                    item,
                    flagUpdate: true,
                  } as any)
                }
              >
                <Text variant="title12black_semibold" color="white">
                  Resume Draft
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

export default SavedDrafts;
