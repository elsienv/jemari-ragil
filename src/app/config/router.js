import { BrowserRouter, HashRouter } from 'react-router-dom';

export const AppRouter = import.meta.env?.MODE === 'github-pages' ? HashRouter : BrowserRouter;
