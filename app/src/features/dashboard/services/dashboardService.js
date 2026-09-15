import { apiClient } from '../../../core/api/apiClient';

/**
 * Dados padrão de demonstração para o protótipo do Dashboard,
 * alinhados com o contrato de dados de ai.md (seção 28.3) e spec.md (seção 5.2).
 */
const DADOS_PADRAO_PROTOTIPO = {
  contadores: {
    quantidadeFuncionarios: 12,
    quantidadeUsuarios: 12,
    quantidadeTreinamentos: 8,
    quantidadeInstrutores: 4,
    quantidadeCertificados: 5,
  },
  usuarioResumo: {
    treinamentosEmAndamento: 2,
    treinamentosPendentes: 3,
    treinamentosConcluidos: 3,
    certificadosEmitidos: 3,
    progressoGeralPercentual: 65,
  },
  treinamentoDestaque: {
    id: 1,
    titulo: 'NR-10 - Segurança em Instalações Elétricas',
    descricao: 'Capacitação sobre medidas de controle e sistemas preventivos de segurança.',
    cargaHoraria: 16,
    horasConcluidas: 10,
    progresso: 0.62,
    status: 'em_andamento',
    moduloAtual: 'Módulo 3: Riscos Adicionais e Primeiros Socorros',
    dataFim: '2026-09-30',
  },
  atividadesRecentes: [
    {
      id: 'atv-1',
      tipo: 'progresso',
      titulo: 'Módulo 2 concluído',
      detalhe: 'NR-10 - Segurança em Instalações Elétricas',
      tempo: 'Hoje às 10:30',
    },
    {
      id: 'atv-2',
      tipo: 'certificado',
      titulo: 'Certificado emitido',
      detalhe: 'NR-35 - Trabalho em Altura',
      tempo: 'Ontem',
    },
    {
      id: 'atv-3',
      tipo: 'inscricao',
      titulo: 'Inscrição confirmada',
      detalhe: 'NR-12 - Segurança no Trabalho em Máquinas',
      tempo: 'Há 3 dias',
    },
  ],
};

/**
 * Service da feature Dashboard (features/dashboard/services).
 * Encapsula o acesso ao endpoint /api/dashboard conforme seção 28.3 do ai.md.
 */
export const dashboardService = {
  async obterResumo() {
    try {
      // Chama o endpoint real /api/dashboard via API Client
      const apiResponse = await apiClient.get('/api/dashboard');

      // Se a API retornou o objeto esperado conforme ai.md:
      // { quantidadeFuncionarios, quantidadeUsuarios, quantidadeTreinamentos, quantidadeInstrutores, quantidadeCertificados }
      const contadores = {
        quantidadeFuncionarios: apiResponse?.quantidadeFuncionarios ?? DADOS_PADRAO_PROTOTIPO.contadores.quantidadeFuncionarios,
        quantidadeUsuarios: apiResponse?.quantidadeUsuarios ?? DADOS_PADRAO_PROTOTIPO.contadores.quantidadeUsuarios,
        quantidadeTreinamentos: apiResponse?.quantidadeTreinamentos ?? DADOS_PADRAO_PROTOTIPO.contadores.quantidadeTreinamentos,
        quantidadeInstrutores: apiResponse?.quantidadeInstrutores ?? DADOS_PADRAO_PROTOTIPO.contadores.quantidadeInstrutores,
        quantidadeCertificados: apiResponse?.quantidadeCertificados ?? DADOS_PADRAO_PROTOTIPO.contadores.quantidadeCertificados,
      };

      return {
        isLive: true,
        contadores,
        usuarioResumo: {
          treinamentosEmAndamento: Math.max(1, Math.floor(contadores.quantidadeTreinamentos * 0.3)),
          treinamentosPendentes: Math.max(1, Math.floor(contadores.quantidadeTreinamentos * 0.4)),
          treinamentosConcluidos: Math.max(1, Math.floor(contadores.quantidadeTreinamentos * 0.3)),
          certificadosEmitidos: contadores.quantidadeCertificados,
          progressoGeralPercentual: 65,
        },
        treinamentoDestaque: DADOS_PADRAO_PROTOTIPO.treinamentoDestaque,
        atividadesRecentes: DADOS_PADRAO_PROTOTIPO.atividadesRecentes,
      };
    } catch (error) {
      // Caso a API local não esteja rodando, utiliza dados de demonstração para o protótipo
      // com indicação de modo demonstração/offline para permitir teste visual completo
      return {
        isLive: false,
        avisoOffline: 'Exibindo dados de demonstração (API em localhost:3000 offline)',
        ...DADOS_PADRAO_PROTOTIPO,
      };
    }
  },
};
