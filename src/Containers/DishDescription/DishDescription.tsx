import InfluencerHeader from "@/Components/InfluencerHeader";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Fire from "@/Assets/Svg/fire.svg";
import { BestSellers } from "@/@types/bestSellers";

const DishDescription = ({
  navigation,
  route,
}: HomeNavigationProps<"DishDescription">) => {
  const params: any = route.params;
  const item: BestSellers = params?.item;
  return (
    <View style={styles.container}>
      <InfluencerHeader head={item?.name} navigation={navigation} icon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <View style={styles.list2}>
            <Fire />
            <Text ms="s" variant="title12black_medium" color="grey800">
              {item.total_orders} Order
              {item.total_orders && item.total_orders > 1 && "s"}
            </Text>
          </View>
          <Text variant="title12black_medium" color="grey500">
            Uploaded on 12 Jan 2022
          </Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.img} />
        <Text mt="m" ms="l" variant="title12black_semibold" color="primary">
          Description
        </Text>
        <Text
          marginHorizontal="l"
          mt="xs"
          variant="title12black_medium"
          color="grey800"
        >
          {item.description}
        </Text>
        <Text mt="l" ms="l" variant="title12black_semibold" color="primary">
          Cuisine
        </Text>
        <Text
          mt="xs"
          marginHorizontal="l"
          textTransform="capitalize"
          variant="title12black_medium"
          color="grey800"
        >
          {item.cuisine_type}
        </Text>
        <Text mt="l" ms="l" variant="title12black_semibold" color="primary">
          Uploaded File
        </Text>
        <Text
          mt="xs"
          marginHorizontal="l"
          variant="title12black_medium"
          color="grey800"
        ></Text>
        {item.preparation_link != undefined && (
          <>
            <Text mt="l" ms="l" variant="title12black_semibold" color="primary">
              Preparation Link
            </Text>
            <Text
              mt="xs"
              marginHorizontal="l"
              variant="title12black_medium"
              color="grey800"
            >
              {item.preparation_link}
            </Text>
          </>
        )}
        <Text
          mt="l"
          ms="l"
          mb="s"
          variant="title12black_semibold"
          color="primary"
        >
          Ingredients
        </Text>
        {item.ingredients.map((item, index: number) => {
          return (
            <Text
              key={index}
              marginHorizontal="l"
              variant="title12black_medium"
              color="grey800"
            >
              {"\u2022"} {item.quantity} {item.unit} {item.type}
              {"    "} ({item.brand})
            </Text>
          );
        })}
        {item.method != undefined && (
          <>
            <Text mt="l" ms="l" variant="title12black_semibold" color="primary">
              Method
            </Text>
            <Text
              mt="xs"
              marginHorizontal="l"
              variant="title12black_medium"
              color="grey800"
            >
              {item.method}
            </Text>
          </>
        )}
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
    marginVertical: "5%",
  },
  list2: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: { width: "86%", height: 222, alignSelf: "center" },
});

export default DishDescription;
