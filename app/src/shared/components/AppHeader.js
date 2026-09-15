import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

/**
 * Cabeçalho compartilhado da aplicação baseado no React Native Paper (shared/components).
 */
export function AppHeader({
  title = 'Gestão de Treinamentos',
  subtitle,
  showBack = false,
  onBack,
  actions = [],
}) {
  const theme = useTheme();

  return (
    <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
      {showBack && onBack ? <Appbar.BackAction onPress={onBack} /> : null}
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          accessibilityLabel={action.accessibilityLabel || action.label}
        />
      ))}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 12,
  },
});
