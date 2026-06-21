import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Hub from './components/Hub';
import ProjectLanding from './components/ProjectLanding';
import { getProjectBySlug, projects } from './data/projects';

const isGitHubPages = import.meta.env.BASE_URL !== '/';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

function ProjectRoute({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/" replace />;
  return <ProjectLanding project={project} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        {projects.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<ProjectRoute slug={p.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
