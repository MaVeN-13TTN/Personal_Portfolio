import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import CertificationBadge from "./CertificationBadge";

const CertificationCard = ({ certification, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Issued ${date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    })}`;
  };

  const handleVerifyClick = (e) => {
    e.stopPropagation();
    window.open(certification.credentialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform cursor-pointer relative group overflow-hidden"
      onClick={() => onClick(certification)}
      whileHover={{ y: -5 }}
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-persian-indigo to-russian-violet p-4">
        <div className="w-40 h-40 mx-auto">
          <CertificationBadge
            badgeUrl={certification.badgeUrl}
            name={certification.name}
          />
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-persian-indigo mb-2 line-clamp-2 font-maven">
          {certification.name}
        </h3>
        <p className="text-gray-600 mb-2 font-maven">{certification.issuer}</p>
        {certification.credentialUrl && (
          <motion.button
            onClick={handleVerifyClick}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 mb-2 text-xs font-medium text-orange-peel hover:text-amethyst bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-300 group relative font-maven"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Verify certification"
          >
            <FaCheckCircle className="w-3 h-3" />
            Verify Credential
            <FaExternalLinkAlt className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-persian-indigo text-orange-peel text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none font-maven">
              Click to verify on issuer&apos;s website
            </span>
          </motion.button>
        )}
        <p className="text-gray-500 text-sm font-maven">
          {formatDate(certification.date)}
        </p>
      </div>

      {/* Expiry Badge - Only show if expiry exists */}
      {certification.expiry && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-princeton-orange bg-opacity-20 rounded-full">
          <p className="text-xs text-orange-peel font-maven">
            Expires: {new Date(certification.expiry).toLocaleDateString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    expiry: PropTypes.string,
    badgeUrl: PropTypes.string.isRequired,
    credentialUrl: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CertificationCard;
