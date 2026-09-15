import { storage } from '../storage/storage';

const TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@auth_refresh_token';
const USUARIO_KEY = '@auth_usuario';

// Usuário padrão de demonstração para o protótipo (baseado na especificação ai.md seção 28.1)
const USUARIO_DEMO = {
  id: 1,
  nome: 'Carlo Souza',
  email: 'carlo.souza@empresa.com',
  cargo: 'Analista de Operações',
  matricula: 'F001',
  ativo: true,
};

/**
 * Serviço de autenticação centralizado no core (core/auth).
 * Gerencia tokens e dados do usuário da sessão sem expor manipulação direta às telas.
 */
export const authService = {
  async getToken() {
    return await storage.getItem(TOKEN_KEY);
  },

  async getRefreshToken() {
    return await storage.getItem(REFRESH_TOKEN_KEY);
  },

  async getUsuario() {
    const raw = await storage.getItem(USUARIO_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return USUARIO_DEMO;
      }
    }
    return USUARIO_DEMO;
  },

  async setSession(token, refreshToken, usuario) {
    if (token) await storage.setItem(TOKEN_KEY, token);
    if (refreshToken) await storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (usuario) await storage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  },

  async clearSession() {
    await storage.removeItem(TOKEN_KEY);
    await storage.removeItem(REFRESH_TOKEN_KEY);
    await storage.removeItem(USUARIO_KEY);
  },

  async isAuthenticated() {
    const token = await this.getToken();
    return Boolean(token);
  },
};
