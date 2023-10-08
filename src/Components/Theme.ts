import {createBox, createText, useTheme as useReTheme} from '@shopify/restyle';

export const theme = {
  colors: {
    black: '#000000',
    white: '#fff',
    error: '#FB3766',
    success: '#11CF8B',
    grey400: '#9C9CAB',
    grey300: '#C8C8D0',
    grey200: '#E3E3E8',
    grey100: '#F4F4F6',
    platinum: '#E2E2E2',
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
    title32black_bold: {
      fontSize: 32,
      lineHeight: 34,
      color: 'black',
      fontFamily: 'Metropolis-Bold',
    },
    title32black_semibold: {
      fontSize: 32,
      lineHeight: 34,
      color: 'black',
      fontFamily: 'Metropolis-SemiBold',
    },
    title32black_medium: {
      fontSize: 32,
      lineHeight: 34,
      color: 'black',
      fontFamily: 'Metropolis-Medium',
    },
    title32black_regular: {
      fontSize: 32,
      lineHeight: 34,
      color: 'black',
      fontFamily: 'Metropolis-Regular',
    },
    title16black_bold: {
      fontSize: 16,
      lineHeight: 19,
      color: 'black',
      fontFamily: 'Metropolis-Bold',
    },
    title16black_semibold: {
      fontSize: 16,
      lineHeight: 19,
      color: 'black',
      fontFamily: 'Metropolis-SemiBold',
    },
    title16black_medium: {
      fontSize: 16,
      lineHeight: 20,
      color: 'black',
      fontFamily: 'Metropolis-Medium',
    },
    title16black_regular: {
      fontSize: 16,
      lineHeight: 20,
      color: 'black',
      fontFamily: 'Metropolis-Regular',
    },
    title14black_bold: {
      fontSize: 14,
      lineHeight: 19,
      color: 'black',
      fontFamily: 'Metropolis-Bold',
    },
    title14black_semibold: {
      fontSize: 14,
      lineHeight: 19,
      color: 'black',
      fontFamily: 'Metropolis-SemiBold',
    },
    title14black_medium: {
      fontSize: 14,
      lineHeight: 20,
      color: 'black',
      fontFamily: 'Metropolis-Medium',
    },
    title14black_regular: {
      fontSize: 14,
      lineHeight: 20,
      color: 'black',
      fontFamily: 'Metropolis-Regular',
    },
    title12black_bold: {
      fontSize: 12,
      lineHeight: 16,
      color: 'black',
      fontFamily: 'Metropolis-Bold',
    },
    title12black_semibold: {
      fontSize: 12,
      lineHeight: 16,
      color: 'black',
      fontFamily: 'Metropolis-SemiBold',
    },
    title12black_medium: {
      fontSize: 12,
      lineHeight: 16,
      color: 'black',
      fontFamily: 'Metropolis-Medium',
    },
    title12black_regular: {
      fontSize: 12,
      lineHeight: 16,
      color: 'black',
      fontFamily: 'Metropolis-Regular',
    },
  },

  breakpoints: {},
};

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();
