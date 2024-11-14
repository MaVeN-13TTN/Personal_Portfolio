import { useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useFilters } from "../hooks/useFilters";

const ProjectFilters = ({ projects }) => {
  const { filters: contextFilters, updateFilter, clearFilters } = useFilters();

  const filterOptions = useMemo(() => {
    const options = {
      technologies: new Set(),
      status: new Set(),
      difficulty: new Set(),
    };

    const allProjects = [
      ...projects.featured,
      ...Object.values(projects.categories).flat(),
    ];

    allProjects.forEach((project) => {
      project.technologies.forEach((tech) => options.technologies.add(tech));
      options.status.add(project.status);
      options.difficulty.add(project.difficulty);
    });

    return {
      technologies: Array.from(options.technologies).sort(),
      status: Array.from(options.status).sort(),
      difficulty: Array.from(options.difficulty).sort(),
    };
  }, [projects]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-russian-violet p-6 rounded-lg shadow-lg mb-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-titan text-orange-peel">
          Filter Projects
        </h2>
        {Object.values(contextFilters).some(
          (value) => value && (Array.isArray(value) ? value.length > 0 : true)
        ) && (
          <button
            onClick={clearFilters}
            className="text-princeton-orange hover:text-orange-peel 
                     transition-colors flex items-center gap-2"
          >
            <FaTimes /> Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filter Selects Container */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-orange-peel text-sm font-maven">
            Project Type
          </label>
          <select
            value={contextFilters.projectType}
            onChange={(e) => updateFilter("projectType", e.target.value)}
            className="bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                     border border-orange-peel focus:outline-none focus:ring-2 
                     focus:ring-princeton-orange w-full"
          >
            <option value="">All Project Type</option>
            {["solo", "team"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-orange-peel text-sm font-maven">
            Technologies
          </label>
          <select
            value={contextFilters.technologies}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              updateFilter("technologies", values);
            }}
            multiple={false} // Changed to false for consistent height
            className="bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                     border border-orange-peel focus:outline-none focus:ring-2 
                     focus:ring-princeton-orange w-full"
          >
            <option value="">All Technologies</option>
            {filterOptions.technologies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-orange-peel text-sm font-maven">Status</label>
          <select
            value={contextFilters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                     border border-orange-peel focus:outline-none focus:ring-2 
                     focus:ring-princeton-orange w-full"
          >
            <option value="">All Status</option>
            {filterOptions.status.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-orange-peel text-sm font-maven">
            Difficulty
          </label>
          <select
            value={contextFilters.difficulty}
            onChange={(e) => updateFilter("difficulty", e.target.value)}
            className="bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                     border border-orange-peel focus:outline-none focus:ring-2 
                     focus:ring-princeton-orange w-full"
          >
            <option value="">All Difficulty</option>
            {filterOptions.difficulty.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mt-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={contextFilters.searchQuery}
          onChange={(e) => updateFilter("searchQuery", e.target.value)}
          className="w-full bg-persian-indigo text-gray-300 rounded-lg pl-10 pr-4 py-2 h-10
                   border border-orange-peel focus:outline-none focus:ring-2 
                   focus:ring-princeton-orange"
        />
      </div>
    </motion.div>
  );
};

ProjectFilters.propTypes = {
  projects: PropTypes.shape({
    featured: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
      .isRequired,
  }).isRequired,
};

export default ProjectFilters;
