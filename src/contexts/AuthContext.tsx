import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import { apiService } from '@/services/axios.service.ts';
import { appRoutes } from '@/models/routes.ts';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  roles?: string;
  roleSlugs?: string[];
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData?: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar dados do usuário do endpoint (com JWT no header)
  const refreshUserData = useCallback(async (tokenToUse?: string) => {
    const tokenToDecode = tokenToUse || token;
    if (!tokenToDecode) return;

    try {
      const response = await apiService.get<{ user: any }>('/user/me');
      if (response.data?.user) {
        const backendUser = response.data.user;
        // Mapeia dados do backend (com _) para o formato do frontend
        const userData: User = {
          id: backendUser._id,
          email: backendUser._email,
          username: backendUser._username,
          avatar: backendUser._avatar,
          roles: backendUser._roles,
          roleSlugs: backendUser._roleSlugs,
        };
        setUser(userData);
        // Salva os dados do usuário no storage do Electron
        await window.electronAPI.setStorage('user_data', JSON.stringify(userData));
        return;
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      // Só faz logout se o token for inválido (401)
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        setToken(null);
        setUser(null);
        apiService.setUserJWT('');
        await window.electronAPI.removeStorage('auth_token');
        await window.electronAPI.removeStorage('user_data');
        // Redirecionamento será feito pelo ProtectedRoute
      }
    }
  }, [token]);

  const login = useCallback(async (newToken: string, userData?: User) => {
    setToken(newToken);
    apiService.setUserJWT(newToken);
    await window.electronAPI.setStorage('auth_token', newToken);

    if (userData) {
      setUser(userData);
      // Salva os dados do usuário no storage
      await window.electronAPI.setStorage('user_data', JSON.stringify(userData));
    } else {
      // Busca dados do usuário do endpoint (com JWT no header)
      await refreshUserData(newToken);
    }
  }, [refreshUserData]);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    apiService.setUserJWT('');
    await window.electronAPI.removeStorage('auth_token');
    await window.electronAPI.removeStorage('user_data');
    // Redirecionamento será feito pelo ProtectedRoute ou RootRedirect
    window.location.href = appRoutes.AUTH.LOGIN;
  }, []);

  // Carrega o token e dados do usuário do storage na inicialização
  useEffect(() => {
    async function loadFromStorage() {
      try {
        const storedToken = await window.electronAPI.getStorage('auth_token');
        const storedUserData = await window.electronAPI.getStorage('user_data');

        if (storedToken && storedToken.trim() !== '') {
          setToken(storedToken);
          apiService.setUserJWT(storedToken);

          // Carrega dados do usuário do storage se existirem
          if (storedUserData) {
            try {
              const userData = JSON.parse(storedUserData);
              setUser(userData);
            } catch (parseError) {
              console.error('Erro ao parsear dados do usuário do storage:', parseError);
            }
          }

          // Busca dados atualizados do endpoint (com JWT no header)
          // Isso garante que os dados estão atualizados e valida o token
          await refreshUserData(storedToken);
        } else {
          // Se não houver token, garante que está desautenticado
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao carregar do storage:', error);
        // Em caso de erro, garante que está desautenticado
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    isLoading,
    // Considera autenticado se tiver token (user pode não estar carregado ainda)
    isAuthenticated: !!token,
    login,
    logout,
    refreshUserData,
  }), [user, token, isLoading, login, logout, refreshUserData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

