import { Route, Routes } from 'react-router-dom';
import StorefrontLayout from '../../layouts/StorefrontLayout';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import { routes } from '../config/routes';
import { usePageEffects } from '../hooks/usePageEffects';

export function AppRoutes() {
  usePageEffects();

  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
