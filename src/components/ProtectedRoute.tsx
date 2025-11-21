import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { appRoutes } from '@/models/routes.ts';
import { Loader, Center } from '@mantine/core';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas que requerem autenticação
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={appRoutes.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
}

