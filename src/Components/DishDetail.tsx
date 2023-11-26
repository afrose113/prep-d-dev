import React, { FC, MutableRefObject, ReactNode, useRef } from "react";
import _RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { Dimensions, View } from "react-native";

const { height } = Dimensions.get("window");
export const SLIDE_HEIGHT2 = 0.45 * height;

const DishDetail = () => {
  const RBSheet = _RBSheet as unknown as FC<
    RBSheetProps & { children: ReactNode; ref: MutableRefObject<any> }
  >;
  const refRBSheet = useRef<any>();
  return <View></View>;
};

export default DishDetail;
