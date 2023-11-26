import Filter from "@/Components/Filter";
import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "@/Containers/Chefs/Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import Item from "./Components/Item";
import { trending } from "../Dishes/Dishes";
import { useAppSelector } from "@/Store";
import useDebounce from "@/Hooks/useDebounce";
import { ICuisineResult, useCommon } from "@/Hooks/useCommon";

const Cuisines = ({ navigation }: HomeNavigationProps<"Cuisines">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const [cuisine, setcuisine] = useState<ICuisineResult[]>();
  const [active, setactive] = useState<number>(1);
  const [searchText, setsearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { mutate } = useCommon({
    onSuccess(data) {
      setcuisine(data.cuisine);
    },
  });
  useEffect(() => {
    mutate({ user_id, type: "cuisine", search_val: debouncedSearchText });
  }, [debouncedSearchText, user_id]);
  const favorite_Cuisine = cuisine?.filter((item) => item.is_favorite);
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
        head="Cuisines"
        navigation={navigation}
        onSelect={(e) => setsearchText(e)}
      />
      {debouncedSearchText.length > 0 && cuisine?.length == 0 ? (
        <Text ms="m" mt="l" variant="title12black_semibold" color="primary">
          No cuisine found
        </Text>
      ) : (
        <FlatList
          renderItem={({ item }) => (
            <Item list={item} nav={navigation} is_fav={item.is_favorite} />
          )}
          keyExtractor={(item: any) => item.key}
          data={active == 1 ? cuisine : favorite_Cuisine}
          ListHeaderComponent={<HeaderComp />}
          ListHeaderComponentStyle={styles.list}
          showsVerticalScrollIndicator={false}
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

export default Cuisines;
