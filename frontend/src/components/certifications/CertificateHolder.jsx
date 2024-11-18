import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { getDirectImageUrl } from "../../utils/imageUtils";

const CertificateHolder = ({ certification }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Skip rendering if the URL contains placeholder text
  if (certification.imageUrl.includes("MAVEN_ID")) {
    return null;
  }

  const directUrl = getDirectImageUrl(certification.imageUrl);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-video relative bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-persian-indigo"></div>
          </div>
        )}

        <iframe
          src={directUrl}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          title={certification.name}
          allow="autoplay"
        />
      </div>

      <div className="p-4 bg-gradient-to-r from-persian-indigo to-russian-violet">
        <h3 className="text-lg font-maven-bold text-white mb-1">
          {certification.name}
        </h3>
        <p className="text-sm text-gray-200">{certification.issuer}</p>
      </div>
    </motion.div>
  );
};

CertificateHolder.propTypes = {
  certification: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CertificateHolder;
