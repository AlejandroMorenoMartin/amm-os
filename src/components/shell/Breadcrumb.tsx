import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { projects } from '../../data/projects';
import { useAppStore } from '../../store/useAppStore';

export function Breadcrumb() {
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { toggleProject, expandedProject } = useAppStore();
  const navigate = useNavigate();

  if (!pathname.startsWith('/projects/') || !slug) return null;

  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    if (expandedProject !== slug) {
      toggleProject(slug!);
    }
    navigate('/projects');
  }

  return (
    <div className="text-txt-base font-mono flex items-center gap-1">
      <a href="/projects" onClick={handleBack} className="link-internal text-txt-base">
        /projects
      </a>
      <span> /{project.name}</span>
    </div>
  );
}
