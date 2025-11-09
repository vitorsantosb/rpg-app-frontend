import { Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';

import NoPage from '@/components/NoPage/NoPage.jsx';
import { appRoutes } from '@/models/routes.ts';

type RoutesWithNotFoundProps = {
  children?: ReactNode;
};

function RoutesWithNotFound({ children }: RoutesWithNotFoundProps) {
  return (
    <Routes>
      {children}
      <Route path={appRoutes.NOT_FOUND} element={<NoPage />} />
    </Routes>
  );
}

export default RoutesWithNotFound;

