import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import { authService } from '../../../core/auth/authService';

/**
 * Hook orquestrador de estado do Dashboard (features/dashboard/hooks).
 * Controla os estados de loading, error, dados do resumo e dados do usuário logado.
 * Segue as diretrizes das seções 8 e 15 do ai.md.
 */
export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const carregarDados = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // Carrega usuário e dados do resumo em paralelo
      const [dadosUsuario, dadosResumo] = await Promise.all([
        authService.getUsuario(),
        dashboardService.obterResumo(),
      ]);

      setUsuario(dadosUsuario);
      setResumo(dadosResumo);
    } catch (err) {
      setError(err?.message || 'Não foi possível carregar os dados do painel.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const recarregar = useCallback(() => {
    return carregarDados(true);
  }, [carregarDados]);

  return {
    loading,
    refreshing,
    error,
    resumo,
    usuario,
    recarregar,
  };
}
