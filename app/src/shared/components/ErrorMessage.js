import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';

/**
 * Componente compartilhado para exibição de erros amigáveis (shared/components).
 * Fornece feedback visual e botão para retry sem expor termos técnicos.
 */
export function ErrorMessage({
  title = 'Não foi possível carregar as informações',
  message = 'Verifique sua conexão e tente novamente.',
  onRetry,
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]} elevation={1}>
        <Text variant="titleMedium" style={[styles.title, { color: theme.colors.error }]}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant || theme.colors.secondary }]}>
          {message}
        </Text>
        {onRetry ? (
          <Button
            mode="contained"
            onPress={onRetry}
            style={styles.button}
            buttonColor={theme.colors.primary}
          >
            Tentar novamente
          </Button>
        ) : null}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    width: '100%',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    minWidth: 160,
  },
});
