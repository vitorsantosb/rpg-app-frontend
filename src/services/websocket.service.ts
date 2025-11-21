import { io, Socket } from 'socket.io-client';

export class WebSocketService {
  private socket: Socket | null = null;
  private token: string | null = null;
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_WS_URL || 'http://localhost:4000';
  }

  /**
   * Conecta ao servidor WebSocket com autenticação JWT
   */
  connect(token: string): void {
    if (this.socket?.connected) {
      console.log('WebSocket já está conectado');
      return;
    }

    this.token = token;

    this.socket = io(this.baseURL, {
      auth: {
        token: `Bearer ${token}`,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupEventHandlers();
  }

  /**
   * Desconecta do servidor WebSocket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.token = null;
    }
  }

  /**
   * Verifica se está conectado
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Configura handlers de eventos padrão
   */
  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ WebSocket conectado:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ WebSocket desconectado:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erro ao conectar WebSocket:', error);
    });

    this.socket.on('error', (error) => {
      console.error('❌ Erro no WebSocket:', error);
    });
  }

  /**
   * Emite um evento para o servidor
   */
  emit(event: string, data?: unknown): void {
    if (!this.socket?.connected) {
      console.warn('WebSocket não está conectado. Tentando reconectar...');
      if (this.token) {
        this.connect(this.token);
      }
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Escuta um evento do servidor
   */
  on(event: string, callback: (data: unknown) => void): void {
    if (!this.socket) {
      console.warn('WebSocket não inicializado');
      return;
    }

    this.socket.on(event, callback);
  }

  /**
   * Remove listener de um evento
   */
  off(event: string, callback?: (data: unknown) => void): void {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }

  /**
   * Obtém a instância do socket (para casos avançados)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Instância singleton do serviço
export const websocketService = new WebSocketService();

