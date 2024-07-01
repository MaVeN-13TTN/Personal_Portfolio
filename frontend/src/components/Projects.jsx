import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../utils/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const projectVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const ProjectCard = ({ project }) => (
  <motion.div
    className="bg-persian-indigo rounded-lg shadow-lg overflow-hidden"
    variants={projectVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="p-6">
      <h3 className="text-xl font-titan text-orange-peel mb-3 leading-tight">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-4 font-maven text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-russian-violet text-orange-peel px-2 py-1 rounded-full text-xs font-maven"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-end">
        <Link
          to={`/projects/${project.id}`}
          className="text-princeton-orange hover:text-orange-peel transition-colors duration-300 font-maven text-sm font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading)
    return (
      <div className="text-center text-orange-peel font-maven text-lg">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-pumpkin font-maven text-lg">
        An error occurred: {error.message}
      </div>
    );

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl md:text-5xl font-titan text-princeton-orange mb-16 text-center leading-tight">
        My Projects
      </h1>

      <motion.section className="mb-20" variants={projectVariants}>
        <h2 className="text-2xl md:text-3xl font-titan text-orange-peel mb-8 leading-tight">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      {Object.entries(projectsData.categories).map(([category, projects]) => (
        <motion.section
          key={category}
          className="mb-20"
          variants={projectVariants}
        >
          <h2 className="text-2xl md:text-3xl font-titan text-orange-peel mb-8 leading-tight">
            {category}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default Projects;
