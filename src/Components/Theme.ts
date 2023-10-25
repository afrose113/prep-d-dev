import {
  createBox,
  createText,
  useTheme as useReTheme,
} from "@shopify/restyle";

export const theme = {
  colors: {
    black: "#000000",
    white: "#fff",
    error: "#FB3766",
    success: "#11CF8B",
    grey200: "#E9E7DD",
    grey300: "#B8B8B8",
    grey500: "#808080",
    grey600: "#636363",
    grey700: "#474747",
    grey800: "#2A2A2A",
    primary: "#294C21",
    primary800: "#F5F3E9",
    grey400: "#9c9c9c",
    orange: "#EF813A",
    card: "#E7E3D2",
    tertiary: "#E84F1E",
  },
  spacing: {
    xxs: 3,
    xs: 6,
    s: 8,
    m: 16,
    ml: 20,
    l: 24,
    xl: 40,
    xxl: 50,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 40,
  },
  textVariants: {
    market40Bold: {
      fontSize: 40,
      lineHeight: 44,
      color: "black",
      fontFamily: "MarketPro-Bold",
    },
    market40Medium: {
      fontSize: 40,
      lineHeight: 44,
      color: "black",
      fontFamily: "MarketPro-CondMedium",
    },
    market40Regular: {
      fontSize: 40,
      lineHeight: 44,
      color: "black",
      fontFamily: "MarketPro",
    },
    market24Bold: {
      fontSize: 24,
      lineHeight: 28,
      color: "black",
      fontFamily: "MarketPro-Bold",
    },
    market24Medium: {
      fontSize: 24,
      lineHeight: 28,
      color: "black",
      fontFamily: "MarketPro-CondMedium",
    },
    market24Regular: {
      fontSize: 24,
      lineHeight: 28,
      color: "black",
      fontFamily: "MarketPro",
    },
    title32black_bold: {
      fontSize: 32,
      lineHeight: 34,
      color: "black",
      fontFamily: "Metropolis-Bold",
    },
    title32black_semibold: {
      fontSize: 32,
      lineHeight: 34,
      color: "black",
      fontFamily: "Metropolis-SemiBold",
    },
    title32black_medium: {
      fontSize: 32,
      lineHeight: 34,
      color: "black",
      fontFamily: "Metropolis-Medium",
    },
    title32black_regular: {
      fontSize: 32,
      lineHeight: 34,
      color: "black",
      fontFamily: "Metropolis-Regular",
    },
    title16black_bold: {
      fontSize: 16,
      lineHeight: 19,
      color: "black",
      fontFamily: "Metropolis-Bold",
    },
    title16black_semibold: {
      fontSize: 16,
      lineHeight: 19,
      color: "black",
      fontFamily: "Metropolis-SemiBold",
    },
    title16black_medium: {
      fontSize: 16,
      lineHeight: 20,
      color: "black",
      fontFamily: "Metropolis-Medium",
    },
    title16black_regular: {
      fontSize: 16,
      lineHeight: 20,
      color: "black",
      fontFamily: "Metropolis-Regular",
    },
    title14black_bold: {
      fontSize: 14,
      lineHeight: 19,
      color: "black",
      fontFamily: "Metropolis-Bold",
    },
    title14black_semibold: {
      fontSize: 14,
      lineHeight: 19,
      color: "black",
      fontFamily: "Metropolis-SemiBold",
    },
    title14black_medium: {
      fontSize: 14,
      lineHeight: 20,
      color: "black",
      fontFamily: "Metropolis-Medium",
    },
    title14black_regular: {
      fontSize: 14,
      lineHeight: 20,
      color: "black",
      fontFamily: "Metropolis-Regular",
    },
    title12black_bold: {
      fontSize: 12,
      lineHeight: 16,
      color: "black",
      fontFamily: "Metropolis-Bold",
    },
    title12black_semibold: {
      fontSize: 12,
      lineHeight: 16,
      color: "black",
      fontFamily: "Metropolis-SemiBold",
    },
    title12black_medium: {
      fontSize: 12,
      lineHeight: 16,
      color: "black",
      fontFamily: "Metropolis-Medium",
    },
    title12black_regular: {
      fontSize: 12,
      lineHeight: 16,
      color: "black",
      fontFamily: "Metropolis-Regular",
    },
  },

  breakpoints: {},
};

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();
