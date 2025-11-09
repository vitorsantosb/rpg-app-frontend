import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom';

import { appRoutes } from '@/models/routes.ts';

import RoutesWithNotFound from '@/utils/routes/notFound/RoutesWithNotFound';
import Layout from '@/Layouts/Layout.tsx';
import DashboardHomePage from '@/pages/dashboard/DashboardHomePage.tsx';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage.tsx';
import GogoCommandPage from '@/pages/dashboard/GogoCommandPage.tsx';
import UpdateTimelinePage from '@/pages/dashboard/UpdateTimelinePage.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';

function AppRoutes() {
  return (
    <Router>
      <RoutesWithNotFound>
        <Route path={appRoutes.ROOT} element={<Navigate to={appRoutes.DASHBOARD.ROOT} replace />} />
        <Route path={appRoutes.AUTH.LOGIN} element={<LoginPage />} />
        <Route element={<Layout />} path={appRoutes.DASHBOARD.ROOT}>
          <Route index element={<DashboardHomePage />} />
          <Route path={appRoutes.DASHBOARD.ANALYTICS} element={<AnalyticsPage />} />
          <Route path={appRoutes.DASHBOARD.GOGO_COMMAND} element={<GogoCommandPage />} />
          <Route path={appRoutes.DASHBOARD.UPDATES} element={<UpdateTimelinePage />} />
        </Route>
      </RoutesWithNotFound>
    </Router>
  );
}

export default AppRoutes;
