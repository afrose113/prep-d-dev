import Header from "@/Components/Header";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import {
  ICuisineResult,
  IDishResult,
  IInfluenceResult,
  useCommon,
} from "@/Hooks/useCommon";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import { useAppSelector } from "@/Store";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const Favorites = ({ navigation }: HomeNavigationProps<"Favorites">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const [dish, setDish] = useState<IDishResult[]>();
  const [influencer, setinfluencer] = useState<IInfluenceResult[]>();
  const [cuisine, setcuisine] = useState<ICuisineResult[]>();
  const focus = useIsFocused();

  const { mutate } = useCommon({
    onSuccess(data) {
      setinfluencer(data.influencer);
      setDish(data.dish);
      setcuisine(data.cuisine);
    },
  });
  useEffect(() => {
    if (focus) {
      mutate({ user_id, type: "common", is_favorite: true });
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {influencer && influencer?.length > 0 && (
          <>
            <View style={styles.title}>
              <Text variant="market24Bold" color="primary">
                Chefs
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Chefs")}>
                <Text
                  textDecorationLine="underline"
                  variant="title12black_medium"
                  color="orange"
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {influencer?.map((item, index: number) => {
                return (
                  <TopItem
                    me={20}
                    text={item.full_name}
                    key={item.id}
                    img={item.image}
                    is_fav={item.is_favorite}
                    index={index}
                    chef_id={item.user_id}
                    onPress={() =>
                      navigation.navigate("ChefProfile", { item } as any)
                    }
                  />
                );
              })}
            </ScrollView>
          </>
        )}
        {dish && dish.length > 0 && (
          <>
            <View style={styles.title}>
              <Text variant="market24Bold" color="primary">
                Dishes
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Dishes")}>
                <Text
                  textDecorationLine="underline"
                  variant="title12black_medium"
                  color="orange"
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dish?.map((item, index) => {
                return (
                  <TopItem
                    me={20}
                    text={item.name}
                    key={item.id}
                    img={item.image}
                    dish_id={item.id}
                    index={index}
                    deserttype={item.category}
                    is_fav={item.is_favorite}
                    onPress={() => navigation.navigate("Dish", { item } as any)}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
        {cuisine && cuisine.length > 0 && (
          <>
            <View style={styles.title}>
              <Text variant="market24Bold" color="primary">
                Cuisines
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cuisines")}>
                <Text
                  textDecorationLine="underline"
                  variant="title12black_medium"
                  color="orange"
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.scroll}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {cuisine?.map((item, index) => {
                return (
                  <TopItem
                    me={20}
                    text={item.type}
                    cuisine_type={item.type}
                    key={item.id}
                    index={index}
                    img={item.image}
                    is_fav={item.is_favorite}
                    onPress={() =>
                      navigation.navigate("Dishes", { list: item } as any)
                    }
                  />
                );
              })}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.primary800, flex: 1 },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "3%",
    marginTop: "10%",
  },
  scroll: { marginBottom: "30%" },
});

export default Favorites;
