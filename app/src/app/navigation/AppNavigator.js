import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { DashboardScreen } from '../../features/dashboard/screens/DashboardScreen';
import { AppHeader } from '../../shared/components/AppHeader';

const Stack = createStackNavigator();

/**
 * Tela placeholder para simulação da navegação a partir do Dashboard no protótipo.
 */
function PlaceholderScreen({ route, navigation }) {
  const theme = useTheme();
  const titulo = route.name;

  return (
    <View style={[styles.placeholderContainer, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title={titulo}
        subtitle="Módulo em desenvolvimento"
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.placeholderContent}>
        <Surface style={[styles.placeholderCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <Text variant="headlineSmall" style={styles.placeholderTitle}>
            Tela de {titulo}
          </Text>
          <Text variant="bodyMedium" style={[styles.placeholderText, { color: theme.colors.secondary }]}>
            Este módulo faz parte do escopo MVP do sistema de treinamentos e está integrado na navegação do protótipo.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.placeholderButton}
            buttonColor={theme.colors.primary}
          >
            Voltar ao Dashboard
          </Button>
        </Surface>
      </View>
    </View>
  );
}

/**
 * Navegador principal da aplicação (app/navigation).
 * Define o fluxo autenticado com o Dashboard como tela inicial,
 * respeitando as seções 7 e 13 do ai.md.
 */
export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Treinamentos" component={PlaceholderScreen} />
      <Stack.Screen name="Certificados" component={PlaceholderScreen} />
      <Stack.Screen name="Perfil" component={PlaceholderScreen} />
      <Stack.Screen name="TreinamentoDetalhes" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
  },
  placeholderContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCard: {
    width: '100%',
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
  },
  placeholderTitle: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  placeholderButton: {
    minWidth: 180,
  },
});
