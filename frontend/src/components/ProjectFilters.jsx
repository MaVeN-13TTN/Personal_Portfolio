import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useFilters } from "../hooks/useFilters";

// Active Filter Badge Component

const ActiveFilterBadge = ({ label, value, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-persian-indigo px-2 py-1 rounded-full text-xs">
    <span className="text-orange-peel">{label}:</span>
    <span className="text-gray-300">{value}</span>
    <button
      onClick={onRemove}
      className="text-princeton-orange hover:text-orange-peel ml-1"
      aria-label={`Remove ${label} filter`}
    >
      <FaTimes size={12} />
    </button>
  </span>
);
ActiveFilterBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const ProjectFilters = ({ projects, isLoading = false }) => {
  const { filters: contextFilters, updateFilter, clearFilters } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Get active filters count
  const activeFiltersCount = Object.entries(contextFilters).reduce(
    (count, [key, value]) => {
      if (value && key !== "searchQuery") {
        return count + 1;
      }
      return count;
    },
    0
  );

  const LoadingOverlay = () => (
    <div
      className="absolute inset-0 bg-russian-violet/50 backdrop-blur-sm 
                    rounded-lg flex items-center justify-center z-10"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-peel"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-russian-violet p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8 w-full relative"
    >
      {isLoading && <LoadingOverlay />}

      {/* Mobile Toggle Header */}
      <div className="flex sm:hidden items-center justify-between w-full mb-4">
        <h2 className="text-xl font-titan text-orange-peel">
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-orange-peel hover:text-princeton-orange transition-colors"
          aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
        >
          {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex justify-between items-center mb-4">
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
            <FaTimes /> Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(contextFilters).map(([key, value]) => {
            if (value && key !== "searchQuery") {
              return (
                <ActiveFilterBadge
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onRemove={() => updateFilter(key, "")}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Collapsible Content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 640) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Project Type Filter */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-orange-peel text-xs sm:text-sm font-maven">
                  Project Type
                </label>
                <select
                  value={contextFilters.projectType}
                  onChange={(e) => updateFilter("projectType", e.target.value)}
                  className={`bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                           border focus:outline-none focus:ring-2 
                           focus:ring-princeton-orange w-full text-sm sm:text-base
                           ${
                             contextFilters.projectType
                               ? "border-orange-peel"
                               : "border-gray-600"
                           }`}
                  aria-label="Filter by project type"
                  disabled={isLoading}
                >
                  <option value="">All Project Types</option>
                  {["solo", "team"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Technologies Filter */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-orange-peel text-xs sm:text-sm font-maven">
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
                  className={`bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                           border focus:outline-none focus:ring-2 
                           focus:ring-princeton-orange w-full text-sm sm:text-base
                           ${
                             contextFilters.technologies
                               ? "border-orange-peel"
                               : "border-gray-600"
                           }`}
                  aria-label="Filter by technologies"
                  disabled={isLoading}
                >
                  <option value="">All Technologies</option>
                  {filterOptions.technologies.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-orange-peel text-xs sm:text-sm font-maven">
                  Status
                </label>
                <select
                  value={contextFilters.status}
                  onChange={(e) => updateFilter("status", e.target.value)}
                  className={`bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                           border focus:outline-none focus:ring-2 
                           focus:ring-princeton-orange w-full text-sm sm:text-base
                           ${
                             contextFilters.status
                               ? "border-orange-peel"
                               : "border-gray-600"
                           }`}
                  aria-label="Filter by status"
                  disabled={isLoading}
                >
                  <option value="">All Status</option>
                  {filterOptions.status.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-orange-peel text-xs sm:text-sm font-maven">
                  Difficulty
                </label>
                <select
                  value={contextFilters.difficulty}
                  onChange={(e) => updateFilter("difficulty", e.target.value)}
                  className={`bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10
                           border focus:outline-none focus:ring-2 
                           focus:ring-princeton-orange w-full text-sm sm:text-base
                           ${
                             contextFilters.difficulty
                               ? "border-orange-peel"
                               : "border-gray-600"
                           }`}
                  aria-label="Filter by difficulty"
                  disabled={isLoading}
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
                className={`w-full bg-persian-indigo text-gray-300 rounded-lg pl-10 pr-4 py-2 h-10
                         border focus:outline-none focus:ring-2 
                         focus:ring-princeton-orange text-sm sm:text-base
                         ${
                           contextFilters.searchQuery
                             ? "border-orange-peel"
                             : "border-gray-600"
                         }`}
                aria-label="Search projects"
                role="searchbox"
                disabled={isLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

ProjectFilters.propTypes = {
  projects: PropTypes.shape({
    featured: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
      .isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
};

export default ProjectFilters;
