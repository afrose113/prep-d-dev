import { Text, theme } from "@/Components/Theme";
import React, { FC, MutableRefObject, ReactNode, useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Bankicon from "@/Assets/Svg/bank.svg";
import Edit from "@/Assets/Svg/edit.svg";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.5 * height;
const SLIDE_HEIGHT3 = 0.6 * height;

const Bank = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  const refRBSheet2 = useRef<any>();
  return (
    <>
      <View style={styles.container}>
        <Text mb="m" variant="title14black_semibold" color="grey800">
          Bank Details
        </Text>
        <View style={styles.list}>
          <View style={styles.list2}>
            <Bankicon />
            <View style={styles.bankdetails}>
              <Text mb="s" variant="title12black_semibold" color="grey800">
                Bank Transfer
              </Text>
              <Text mb="s" variant="title12black_medium" color="grey800">
                **** 1234
              </Text>
              <Text variant="title12black_medium" color="grey800">
                Amr Kaki
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => refRBSheet2.current.open()}>
            <Edit />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.savebtn}
          onPress={() => refRBSheet.current.open()}
        >
          <Text variant="title16black_semibold" color="white">
            Add Bank Account
          </Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={SLIDE_HEIGHT3}
        customStyles={{
          draggableIcon: {
            width: 0,
            height: 0,
          },
          container: styles.container2,
        }}
      >
        <View>
          <Text
            mb="m"
            variant="market24Regular"
            lineHeight={32}
            color="grey800"
          >
            Edit Bank Details
          </Text>
          <View style={styles.list2}>
            <Bankicon />
            <View style={styles.bankdetails}>
              <Text mb="s" variant="title12black_semibold" color="grey800">
                Bank Transfer
              </Text>
              <Text mb="s" variant="title12black_medium" color="grey800">
                **** 1234
              </Text>
              <Text variant="title12black_medium" color="grey800">
                Amr Kaki
              </Text>
            </View>
          </View>
          <TextInput placeholder="Name on Bank Account" />
          <TextInput placeholder="Bank Name" />
          <TextInput placeholder="IBAN" />
          <TouchableOpacity
            style={styles.otpbtn}
            onPress={() => refRBSheet.current.close()}
          >
            <Text variant="title14black_semibold" color="primary800">
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
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
          container: styles.container2,
        }}
      >
        <View>
          <Text variant="market24Regular" lineHeight={32} color="grey800">
            Add Bank Account
          </Text>
          <TextInput placeholder="Name on Bank Account" />
          <TextInput placeholder="Bank Name" />
          <TextInput placeholder="IBAN" />
          <Checkbox
            text="Set as primary payment method"
            size={15}
            fontSize={12}
          />
          <TouchableOpacity
            style={styles.otpbtn}
            onPress={() => refRBSheet.current.close()}
          >
            <Text variant="title14black_semibold" color="primary800">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    marginHorizontal: "6%",
    paddingHorizontal: "3%",
    borderRadius: 20,
    paddingVertical: "3%",
    marginTop: "5%",
    marginBottom: "25%",
  },
  otpbtn: {
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginTop: "10%",
  },
  container2: {
    backgroundColor: theme.colors.primary800,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "7%",
    paddingVertical: "3%",
  },
  bankdetails: { marginStart: "10%" },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: 30,
    marginTop: "5%",
  },
  line: {
    height: 2,
    width: "100%",
    backgroundColor: theme.colors.grey200,
    marginVertical: "3%",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1%",
  },
  list2: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Bank;
