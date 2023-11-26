import { Text, theme } from "@/Components/Theme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "./Components/Header";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import Filter from "@/Components/Filter";
import ChefsItem from "./Components/ChefsItem";
import { supabase } from "@/Lib/InitSupabase";
import { useAppSelector } from "@/Store";
import useDebounce from "@/Hooks/useDebounce";
import { IInfluenceResult, useCommon } from "@/Hooks/useCommon";

const trending = [
  {
    key: 1,
    text: "All",
  },
  {
    key: 2,
    text: "My Favorites",
  },
];
type Profile = {
  email: string;
  full_name: string;
  id: string;
  image: string;
  role: string;
  total_orders: number;
  user_id: string;
  username: string;
};
const Chefs = ({ navigation }: HomeNavigationProps<"Chefs">) => {
  const { user_id } = useAppSelector((state) => state.local);
  const [active, setactive] = useState<number>(1);
  const [profile, setprofile] = useState<Profile[] | null>();
  const [influencer, setinfluencer] = useState<IInfluenceResult[]>();
  const [searchText, setsearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { mutate: influence_mutate } = useCommon({
    onSuccess(data) {
      setinfluencer(data.influencer);
    },
  });
  useEffect(() => {
    influence_mutate({
      user_id,
      type: "influencer",
      search_val: debouncedSearchText,
    });
  }, [debouncedSearchText, user_id]);
  const favorite_InFluencer = influencer?.filter((item) => item.is_favorite);

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

  useEffect(() => {
    const getPendingApprovals = async () => {
      let { data: user_profiles, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("role", "influencer");
      setprofile(user_profiles);
    };
    getPendingApprovals();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        head="Chefs"
        navigation={navigation}
        onSelect={(e) => setsearchText(e)}
      />
      {debouncedSearchText.length > 0 && influencer?.length == 0 ? (
        <Text ms="m" mt="l" variant="title12black_semibold" color="primary">
          No chefs found
        </Text>
      ) : (
        <FlatList
          data={active == 1 ? influencer : favorite_InFluencer}
          key={"_"}
          numColumns={2}
          style={styles.list}
          columnWrapperStyle={styles.column}
          ListHeaderComponent={<HeaderComp />}
          ListHeaderComponentStyle={styles.list}
          renderItem={({ item, index }) => (
            <ChefsItem
              text={item.full_name}
              img={item.image}
              nav={navigation}
              is_fav={item.is_favorite}
              id={item.user_id}
              index={index}
              length={influencer?.length}
              onPress={() =>
                navigation.navigate("ChefProfile", { item } as any)
              }
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  list: { marginBottom: "2%" },
  column: {
    justifyContent: "center",
    alignItems: "center",
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

export default Chefs;
