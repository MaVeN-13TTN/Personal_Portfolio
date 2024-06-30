import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../utils/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectDetails(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-6">{project.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-orangePeel text-white px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {project.demoUrl && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Live Demo</h2>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pumpkin hover:text-safetyOrange"
          >
            View Live Demo
          </a>
        </div>
      )}

      {project.githubUrl && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Source Code</h2>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pumpkin hover:text-safetyOrange"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
