import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

// Create and export the context (needed for useFilters hook)
const FilterContext = createContext(undefined);

// Initial filter state
const initialFilterState = {
  projectType: "",
  technologies: [],
  status: "",
  difficulty: "",
  searchQuery: "",
};

const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilterState);

  const updateFilter = useCallback((filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const contextValue = {
    filters,
    updateFilter,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Default export for the Provider component
export default FilterProvider;

// Named export for the context (needed for useFilters hook)
export { FilterContext };
