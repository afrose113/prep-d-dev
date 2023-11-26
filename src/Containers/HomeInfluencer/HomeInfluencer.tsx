import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import TopItem from "@/Components/TopItem";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Upload from "@/Assets/Svg/upload.svg";
import ItemGrid from "./Components/ItemGrid";
import { supabase } from "@/Lib/InitSupabase";
import { Influencer } from "@/@types/influencer";
import { BestSellers } from "@/@types/bestSellers";
import { useAppSelector } from "@/Store";
import { Dropdown } from "react-native-element-dropdown";
import ExploreItem from "../Explore/Components/ExploreItem";

const data = [
  { label: "Last 7 Days", value: "1" },
  { label: "Last 1 Month", value: "2" },
  { label: "Last 3 Months", value: "3" },
];

const HomeInfluencer = ({
  navigation,
}: HomeNavigationProps<"HomeInfluencer">) => {
  const [pending, setpending] = useState<number>();
  const [pendingdishes, setpendingdishes] = useState<any>();
  const [saved, setsaved] = useState<number>();
  const [influencerDetails, setinfluencerdetails] = useState<
    Influencer[] | null
  >();
  const [best, setbest] = useState<BestSellers[] | null>();
  const [value, setValue] = useState<string>("1");

  const x = value == "1" ? 7 : value == "2" ? 30 : 180;
  useEffect(() => {
    const getPendingApprovals = async () => {
      let { data: pending_app } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("is_draft", false)
        .eq("approval_cloud", false);
      let { data: saved_draft } = await supabase
        .from("influencer_dishes")
        .select("*")
        .eq("is_draft", true);
      let { data: influencer_stats } = await supabase
        .from("influencer_stats")
        .select("*")
        .gte(
          "created_at",
          new Date(Date.now() - x * 24 * 60 * 60 * 1000).toISOString()
        );
      let { data: influencer_dish } = await supabase
        .from("influencer_dishes")
        .select("*")
        .gte("total_orders", "1");
      setbest(influencer_dish);
      setpendingdishes(pending_app);
      setpending(pending_app?.length);
      setsaved(saved_draft?.length);
      setinfluencerdetails(influencer_stats);
    };
    getPendingApprovals();
  }, [x]);
  const totalAmount = influencerDetails?.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const nonNullRatingCount = influencerDetails?.filter(
    (item) => item.rating !== null
  ).length;

  console.log({ influencerDetails });

  const list3 = [
    {
      key: 1,
      item: "Total Orders",
      res: influencerDetails?.length,
      data: [
        { value: 50 },
        { value: 80 },
        { value: 90 },
        { value: 70 },
        { value: 50 },
        { value: 80 },
        { value: 90 },
        { value: 70 },
      ],
    },
    {
      key: 2,
      item: "Ratings Received",
      res: nonNullRatingCount,
    },
    {
      key: 3,
      item: "Profile Visits",
      res: "26",
      data: [
        { value: 50 },
        { value: 80 },
        { value: 90 },
        { value: 70 },
        { value: 50 },
        { value: 90 },
        { value: 70 },
        { value: 50 },
      ],
    },
    {
      key: 4,
      item: "Total Earnings",
      res: "SAR " + totalAmount,
      data: [
        { value: 70 },
        { value: 50 },
        { value: 90 },
        { value: 70 },
        { value: 50 },
        { value: 50 },
        { value: 80 },
        { value: 90 },
      ],
    },
  ];

  const Bestsellers = () => (
    <>
      <Text
        variant="title16black_bold"
        fontSize={20}
        lineHeight={24}
        ms="l"
        marginVertical="m"
        color="primary"
      >
        Best Sellers
      </Text>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {best?.map((item) => {
            return (
              <TopItem
                ml={20}
                text={item.name}
                key={item.id}
                img={item.image}
                heart
                orders={item.total_orders}
                onPress={() =>
                  navigation.navigate("DishDescription", { item } as any)
                }
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.title}>
        <Text
          variant="title16black_bold"
          fontSize={20}
          lineHeight={24}
          color="primary"
        >
          My Uploads
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("UploadRecipe")}
        >
          <Upload />
          <Text ms="s" variant="title12black_medium" color="white">
            Upload Recipe
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.uploads}>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("PendingApprovals")}
        >
          <Text variant="title12black_medium" color="grey800">
            Pending Approvals
          </Text>
          <Text
            variant="title16black_semibold"
            fontSize={20}
            lineHeight={24}
            color="grey800"
          >
            {pending != null ? pending : 0}
          </Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("SavedDrafts")}
        >
          <Text variant="title12black_medium" color="grey800">
            Saved Drafts
          </Text>
          <Text
            variant="title16black_semibold"
            fontSize={20}
            lineHeight={24}
            color="grey800"
          >
            {saved != null ? saved : 0}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={pendingdishes}
        key={"_"}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.column}
        ListHeaderComponentStyle={styles.list}
        renderItem={({ item, index }) => (
          <ExploreItem
            homeFlag
            item={item}
            index={index}
            length={pendingdishes?.length}
            nav={navigation}
          />
        )}
        keyExtractor={(item: any) => item.id}
      />
    </>
  );
  const { name } = useAppSelector((state) => state.local);

  return (
    <View style={styles.container}>
      <InfluencerHeader
        head="Hello"
        name={name}
        navigation={navigation}
        icon={false}
      />
      <FlatList
        numColumns={2}
        data={list3}
        ListHeaderComponent={
          <View style={styles.line}>
            <Text
              variant="title16black_bold"
              fontSize={20}
              lineHeight={24}
              marginVertical="m"
              color="primary"
            >
              My Stats
            </Text>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              itemTextStyle={styles.itemTextStyle}
              data={data}
              maxHeight={300}
              minHeight={100}
              fontFamily={"Metropolis-Medium"}
              placeholder="Select Days"
              labelField="label"
              valueField="value"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
        }
        columnWrapperStyle={styles.list2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={Bestsellers}
        keyExtractor={(item: any) => item.key}
        renderItem={({ item }) => <ItemGrid list={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary800 },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "5%",
    marginBottom: "3%",
    marginTop: "10%",
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "7%",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    height: 28,
    backgroundColor: theme.colors.orange,
    borderRadius: 43,
    paddingHorizontal: "3%",
  },
  uploads: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "3%",
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    height: 60,
    paddingHorizontal: "6%",
    width: "40%",
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  dropdown: {
    backgroundColor: theme.colors.primary800,
    width: 100,
  },
  list: { marginBottom: 100, marginTop: "5%" },
  list2: { justifyContent: "center" },
  selectedTextStyle: {
    fontSize: 12,
    color: theme.colors.grey800,
  },
  itemTextStyle: { fontSize: 10, color: theme.colors.grey800 },
  itemContainerStyle: { backgroundColor: theme.colors.primary800 },
});

export default HomeInfluencer;
