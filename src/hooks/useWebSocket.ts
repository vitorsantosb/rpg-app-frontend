import { useEffect, useRef } from 'react';
import { websocketService } from '@/services/websocket.service.ts';
import { useAuth } from '@/contexts/AuthContext.tsx';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook para gerenciar conexão WebSocket
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { token, isAuthenticated } = useAuth();
  const { autoConnect = true, onConnect, onDisconnect, onError } = options;
  const handlersRef = useRef<Map<string, (data: unknown) => void>>(new Map());

  // Conecta automaticamente quando autenticado
  useEffect(() => {
    if (autoConnect && isAuthenticated && token) {
      websocketService.connect(token);

      if (onConnect) {
        const connectHandler = () => onConnect();
        websocketService.on('connect', connectHandler);
        handlersRef.current.set('connect', connectHandler);
      }

      if (onDisconnect) {
        const disconnectHandler = () => onDisconnect();
        websocketService.on('disconnect', disconnectHandler);
        handlersRef.current.set('disconnect', disconnectHandler);
      }

      if (onError) {
        const errorHandler = (error: unknown) => {
          onError(error instanceof Error ? error : new Error(String(error)));
        };
        websocketService.on('error', errorHandler);
        handlersRef.current.set('error', errorHandler);
      }
    }

    return () => {
      // Remove todos os handlers ao desmontar
      handlersRef.current.forEach((handler, event) => {
        websocketService.off(event, handler);
      });
      handlersRef.current.clear();
    };
  }, [autoConnect, isAuthenticated, token, onConnect, onDisconnect, onError]);

  // Desconecta quando não autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      websocketService.disconnect();
    }
  }, [isAuthenticated]);

  return {
    socket: websocketService,
    isConnected: websocketService.isConnected(),
    connect: (newToken?: string) => {
      websocketService.connect(newToken || token || '');
    },
    disconnect: () => websocketService.disconnect(),
    emit: (event: string, data?: unknown) => websocketService.emit(event, data),
    on: (event: string, callback: (data: unknown) => void) => {
      websocketService.on(event, callback);
      handlersRef.current.set(event, callback);
    },
    off: (event: string, callback?: (data: unknown) => void) => {
      websocketService.off(event, callback);
      if (callback) {
        handlersRef.current.delete(event);
      }
    },
  };
}

