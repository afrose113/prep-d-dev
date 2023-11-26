import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../../Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import TopItem from "@/Components/TopItem";
import ImageScroll from "./Components/ImageScroll";
import Banner from "./Components/Banner";
import { useAppSelector } from "@/Store";
import {
  ICuisineResult,
  IDishResult,
  IInfluenceResult,
  useCommon,
} from "@/Hooks/useCommon";

const Home = ({ navigation }: HomeNavigationProps<"Home">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const [dish, setDish] = useState<IDishResult[]>();
  const [influencer, setinfluencer] = useState<IInfluenceResult[]>();
  const [cuisine, setcuisine] = useState<ICuisineResult[]>();
  const { mutate } = useCommon({
    onSuccess(data) {
      setinfluencer(data.influencer);
      setDish(data.dish);
      setcuisine(data.cuisine);
    },
  });
  useEffect(() => {
    mutate({ user_id, type: "common", trending: true });
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <ImageScroll />
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Top Chefs
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
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {influencer?.map((item, index) => {
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
        </View>
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Top Dishes
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
        <View>
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
        </View>
        <View style={styles.title}>
          <Text variant="market24Bold" color="primary">
            Top Cuisines
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
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary800,
    overflow: "hidden",
  },
  scroll: { marginBottom: "30%" },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "3%",
    marginTop: "10%",
  },
});
export default Home;
