import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectDetails } from "../utils/api";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

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

  if (isLoading)
    return (
      <div className="text-center text-orange-peel font-maven">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-pumpkin font-maven">
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
      <Link
        to="/projects"
        className="inline-flex items-center text-orange-peel hover:text-princeton-orange mb-8 font-maven"
      >
        <FaChevronLeft className="mr-2" /> Back to Projects
      </Link>

      <motion.h1
        className="text-5xl font-titan text-princeton-orange mb-8"
        variants={itemVariants}
      >
        {project.title}
      </motion.h1>

      <motion.div
        className="bg-persian-indigo rounded-lg shadow-lg p-8 mb-12"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-titan text-orange-peel mb-6">
          Project Overview
        </h2>
        <p className="text-gray-300 mb-6 font-maven leading-relaxed">
          {project.description}
        </p>

        <h3 className="text-2xl font-titan text-orange-peel mb-4">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-russian-violet text-orange-peel px-3 py-1 rounded-full font-maven text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-titan text-orange-peel mb-4">
          Key Features
        </h3>
        <ul className="list-disc list-inside text-gray-300 mb-6 font-maven">
          {project.features.map((feature, index) => (
            <li key={index} className="mb-2">
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex space-x-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-peel hover:text-princeton-orange font-maven"
            >
              <FaGithub className="mr-2" /> View on GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-peel hover:text-princeton-orange font-maven"
            >
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
