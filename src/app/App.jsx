import { AppRouter } from './config/router';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </AppRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
