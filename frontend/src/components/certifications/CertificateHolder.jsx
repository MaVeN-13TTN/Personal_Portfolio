import { useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { getDirectImageUrl } from "../../utils/imageUtils";
import Certificate from "./Certificate";

const CertificateHolder = ({ certification }) => {
  const isValidCertification = useMemo(
    () => !certification.imageUrl.includes("T1TAN_ID"),
    [certification.imageUrl]
  );

  const directUrl = useMemo(() => {
    if (!isValidCertification) return null;
    try {
      return getDirectImageUrl(certification.imageUrl);
    } catch (error) {
      console.error("Error processing image URL:", error);
      return null;
    }
  }, [certification.imageUrl, isValidCertification]);

  if (!isValidCertification || !directUrl) {
    return null;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Certificate
        certification={certification}
        directUrl={directUrl}
        verificationUrl={certification.verificationUrl}
      />

      <div className="p-4 bg-gradient-to-r from-persian-indigo to-russian-violet">
        <h4 className="text-xl font-bold text-white mb-1 font-maven">
          {certification.name}
        </h4>
        <p className="text-sm text-gray-200">{certification.issuer}</p>
        {certification.description && (
          <p className="text-sm text-gray-300 mt-2">
            {certification.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

CertificateHolder.propTypes = {
  certification: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    verificationUrl: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CertificateHolder;
