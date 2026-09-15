import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, TouchableRipple, useTheme } from 'react-native-paper';

/**
 * Atalhos de ações rápidas no Dashboard (features/dashboard/components).
 * Permite navegação direta para Treinamentos, Certificados e Perfil.
 */
export function AcoesRapidas({
  onNavegarTreinamentos,
  onNavegarCertificados,
  onNavegarPerfil,
}) {
  const theme = useTheme();

  const acoes = [
    {
      id: 'treinamentos',
      titulo: 'Treinamentos',
      subtitulo: 'Ver catálogo e cursos',
      icon: '📚',
      onPress: onNavegarTreinamentos,
    },
    {
      id: 'certificados',
      titulo: 'Certificados',
      subtitulo: 'Emitir e consultar',
      icon: '🎓',
      onPress: onNavegarCertificados,
    },
    {
      id: 'perfil',
      titulo: 'Meu Perfil',
      subtitulo: 'Dados cadastrais',
      icon: '👤',
      onPress: onNavegarPerfil,
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Acesso Rápido
      </Text>
      <View style={styles.row}>
        {acoes.map((item) => (
          <Surface
            key={item.id}
            elevation={1}
            style={[styles.itemCard, { backgroundColor: theme.colors.surface }]}
          >
            <TouchableRipple
              onPress={item.onPress}
              rippleColor="rgba(103, 80, 164, 0.12)"
              style={styles.ripple}
            >
              <View style={styles.itemContent}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: theme.colors.primaryContainer },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                </View>
                <Text variant="labelLarge" style={styles.itemTitle}>
                  {item.titulo}
                </Text>
                <Text
                  variant="bodySmall"
                  style={[styles.itemSub, { color: theme.colors.outline }]}
                  numberOfLines={1}
                >
                  {item.subtitulo}
                </Text>
              </View>
            </TouchableRipple>
          </Surface>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ripple: {
    padding: 12,
  },
  itemContent: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  itemSub: {
    fontSize: 10,
    textAlign: 'center',
  },
});
