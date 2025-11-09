import {BrowserRouter as Router, Route} from 'react-router-dom';

import {adminRoutes} from '@/models/routes.js';

import RoutesWithNotFound from '@/utils/routes/notFound/RoutesWithNotFound'
import Layout from '@/Layouts/Layout.tsx';
import AdminPanelHome from '@/pages/AdminPage/Dashboard/AdminPanelHome.tsx';
import AnalyticsPage from '@/pages/AdminPage/Dashboard/analitycs/AnalyticsPage.tsx';
import GogoCommandPage from '@/pages/AdminPage/Dashboard/GogoCommand/GogoCommandPage.tsx';
import AdminLoginPage from '@/pages/AdminPage/AdminLoginPage.tsx';

function AppRoutes() {
  return (
    <Router>
      <RoutesWithNotFound>
        <Route path="/" element={<AdminLoginPage/>}/>
        <Route path={adminRoutes.HOMEPAGE} element={<AdminLoginPage/>}/>
        <Route element={<Layout/>} path={adminRoutes.DASHBOARD.HOME}>
          <Route index element={<AdminPanelHome/>}/>
          <Route path={adminRoutes.DASHBOARD.ANALYTICS} element={<AnalyticsPage/>}/>
          <Route path={adminRoutes.DASHBOARD.GOGO_SHELL} element={<GogoCommandPage/>}/>
        </Route>
      </RoutesWithNotFound>
    </Router>
  );
}

export default AppRoutes;
