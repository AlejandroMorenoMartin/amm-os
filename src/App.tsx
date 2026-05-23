import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Shell } from './components/shell/Shell';
import { BootPage } from './components/pages/BootPage';
import { OnboardingPage } from './components/pages/OnboardingPage';
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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<1 | 2>(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useArcadeControls();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  function handleBootComplete() {
    completeBoot();
    setShowOnboarding(true);
  }

  function handleOnboardingComplete(path: string) {
    setShowOnboarding(false);
    navigate(path);
  }

  if (!bootDone) {
    return (
      <Shell hideCtrl hideBottomBar>
        <BootPage onComplete={handleBootComplete} />
      </Shell>
    );
  }

  if (showOnboarding) {
    return (
      <Shell hideCtrl={onboardingStep === 1} hideBottomBar>
        <OnboardingPage
          onComplete={handleOnboardingComplete}
          onStepChange={setOnboardingStep}
        />
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
