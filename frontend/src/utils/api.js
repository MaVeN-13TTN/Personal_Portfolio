import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

// Hero section
export const getHero = async () => {
  const response = await api.get("/hero");
  return response.data;
};

// About section
export const getAbout = async () => {
  const response = await api.get("/about");
  return response.data;
};

// Skills section
export const getSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

// Projects section
export const getProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Projects not found");
    }
    throw new Error("Failed to fetch projects");
  }
};

export const getProjectDetails = async (id) => {
  try {
    if (!id) throw new Error("Project ID is required");
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Project with ID ${id} not found`);
    }
    throw new Error("Failed to fetch project details");
  }
};

export const getProjectsByCategory = async (category) => {
  try {
    const response = await api.get(`/projects/category/${category}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`No projects found in category: ${category}`);
    }
    throw new Error("Failed to fetch projects by category");
  }
};

export const getProjectsByType = async (type) => {
  try {
    const response = await api.get(`/projects/type/${type}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`No ${type} projects found`);
    }
    throw new Error("Failed to fetch projects by type");
  }
};

export const getFeaturedProjects = async () => {
  try {
    const response = await api.get("/projects/featured");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("No featured projects found");
    }
    throw new Error("Failed to fetch featured projects");
  }
};

// Certifications section
export const getCertifications = async () => {
  const response = await api.get("/certifications");
  return response.data;
};

// Resume section
export const getResume = async () => {
  const response = await api.get("/resume");
  return response.data;
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside of 2xx range
    switch (error.response.status) {
      case 400:
        return "Bad request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in.";
      case 403:
        return "Forbidden. You don't have permission to access this resource.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Internal server error. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  } else if (error.request) {
    // Request was made but no response received
    return "No response received from server. Please check your connection.";
  } else {
    // Something else happened while setting up the request
    return "An error occurred. Please try again.";
  }
};
