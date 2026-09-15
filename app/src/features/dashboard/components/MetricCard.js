import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

/**
 * Card de métrica do Dashboard (features/dashboard/components).
 * Utiliza o React Native Paper para apresentar contadores de forma clara e elegante.
 */
export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  accentColor,
  onPress,
}) {
  const theme = useTheme();
  const color = accentColor || theme.colors.primary;

  return (
    <Card
      mode="elevated"
      elevation={1}
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="labelMedium" style={[styles.title, { color: theme.colors.secondary }]}>
            {title}
          </Text>
          {icon ? (
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
              <Text style={{ fontSize: 16 }}>{icon}</Text>
            </View>
          ) : null}
        </View>
        <Text variant="headlineMedium" style={[styles.value, { color }]}>
          {value}
        </Text>
        {subtitle ? (
          <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.outline }]}>
            {subtitle}
          </Text>
        ) : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    margin: 6,
    borderRadius: 12,
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontWeight: '600',
    flexShrink: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '700',
    marginVertical: 2,
  },
  subtitle: {
    marginTop: 2,
  },
});
