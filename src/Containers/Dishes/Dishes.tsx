import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "./Components/Header";
import Filter from "@/Components/Filter";
import DishesItem from "./Components/DishesItem";
import { useAppSelector } from "@/Store";
import useDebounce from "@/Hooks/useDebounce";
import { ICuisineResult, IDishResult, useCommon } from "@/Hooks/useCommon";

export const trending = [
  {
    key: 1,
    text: "All",
  },
  {
    key: 2,
    text: "My Favorites",
  },
];
const Dishes = ({ navigation, route }: HomeNavigationProps<"Dishes">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const params: any = route.params;
  const cuisine_item: ICuisineResult = params?.list;
  const [active, setactive] = useState<number>(1);
  const [searchText, setsearchText] = useState("");
  const [data, setData] = useState<IDishResult[]>();
  const debouncedSearchText = useDebounce(searchText, 500);

  const { mutate } = useCommon({
    onSuccess(data) {
      setData(data.dish);
    },
  });
  useEffect(() => {
    if (!!cuisine_item)
      mutate({
        user_id,
        search_val: debouncedSearchText,
        type: "dish",
        cuisine_type: cuisine_item.type,
      });
    else
      mutate({
        user_id,
        search_val: debouncedSearchText,
        type: "dish",
      });
  }, [debouncedSearchText, user_id, cuisine_item]);
  const favoriteDish = data?.filter((item) => item.is_favorite);
  const HeaderComp = () => (
    <View style={styles.line}>
      <ScrollView
        horizontal
        style={styles.filter}
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((item) => {
          return (
            <Pressable
              key={item.key}
              onPress={() => {
                setactive(item.key);
              }}
              style={[
                styles.filterBtn,
                {
                  backgroundColor:
                    active == item.key
                      ? theme.colors.orange
                      : theme.colors.primary800,
                  borderWidth: active == item.key ? 0 : 1,
                  borderColor: active != item.key ? "#D8D8D8" : "#FFFFFF",
                },
              ]}
            >
              <Text
                color={active == item.key ? "white" : "grey800"}
                variant="title14black_medium"
              >
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Filter />
    </View>
  );
  return (
    <View style={styles.container}>
      <Header
        head={cuisine_item?.type ?? "Dishes"}
        navigation={navigation}
        onSelect={(e) => setsearchText(e)}
      />
      {debouncedSearchText.length > 0 && data?.length == 0 ? (
        <Text ms="m" mt="l" variant="title12black_semibold" color="primary">
          No dishes found
        </Text>
      ) : (
        <FlatList
          data={active == 1 ? data : favoriteDish}
          renderItem={({ item }) => (
            <DishesItem
              list={item}
              nav={navigation}
              is_fav={item.is_favorite}
            />
          )}
          keyExtractor={(item: any) => item.key}
          ListHeaderComponent={<HeaderComp />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponentStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  filter: {
    marginVertical: "5%",
  },
  filterBtn: {
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginRight: 10,
  },
  line: { flexDirection: "row", marginHorizontal: "5%", alignItems: "center" },
  list: { marginBottom: "2%" },
});

export default Dishes;
