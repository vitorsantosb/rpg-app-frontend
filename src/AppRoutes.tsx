import { Navigate, Route } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';

import { appRoutes } from '@/models/routes.ts';

import RoutesWithNotFound from '@/utils/routes/notFound/RoutesWithNotFound';
import Layout from '@/Layouts/Layout.tsx';
import DashboardHomePage from '@/pages/dashboard/DashboardHomePage.tsx';
import CampaignsPage from '@/pages/dashboard/CampaignsPage.tsx';
import SessionsPage from '@/pages/dashboard/SessionsPage.tsx';
import GogoCommandPage from '@/pages/dashboard/GogoCommandPage.tsx';
import UpdateTimelinePage from '@/pages/dashboard/UpdateTimelinePage.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx';
import { useAuth } from '@/contexts/AuthContext.tsx';

// Componente para redirecionar baseado na autenticação
function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={appRoutes.DASHBOARD.ROOT} replace />;
  }

  return <Navigate to={appRoutes.AUTH.LOGIN} replace />;
}

function AppRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path={appRoutes.ROOT} element={<RootRedirect />} />
      <Route path={appRoutes.AUTH.LOGIN} element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
        path={appRoutes.DASHBOARD.ROOT}
        >
          <Route index element={<DashboardHomePage />} />
          <Route path={appRoutes.DASHBOARD.CAMPAIGNS} element={<CampaignsPage />} />
          <Route path={appRoutes.DASHBOARD.SESSIONS} element={<SessionsPage />} />
          <Route path={appRoutes.DASHBOARD.GOGO_COMMAND} element={<GogoCommandPage />} />
          <Route path={appRoutes.DASHBOARD.UPDATES} element={<UpdateTimelinePage />} />
        </Route>
    </RoutesWithNotFound>
  );
}

export default AppRoutes;
