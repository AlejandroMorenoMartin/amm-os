import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Shell } from './components/shell/Shell';
import { BootPage } from './components/pages/BootPage';
import { HomePage } from './components/pages/HomePage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ResumePage } from './components/pages/ResumePage';
import { SkillsPage } from './components/pages/SkillsPage';
import { ProjectPage } from './components/pages/ProjectPage';
import { ImageModal } from './components/ui/ImageModal';
import { useAppStore } from './store/useAppStore';
import { useArcadeControls } from './hooks/useArcadeControls';

function AppRoutes() {
  const { bootDone, completeBoot } = useAppStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useArcadeControls();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  if (!bootDone) {
    return (
      <Shell>
        <BootPage onComplete={() => { completeBoot(); navigate('/'); }} />
      </Shell>
    );
  }

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}

export default function App() {
  return (
    <>
      <AppRoutes />
      <ImageModal />
    </>
  );
}
