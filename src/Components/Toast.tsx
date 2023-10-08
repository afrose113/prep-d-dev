import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from './Theme';
import Toast from 'react-native-toast-message';

interface toastprop {
  text1?: string;
}

const {width} = Dimensions.get('window');

export const toastConfig = {
  errorToast: ({text1}: toastprop) => (
    <View style={styles.toast}>
      <Text variant="title16black_regular" color="white">
        {text1}
      </Text>
    </View>
  ),
  successToast: ({text1}: toastprop) => (
    <View style={styles.successToast}>
      <Text variant="title16black_regular" color="white">
        {text1}
      </Text>
    </View>
  ),
};

export function showToast(toastType: any, message: string, position: any) {
  Toast.show({
    type: toastType,
    text1: message,
    position: position,
  });
}

const styles = StyleSheet.create({
  toast: {
    height: 50,
    width: 0.9 * width,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'red',
  },
  successToast: {
    height: 50,
    width: 0.9 * width,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'green',
  },
});
