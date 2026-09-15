import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './src/app/providers/AppProviders';
import { AppNavigator } from './src/app/navigation/AppNavigator';

/**
 * Ponto de entrada da aplicação.
 * Encapsula provedores globais (Tema, Navigation, SafeArea) e o navegador principal.
 */
export default function App() {
  return (
    <AppProviders>
      <StatusBar style="auto" />
      <AppNavigator />
    </AppProviders>
  );
}
