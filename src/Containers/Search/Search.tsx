import CartBtnHeader from "@/Components/CartBtnHeader";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import {
  ICuisineResult,
  IDishResult,
  IInfluenceResult,
  useCommon,
} from "@/Hooks/useCommon";
import useDebounce from "@/Hooks/useDebounce";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import { useAppSelector } from "@/Store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const Search = ({ navigation }: HomeNavigationProps<"Search">) => {
  const [searchText, setSearchText] = useState("");
  const { user_id } = useAppSelector((state) => state.local);
  const debouncedSearchText = useDebounce(searchText, 500);
  const [chef, setchef] = useState<IInfluenceResult[]>();
  const [dish, setdish] = useState<IDishResult[]>();
  const [cuisine, setcuisine] = useState<ICuisineResult[]>();
  const { mutate } = useCommon({
    onSuccess(data) {
      setchef(data.influencer);
      setdish(data.dish);
      setcuisine(data.cuisine);
    },
  });
  useEffect(() => {
    mutate({ user_id, search_val: debouncedSearchText, type: "common" });
  }, [debouncedSearchText, user_id]);

  return (
    <View style={styles.container}>
      <CartBtnHeader head="Search" nav={navigation} />
      <View style={styles.view}>
        <TextInput
          placeholder="Search for chefs, dishes, or cuisines"
          autoFocus
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.pad}>
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
                    text={item.name}
                    me={20}
                    key={item.id}
                    index={index}
                    img={item.image}
                    dish_id={item.id}
                    chef={item.influencer_name}
                    is_fav={item.is_favorite}
                    deserttype={item.category}
                    onPress={() => navigation.navigate("Dish", { item } as any)}
                  />
                );
              })}
            </ScrollView>
          </>
        )}
        {chef && chef?.length > 0 && (
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
              {chef?.map((item, index) => {
                return (
                  <TopItem
                    me={20}
                    text={item.full_name}
                    key={item.id}
                    img={item.image}
                    index={index}
                    is_fav={item.is_favorite}
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cuisine?.map((item, index) => {
                return (
                  <TopItem
                    me={20}
                    text={item.type}
                    index={index}
                    key={item.id}
                    img={item.image}
                    is_fav={item.is_favorite}
                    cuisine_type={item.type}
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary800,
  },
  view: { marginHorizontal: "5%" },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
    marginTop: "10%",
    marginHorizontal: "5%",
  },
  pad: { marginBottom: "10%" },
});

export default Search;
