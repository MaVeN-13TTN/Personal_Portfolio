import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../utils/api";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilters from "./projects/ProjectFilters";
import { useFilters } from "../hooks/useFilters";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
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

  const { filters } = useFilters();

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    if (!projectsData) return [];

    // Combine all projects
    let projects = [
      ...projectsData.featured,
      ...Object.values(projectsData.categories).flat(),
    ];

    // Apply filters
    return projects.filter((project) => {
      // Project Type Filter
      if (filters.projectType && project.team.type !== filters.projectType) {
        return false;
      }

      // Technologies Filter
      if (
        filters.technologies.length > 0 &&
        !filters.technologies.some((tech) =>
          project.technologies.includes(tech)
        )
      ) {
        return false;
      }

      // Status Filter
      if (filters.status && project.status !== filters.status) {
        return false;
      }

      // Difficulty Filter
      if (filters.difficulty && project.difficulty !== filters.difficulty) {
        return false;
      }

      // Search Query
      if (filters.searchQuery) {
        const search = filters.searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(search)
          )
        );
      }

      return true;
    });
  }, [projectsData, filters]);

  if (isLoading) {
    return (
      <div className="text-center text-orange-peel font-maven text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-pumpkin font-maven text-lg">
        An error occurred: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1
        className="text-4xl md:text-5xl font-titan text-princeton-orange 
                   mb-16 text-center leading-tight"
      >
        My Projects
      </h1>

      <ProjectFilters projects={projectsData} />

      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-titan text-orange-peel mb-4">
              No Projects Found
            </h3>
            <p className="text-gray-300 font-maven">
              Try adjusting your filters to see more projects.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
