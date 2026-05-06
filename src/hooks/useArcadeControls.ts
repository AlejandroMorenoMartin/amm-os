import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { projects } from '../data/projects';

const PAGE_ORDER = ['/', '/projects', '/about', '/resume'];

export function useArcadeControls() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { focusIndex, expandedProject, toggleProject, setFocus, imageModal } = useAppStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (imageModal) return;

      const isProjectDetail = pathname.startsWith('/projects/');
      const slug = isProjectDetail ? pathname.split('/projects/')[1] : null;

      // En ProjectPage, las flechas y Escape se comportan como si estuvieras en /projects
      const effectivePath = isProjectDetail ? '/projects' : pathname;
      const currentIdx = PAGE_ORDER.indexOf(effectivePath);
      const N = PAGE_ORDER.length;

      switch (e.key) {
        case 'ArrowLeft': {
          e.preventDefault();
          navigate(PAGE_ORDER[(currentIdx - 1 + N) % N]);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          navigate(PAGE_ORDER[(currentIdx + 1) % N]);
          break;
        }
        case 'Enter': {
          if (pathname === '/projects' && focusIndex >= 0) {
            e.preventDefault();
            toggleProject(projects[focusIndex].slug);
          }
          break;
        }
        case 'Escape': {
          if (isProjectDetail && slug) {
            // Replicar el comportamiento del Breadcrumb: expandir si no lo está, luego navegar
            e.preventDefault();
            const projectIdx = projects.findIndex((p) => p.slug === slug);
            setFocus(projectIdx);
            if (expandedProject !== slug) {
              toggleProject(slug);
            }
            navigate('/projects');
          } else if (expandedProject) {
            e.preventDefault();
            toggleProject(expandedProject);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pathname, focusIndex, expandedProject, imageModal, navigate, toggleProject, setFocus]);
}
