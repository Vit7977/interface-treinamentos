import React from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { LightTheme, DarkTheme } from '../../theme';

/**
 * Provedores globais da aplicação (app/providers).
 * Centraliza tema do React Native Paper, SafeArea e NavigationContainer
 * conforme a seção 6.1 e 14 do ai.md.
 */
export function AppProviders({ children }) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
