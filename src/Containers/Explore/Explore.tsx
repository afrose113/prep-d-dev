import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ExploreItem from "./Components/ExploreItem";
import Filter from "@/Components/Filter";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import InfluencerHeader from "@/Components/InfluencerHeader";
import { supabase } from "@/Lib/InitSupabase";
import { Item } from "@/@types/item";

const trending = [
  {
    key: 1,
    text: "Trending Influencers",
  },
  {
    key: 2,
    text: "Trending Dishes",
  },
];
const Explore = ({ navigation }: HomeNavigationProps<"Explore">) => {
  const [activefilter, setactivefilter] = useState<number>(1);
  const [active, setactive] = useState<number>(1);
  const [influencer, setinfluencer] = useState<Item[] | null>();
  const [dishes, setdishes] = useState<Item[] | null>();
  const dataToDisplay: Item[] | undefined | null =
    active === 1 ? influencer : dishes;
  useEffect(() => {
    const getExplore = async () => {
      let { data: trending_influencer, error } = await supabase
        .from("trending_influencer")
        .select("*");
      let { data: trending_dishes, error: dish_error } = await supabase
        .from("trending_dishes")
        .select("*");
      setinfluencer(trending_influencer);
      setdishes(trending_dishes);
    };
    getExplore();
  }, []);
  const HeaderComp = () => (
    <View style={styles.line}>
      <ScrollView
        horizontal
        style={styles.filter}
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((item) => {
          console.log(item.key);
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
      <InfluencerHeader head="Explore" navigation={navigation} icon />
      <FlatList
        data={dataToDisplay}
        key={"_"}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={<HeaderComp />}
        ListHeaderComponentStyle={styles.list}
        renderItem={({ item, index }) => (
          <ExploreItem
            item={item}
            active2={active}
            nav={navigation}
            index={index}
            length={dataToDisplay?.length}
          />
        )}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.primary800, flex: 1 },
  list: { marginBottom: "2%" },
  column: {
    alignItems: "center",
    justifyContent: "center",
  },
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
});

export default Explore;
