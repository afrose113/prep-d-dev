import CartBtnHeader from "@/Components/CartBtnHeader";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import { Text, theme } from "@/Components/Theme";
import { HomeNavigationProps } from "@/Navigator/Navigation";
import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";

const list = [
  { key: 1, text: "Apple Pay" },
  { key: 2, text: "Credit/Debit Card" },
];

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.85 * height;

const Payment = ({ navigation }: HomeNavigationProps<"Payment">) => {
  const [active, setactive] = useState(1);
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return (
    <View style={styles.container}>
      <CartBtnHeader nav={navigation} head="Payment Method" />
      <View style={styles.list}>
        {list.map((item) => {
          return (
            <Pressable
              style={styles.item}
              key={item.key}
              onPress={() => setactive(item.key)}
            >
              <View style={styles.radio}>
                {active == item.key && <View style={styles.active} />}
              </View>
              <Text ms="s" variant="title16black_medium" color="grey800">
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require("@/Assets/Images/card1.png")}
            style={styles.img}
          />
          <Image
            source={require("@/Assets/Images/card1.png")}
            style={styles.img}
          />
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Text ms="l" mt="l" variant="title16black_semibold" color="tertiary">
          +{" "}
          <Text
            variant="title16black_semibold"
            color="tertiary"
            textDecorationLine="underline"
          >
            Add another card
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.savebtn}>
        <Text variant="title16black_semibold" color="white">
          Done
        </Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={SLIDE_HEIGHT2}
        customStyles={{
          draggableIcon: {
            width: 0,
            height: 0,
          },
          container: styles.container1,
        }}
      >
        <View>
          <Text variant="market24Regular" color="primary">
            Add Another Card
          </Text>
          <Image
            source={require("@/Assets/Images/CreditCard.png")}
            style={styles.card}
          />
          <TextInput placeholder="Card Number" />
          <View style={styles.line}>
            <TextInput placeholder="MM/YY" style={styles.input} />
            <TextInput placeholder="CVC" style={styles.input2} />
          </View>
          <TextInput placeholder="Card Holder Name" />
          <Checkbox
            fontSize={12}
            text="Save this information for the next time"
            size={15}
          />
          <TouchableOpacity style={styles.btn}>
            <Text variant="title16black_semibold" color="primary800">
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.primary800, flex: 1 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "5%",
    marginHorizontal: "7%",
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
  },
  img: { width: 377, height: 230 },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "7%",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    height: 41,
    width: 158,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
  },
  input2: {
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: 20,
    paddingHorizontal: "5%",
    height: 41,
    width: 158,
    fontSize: 12,
    fontFamily: "Metropolis-Medium",
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: "7%",
  },
  card: { alignSelf: "center", height: 240, width: 388 },
  container1: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingVertical: "3%",
    paddingHorizontal: "7%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "15%",
    marginHorizontal: "7%",
  },
  list: { marginTop: "5%" },
  radio: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
});

export default Payment;
