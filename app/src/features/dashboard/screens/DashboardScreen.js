import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Surface,
  Divider,
  Banner,
  useTheme,
  Card,
  List,
  Avatar,
} from 'react-native-paper';
import { useDashboard } from '../hooks/useDashboard';
import { MetricCard } from '../components/MetricCard';
import { TreinamentoDestaqueCard } from '../components/TreinamentoDestaqueCard';
import { AcoesRapidas } from '../components/AcoesRapidas';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { AppHeader } from '../../../shared/components/AppHeader';

/**
 * Tela inicial do sistema — Dashboard (features/dashboard/screens).
 * Respeita integralmente a arquitetura de ai.md:
 * - Não faz chamadas HTTP diretamente (consome useDashboard).
 * - Não manipula storage ou token diretamente.
 * - Trata os estados de loading, erro e apresentação de dados.
 * - Utiliza React Native Paper e componentes de shared.
 */
export function DashboardScreen({ navigation }) {
  const theme = useTheme();
  const { loading, refreshing, error, resumo, usuario, recarregar } = useDashboard();

  // Ações de navegação rápida para as demais telas do fluxo autenticado
  const handleNavegarTreinamentos = () => {
    if (navigation?.navigate) {
      navigation.navigate('Treinamentos');
    }
  };

  const handleNavegarCertificados = () => {
    if (navigation?.navigate) {
      navigation.navigate('Certificados');
    }
  };

  const handleNavegarPerfil = () => {
    if (navigation?.navigate) {
      navigation.navigate('Perfil');
    }
  };

  const handleContinuarTreinamento = (treinamento) => {
    if (navigation?.navigate) {
      navigation.navigate('TreinamentoDetalhes', { id: treinamento?.id });
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <AppHeader
        title="Gestão de Treinamentos"
        subtitle="Painel Principal"
        actions={[
          {
            icon: 'refresh',
            label: 'Atualizar',
            onPress: recarregar,
          },
        ]}
      />

      {loading && !refreshing ? (
        <LoadingIndicator message="Carregando resumo do sistema..." />
      ) : error ? (
        <ErrorMessage
          title="Erro ao carregar o Dashboard"
          message={error}
          onRetry={recarregar}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={recarregar}
              colors={[theme.colors.primary]}
            />
          }
        >
          {resumo?.avisoOffline ? (
            <Banner
              visible={true}
              style={styles.bannerAviso}
              icon="information"
            >
              Modo demonstração: {resumo.avisoOffline}
            </Banner>
          ) : null}

          {/* Saudação e Boas-vindas */}
          <Surface
            elevation={1}
            style={[styles.welcomeSurface, { backgroundColor: theme.colors.surface }]}
          >
            <View style={styles.welcomeRow}>
              <Avatar.Text
                size={48}
                label={usuario?.nome ? usuario.nome.substring(0, 2).toUpperCase() : 'US'}
                style={{ backgroundColor: theme.colors.primary }}
              />
              <View style={styles.welcomeTextGroup}>
                <Text variant="titleLarge" style={styles.welcomeTitle}>
                  Olá, {usuario?.nome || 'Usuário'}!
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                  {usuario?.cargo || 'Colaborador'} • Matrícula: {usuario?.matricula || '---'}
                </Text>
              </View>
            </View>
          </Surface>

          {/* Seção de Indicadores do Usuário */}
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Seu Desempenho
            </Text>
            <Text variant="labelSmall" style={{ color: theme.colors.primary, fontWeight: '700' }}>
              Progresso Geral: {resumo?.usuarioResumo?.progressoGeralPercentual || 0}%
            </Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricRow}>
              <MetricCard
                title="Em Andamento"
                value={resumo?.usuarioResumo?.treinamentosEmAndamento ?? 0}
                subtitle="treinamentos ativos"
                icon="⏳"
                accentColor="#0288D1"
                onPress={handleNavegarTreinamentos}
              />
              <MetricCard
                title="Pendentes"
                value={resumo?.usuarioResumo?.treinamentosPendentes ?? 0}
                subtitle="a iniciar"
                icon="📋"
                accentColor="#ED6C02"
                onPress={handleNavegarTreinamentos}
              />
            </View>

            <View style={styles.metricRow}>
              <MetricCard
                title="Concluídos"
                value={resumo?.usuarioResumo?.treinamentosConcluidos ?? 0}
                subtitle="finalizados com êxito"
                icon="✅"
                accentColor="#2E7D32"
                onPress={handleNavegarTreinamentos}
              />
              <MetricCard
                title="Certificados"
                value={resumo?.usuarioResumo?.certificadosEmitidos ?? 0}
                subtitle="emitidos e válidos"
                icon="🎓"
                accentColor={theme.colors.primary}
                onPress={handleNavegarCertificados}
              />
            </View>
          </View>

          {/* Treinamento Prioritário em Andamento */}
          {resumo?.treinamentoDestaque ? (
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Continuar de Onde Parou
              </Text>
              <TreinamentoDestaqueCard
                treinamento={resumo.treinamentoDestaque}
                onContinuar={() => handleContinuarTreinamento(resumo.treinamentoDestaque)}
              />
            </View>
          ) : null}

          {/* Atalhos de Ação Rápida */}
          <AcoesRapidas
            onNavegarTreinamentos={handleNavegarTreinamentos}
            onNavegarCertificados={handleNavegarCertificados}
            onNavegarPerfil={handleNavegarPerfil}
          />

          <Divider style={styles.divider} />

          {/* Resumo de Atividades Recentes */}
          {resumo?.atividadesRecentes?.length ? (
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Histórico Recente
              </Text>
              <Card mode="elevated" elevation={1} style={[styles.historyCard, { backgroundColor: theme.colors.surface }]}>
                {resumo.atividadesRecentes.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <List.Item
                      title={item.titulo}
                      description={item.detalhe}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon={
                            item.tipo === 'certificado'
                              ? 'certificate'
                              : item.tipo === 'inscricao'
                              ? 'file-document-outline'
                              : 'checkbox-marked-circle-outline'
                          }
                          color={
                            item.tipo === 'certificado'
                              ? theme.colors.primary
                              : item.tipo === 'inscricao'
                              ? '#0288D1'
                              : '#2E7D32'
                          }
                        />
                      )}
                      right={() => (
                        <Text variant="labelSmall" style={styles.timeText}>
                          {item.tempo}
                        </Text>
                      )}
                      titleStyle={{ fontWeight: '600', fontSize: 14 }}
                      descriptionStyle={{ fontSize: 12 }}
                    />
                    {index < resumo.atividadesRecentes.length - 1 ? <Divider /> : null}
                  </React.Fragment>
                ))}
              </Card>
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  bannerAviso: {
    marginBottom: 12,
    borderRadius: 8,
  },
  welcomeSurface: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeTextGroup: {
    marginLeft: 14,
    flex: 1,
  },
  welcomeTitle: {
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  metricsGrid: {
    marginBottom: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 14,
  },
  historyCard: {
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  timeText: {
    alignSelf: 'center',
    marginRight: 12,
    color: '#888',
  },
});
