import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, ProgressBar, Button, Chip, useTheme } from 'react-native-paper';

/**
 * Card para exibir o treinamento em andamento prioritário (features/dashboard/components).
 * Apresenta barra de progresso, carga horária e ação para continuar.
 */
export function TreinamentoDestaqueCard({ treinamento, onContinuar }) {
  const theme = useTheme();

  if (!treinamento) {
    return null;
  }

  const progressoPercent = Math.round((treinamento.progresso || 0) * 100);

  return (
    <Card mode="elevated" elevation={2} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.topRow}>
          <Chip
            compact
            style={[styles.chip, { backgroundColor: theme.colors.primaryContainer }]}
            textStyle={{ color: theme.colors.primary, fontWeight: '700', fontSize: 11 }}
          >
            EM ANDAMENTO
          </Chip>
          <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>
            Término: {treinamento.dataFim}
          </Text>
        </View>

        <Text variant="titleMedium" style={styles.titulo}>
          {treinamento.titulo}
        </Text>
        <Text
          variant="bodySmall"
          numberOfLines={2}
          style={[styles.descricao, { color: theme.colors.secondary }]}
        >
          {treinamento.descricao}
        </Text>

        <View style={styles.moduloContainer}>
          <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
            Módulo atual:
          </Text>
          <Text variant="bodySmall" style={{ fontWeight: '600' }} numberOfLines={1}>
            {treinamento.moduloAtual}
          </Text>
        </View>

        <View style={styles.progressHeader}>
          <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>
            Progresso ({progressoPercent}%)
          </Text>
          <Text variant="labelSmall" style={{ color: theme.colors.secondary }}>
            {treinamento.horasConcluidas}h / {treinamento.cargaHoraria}h
          </Text>
        </View>

        <ProgressBar
          progress={treinamento.progresso || 0}
          color={theme.colors.primary}
          style={styles.progressBar}
        />

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={onContinuar}
            style={styles.button}
            buttonColor={theme.colors.primary}
          >
            Continuar Treinamento
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    marginVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chip: {
    borderRadius: 12,
    height: 24,
  },
  titulo: {
    fontWeight: '700',
    marginBottom: 4,
  },
  descricao: {
    marginBottom: 12,
    lineHeight: 18,
  },
  moduloContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F3F7',
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 8,
  },
});
