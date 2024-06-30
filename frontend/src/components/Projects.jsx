import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProjects } from "../utils/api";
import PropTypes from "prop-types";

const ProjectCard = ({ project }) => (
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
    <p className="mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map((tech, index) => (
        <span
          key={index}
          className="bg-orangePeel text-white px-2 py-1 rounded-full text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
    <Link
      to={`/projects/${project.id}`}
      className="text-pumpkin hover:text-safetyOrange"
    >
      View Details
    </Link>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Projects = () => {
  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="space-y-8">
      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="all-projects">
        <h2>All Projects</h2>
        {Object.entries(projectsData.categories).map(([category, projects]) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{category} Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;
