import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

interface AppProps {
  renderScene?: React.ComponentProps<typeof HomePage>['renderScene'];
}

export const App: React.FC<AppProps> = ({ renderScene }) => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage renderScene={renderScene} />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
};

export default App;
