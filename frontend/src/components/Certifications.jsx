import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getCertifications } from "../utils/api";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const DynamicIcon = ({ iconName, size = "3em", color = "#ff9e00" }) => {
  const IconComponent = FaIcons[iconName] || SiIcons[iconName];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
};

DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(date);
};

const CertificationCard = ({ certification }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 cursor-pointer overflow-hidden h-full"
    variants={cardVariants}
    whileHover={{ y: -5 }}
  >
    <div className="bg-gradient-to-r from-persian-indigo to-russian-violet p-4">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto">
        <DynamicIcon iconName={certification.icon} />
      </div>
    </div>
    <div className="p-6 flex flex-col h-[calc(100%-112px)]">
      {" "}
      {/* 112px is the height of the icon section */}
      <h3 className="text-xl font-bold text-persian-indigo mb-2 text-center font-maven line-clamp-2">
        {certification.name}
      </h3>
      <p className="text-gray-600 mb-2 text-center font-maven">
        {certification.issuer}
      </p>
      <div className="text-sm text-gray-500 mb-1 text-center font-maven">
        <span>Issued: {formatDate(certification.date)}</span>
        {certification.expiry && (
          <span className="block italic">
            Expires: {formatDate(certification.expiry)}
          </span>
        )}
      </div>
      <div className="mt-4 flex-grow">
        <h4 className="text-sm font-semibold text-persian-indigo text-center font-maven mb-2">
          Skills & Proficiency
        </h4>
        <div className="relative">
          <p className="text-gray-700 text-center font-maven text-sm line-clamp-4">
            {certification.proficiency}
          </p>
        </div>
      </div>
      {certification.credentialUrl && (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-orange-peel hover:text-amethyst transition-colors duration-300 font-maven flex items-center justify-center"
        >
          View Credential <FaExternalLinkAlt className="ml-2" />
        </a>
      )}
    </div>
  </motion.div>
);

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    expiry: PropTypes.string,
    credentialUrl: PropTypes.string,
    icon: PropTypes.string.isRequired,
    proficiency: PropTypes.string.isRequired,
  }).isRequired,
};

const Certifications = () => {
  const {
    data: certificationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });

  if (isLoading)
    return <div className="text-center text-orange-peel">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-pumpkin">
        An error occurred: {error.message}
      </div>
    );

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl font-titan text-princeton-orange mb-12 text-center">
        Certifications
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificationsData.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
