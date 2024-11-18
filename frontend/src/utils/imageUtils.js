export const getDirectImageUrl = (url) => {
  if (!url) {
    console.warn("No URL provided to getDirectImageUrl");
    return "";
  }

  try {
    // Handle Google Drive URLs
    if (url.includes("drive.google.com")) {
      // Remove any parameters
      const cleanUrl = url.split("?")[0];
      console.log("Clean URL:", cleanUrl);

      // Extract file ID
      const fileIdMatch = cleanUrl.match(/\/d\/([^/]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        console.log("Extracted File ID:", fileId);

        // Create direct URL - using correct format
        return `https://drive.google.com/file/d/${fileId}/preview`;
      } else {
        console.warn("Could not extract file ID from URL:", url);
      }
    }
    return url;
  } catch (error) {
    console.error("Error processing URL:", error);
    return url;
  }
};
