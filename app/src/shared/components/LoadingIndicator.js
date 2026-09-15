import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

/**
 * Componente compartilhado de carregamento (shared/components).
 * Utiliza o ActivityIndicator do React Native Paper respeitando o tema.
 */
export function LoadingIndicator({ message = 'Carregando dados...' }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message ? (
        <Text variant="bodyMedium" style={[styles.text, { color: theme.colors.secondary }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
  },
});
