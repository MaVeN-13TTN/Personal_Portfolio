/**
 * Formats a date string into a human-readable format
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date
 */
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
