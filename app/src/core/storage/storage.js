import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const memoryFallback = new Map();

/**
 * Storage centralizado da aplicação (core/storage).
 * Utiliza SecureStore no ambiente nativo e fallback resiliente em ambiente web.
 */
export const storage = {
  async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return memoryFallback.get(key) || null;
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      return memoryFallback.get(key) || null;
    }
  },

  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
          return;
        }
        memoryFallback.set(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      memoryFallback.set(key, value);
    }
  },

  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
          return;
        }
        memoryFallback.delete(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      memoryFallback.delete(key);
    }
  },
};
