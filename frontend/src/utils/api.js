import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple cache implementation
const cache = new Map();

const getCachedData = (key) => {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

// Error handler
export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data.error || "Bad request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in.";
      case 403:
        return "Forbidden. You don't have permission to access this resource.";
      case 404:
        return data.error || "Resource not found.";
      case 500:
        return "Internal server error. Please try again later.";
      default:
        return data.error || "An error occurred. Please try again.";
    }
  } else if (error.request) {
    return "No response received from server. Please check your connection.";
  }
  return "An error occurred. Please try again.";
};

// API Functions
export const getHero = async () => {
  try {
    const cachedData = getCachedData("hero");
    if (cachedData) return cachedData;

    const response = await api.get("/hero");
    setCachedData("hero", response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getAbout = async () => {
  try {
    const cachedData = getCachedData("about");
    if (cachedData) return cachedData;

    const response = await api.get("/about");
    setCachedData("about", response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getSkills = async () => {
  try {
    const cachedData = getCachedData("skills");
    if (cachedData) return cachedData;

    const response = await api.get("/skills");
    const skillsData = response.data;

    if (!skillsData.technical || !skillsData.soft) {
      throw new Error("Invalid skills data structure");
    }

    setCachedData("skills", skillsData);
    return skillsData;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProjects = async () => {
  try {
    const cachedData = getCachedData("projects");
    if (cachedData) return cachedData;

    const response = await api.get("/projects");
    setCachedData("projects", response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProjectDetails = async (id) => {
  try {
    if (!id) throw new Error("Project ID is required");
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProjectsByCategory = async (category) => {
  try {
    const response = await api.get(`/projects/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getFeaturedProjects = async () => {
  try {
    const response = await api.get("/projects/featured");
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getCertifications = async () => {
  try {
    const cachedData = getCachedData("certifications");
    if (cachedData) return cachedData;

    const response = await api.get("/certifications");
    const certifications = response.data.map((cert) => ({
      ...cert,
      badgeUrl: cert.badgeUrl || "placeholder-badge.png",
      skills: Array.isArray(cert.skills) ? cert.skills : [],
      earningCriteria: Array.isArray(cert.earningCriteria)
        ? cert.earningCriteria
        : [`Successfully passed the ${cert.name} exam`],
    }));

    setCachedData("certifications", certifications);
    return certifications;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getCertificates = async () => {
  try {
    const cachedData = getCachedData("certificates");
    if (cachedData) return cachedData;

    const response = await api.get("/certificates");
    const certificates = response.data.map((cert) => ({
      ...cert,
      skills: Array.isArray(cert.skills) ? cert.skills : [],
      description: cert.description || `Completed ${cert.name}`,
    }));

    setCachedData("certificates", certificates);
    return certificates;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getResume = async () => {
  try {
    const cachedData = getCachedData("resume");
    if (cachedData) return cachedData;

    const response = await api.get("/resume");
    setCachedData("resume", response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
