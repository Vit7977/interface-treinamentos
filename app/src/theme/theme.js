// src/theme/theme.ts
import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
} from 'react-native-paper';
import { palette } from './colors';

const fontConfig = {
  fontFamily: 'System', // troque se usar fonte custom (ex: Inter, Poppins via expo-font)
};

export const LightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryLight,
    secondary: palette.secondary,
    secondaryContainer: palette.secondaryLight,
    error: palette.error,
    background: palette.background,
    surface: palette.surface,
    onSurface: palette.onSurface,
    outline: palette.outline,
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primary,
    primaryContainer: '#4F378B',
    secondary: palette.secondary,
    background: '#1C1B1F',
    surface: '#1C1B1F',
    onSurface: '#E6E1E5',
  },
};