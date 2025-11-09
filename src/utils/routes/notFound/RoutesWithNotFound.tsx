import { Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';

import NoPage from '@/components/NoPage/NoPage.jsx';
import { userRoutes } from '@/models/routes.ts';

type RoutesWithNotFoundProps = {
  children?: ReactNode;
};

function RoutesWithNotFound({ children }: RoutesWithNotFoundProps) {
  return (
    <Routes>
      {children}
      <Route path={userRoutes.NOT_FOUND} element={<NoPage />} />
    </Routes>
  );
}

export default RoutesWithNotFound;

