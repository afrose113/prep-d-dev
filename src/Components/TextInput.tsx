import React from "react";
import { View } from "react-native";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Text, theme } from "./Theme";

interface TextInputProps extends RNTextInputProps {
  touched?: boolean;
  error?: string;
}

const TextInput = ({ touched, error, ...props }: TextInputProps) => {
  return (
    <View>
      <RNTextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey600}
        {...props}
      />
      {error && touched && (
        <Text ms="s" variant="title12black_semibold" mt="s" color="error">
          {error as string}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    height: 41,
    fontSize: 12,
    borderRadius: 30,
    fontFamily: "Metropolis-Medium",
    color: theme.colors.black,
    paddingHorizontal: "5%",
    marginTop: "7%",
  },
});

export default TextInput;
