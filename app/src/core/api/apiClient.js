import axios from 'axios';
import { authService } from '../auth/authService';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Instância centralizada do Axios conforme seção 10 e 28 do ai.md.
 * Centraliza baseURL, timeout, headers, interceptors e tratamento técnico de respostas.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para injeção automática de token Bearer
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await authService.getToken();
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Falha ao recuperar token não deve travar requisição sem autenticação
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento técnico unificado de respostas e erros
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Normalização do erro para não expor detalhes técnicos crus
    const status = error?.response?.status;
    const data = error?.response?.data;
    
    let mensagemAmigavel = 'Ocorreu um erro na comunicação com o servidor.';
    if (status === 401) {
      mensagemAmigavel = 'Sessão expirada. Faça login novamente.';
    } else if (status === 403) {
      mensagemAmigavel = 'Você não tem permissão para realizar esta ação.';
    } else if (status === 404) {
      mensagemAmigavel = 'Recurso não encontrado.';
    } else if (status >= 500) {
      mensagemAmigavel = 'Servidor temporariamente indisponível. Tente novamente mais tarde.';
    } else if (error.code === 'ECONNABORTED') {
      mensagemAmigavel = 'Tempo limite de resposta excedido. Verifique sua conexão.';
    } else if (!error.response) {
      mensagemAmigavel = 'Não foi possível conectar ao servidor. Verifique se a API está ativa.';
    }

    const customError = new Error(mensagemAmigavel);
    customError.status = status;
    customError.data = data;
    customError.isTechnical = true;

    return Promise.reject(customError);
  }
);

/**
 * Cliente da API centralizado (core/api).
 * Fornece métodos HTTP padronizados para os Feature Services.
 */
export const apiClient = {
  get(url, config = {}) {
    return axiosInstance.get(url, config);
  },
  post(url, data, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url, data, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  patch(url, data, config = {}) {
    return axiosInstance.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axiosInstance.delete(url, config);
  },
  getBaseUrl() {
    return BASE_URL;
  },
};
