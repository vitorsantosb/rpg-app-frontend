import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

export class AxiosService {
  private api: AxiosInstance;
  private apiToken?: string;
  private userJWT?: string;

  constructor(baseURL: string) {
    this.apiToken = import.meta.env.VITE_API_TOKEN;
    this.userJWT = '';
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      // Log para debug
      console.log('🚀 Requisição sendo enviada:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        headers: config.headers,
      });

      // Rotas públicas que não precisam de X-Api-Token
      const publicRoutes = ['/user/login', '/user/register'];
      const isPublicRoute = config.url && publicRoutes.some(route => config.url?.startsWith(route));

      // Só adiciona Authorization se houver um JWT válido
      if (this.userJWT && this.userJWT.trim() !== '') {
        config.headers.Authorization = `Bearer ${this.userJWT}`;
      }
      
      // Só adiciona X-Api-Token se:
      // 1. Existir e não for vazio
      // 2. Não for um valor placeholder
      // 3. Não for uma rota pública
      if (
        this.apiToken && 
        this.apiToken.trim() !== '' &&
        !this.apiToken.toLowerCase().includes('seu_token') &&
        !this.apiToken.toLowerCase().includes('your_token') &&
        !isPublicRoute
      ) {
        config.headers['X-Api-Token'] = this.apiToken;
      }
      
      return config;
    });

    // Response interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response) => {
        console.log('✅ Resposta recebida:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ Erro na requisição:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'N/A',
          responseData: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  public setUserJWT(token: string) {
    this.userJWT = token;
  }

  public setApiToken(token: string) {
    this.apiToken = token;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    console.log(JSON.stringify(data, null, 2));
    return this.api.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}

// Instância singleton do serviço
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
console.log('🔧 AxiosService inicializado com baseURL:', baseURL);
export const apiService = new AxiosService(baseURL);
