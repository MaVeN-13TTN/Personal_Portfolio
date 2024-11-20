// src/utils/imageUtils.js

/**
 * Processes and validates URLs, with special handling for Google Drive links
 * @param {string} url - The URL to process
 * @returns {string} The processed URL or empty string if invalid
 */
export const getDirectImageUrl = (url) => {
  if (!url) {
    console.warn("No URL provided to getDirectImageUrl");
    return "";
  }

  try {
    // Handle Google Drive URLs
    if (url.includes("drive.google.com")) {
      // Remove any parameters and trim whitespace
      const cleanUrl = url.split("?")[0].trim();
      console.log("Clean URL:", cleanUrl);

      // Extract file ID with improved regex
      const fileIdMatch = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        console.log("Extracted File ID:", fileId);

        // Validate file ID format
        if (fileId && fileId.length >= 25 && fileId.length <= 75) {
          return `https://drive.google.com/file/d/${fileId}/preview`;
        } else {
          console.warn("Invalid file ID format:", fileId);
          return "";
        }
      } else {
        console.warn("Could not extract file ID from URL:", url);
        return "";
      }
    }

    // Validate non-Google Drive URLs
    try {
      new URL(url);
      return url;
    } catch (e) {
      console.warn("Invalid URL format:", url);
      return "";
    }
  } catch (error) {
    console.error("Error processing URL:", error);
    return "";
  }
};

/**
 * Validates if a URL is in correct format
 * @param {string} url - The URL to validate
 * @returns {boolean} Whether the URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;

  try {
    // Handle Google Drive URLs
    if (url.includes("drive.google.com")) {
      const cleanUrl = url.split("?")[0].trim();
      const fileIdMatch = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
      return !!(
        fileIdMatch &&
        fileIdMatch[1]?.length >= 25 &&
        fileIdMatch[1]?.length <= 75
      );
    }

    // Validate other URLs
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets a secure version of the URL for iframe usage
 * @param {string} url - The URL to secure
 * @returns {string} The secured URL
 */
export const getSecureUrl = (url) => {
  const directUrl = getDirectImageUrl(url);
  if (!directUrl) return "";

  // For Google Drive, ensure we're using the preview URL
  if (url.includes("drive.google.com") && !url.endsWith("/preview")) {
    const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/)?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : "";
  }

  return directUrl;
};
