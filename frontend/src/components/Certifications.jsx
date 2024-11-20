import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CertificationCard from "./certifications/CertificationCard";
import CertificationDetail from "./certifications/CertificationDetail";
import CertificateHolder from "./certifications/CertificateHolder";
import { getCertifications, getCertificates } from "../utils/api";
import { containerVariants, itemVariants } from "../utils/animationVariants";

// Separate LoadingState component
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-persian-indigo/5 to-transparent">
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl text-orange-peel font-maven">
        Loading certifications...
      </div>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-peel" />
    </div>
  </div>
);

// Separate ErrorState component with PropTypes
const ErrorState = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-persian-indigo/5 to-transparent">
    <div className="text-center">
      <div className="text-xl text-pumpkin font-maven mb-4">
        Error loading certifications
      </div>
      <div className="text-sm text-gray-400">
        {error?.message || "An unknown error occurred"}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-persian-indigo text-white rounded hover:bg-persian-indigo/90 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

ErrorState.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

ErrorState.defaultProps = {
  error: {
    message: "An unknown error occurred",
  },
};

const Certifications = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  // Query for badge-style certifications with enabled retry
  const certificationsQuery = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for full image certificates
  const certificatesQuery = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize loading and error states
  const isLoading = useMemo(
    () => certificationsQuery.isLoading || certificatesQuery.isLoading,
    [certificationsQuery.isLoading, certificatesQuery.isLoading]
  );

  const error = useMemo(
    () => certificationsQuery.error || certificatesQuery.error,
    [certificationsQuery.error, certificatesQuery.error]
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  // Ensure we have arrays even if the backend returns null/undefined
  const certifications = certificationsQuery.data || [];
  const certificates = certificatesQuery.data || [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-4xl font-titan text-princeton-orange mb-12 text-center">
          Certifications & Achievements
        </h1>

        {/* Badge-style Certifications Section */}
        {certifications.length > 0 && (
          <motion.section variants={containerVariants} className="mb-16">
            <h2 className="text-2xl font-maven text-white mb-8 text-center">
              Professional Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((certification) => (
                <motion.div
                  key={certification.id}
                  variants={itemVariants}
                  layout
                >
                  <CertificationCard
                    certification={certification}
                    onClick={setSelectedCertification}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Full Image Certificates Section */}
        {certificates.length > 0 && (
          <motion.section className="mb-16" variants={containerVariants}>
            <h2 className="text-2xl font-maven text-white mb-8 text-center">
              Course Certificates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {certificates.map((certificate) => (
                <motion.div key={certificate.id} variants={itemVariants} layout>
                  <CertificateHolder certification={certificate} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Show message if no certificates are found */}
        {certificates.length === 0 && certifications.length === 0 && (
          <motion.div
            className="text-center text-gray-400 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No certifications found at the moment.
            <br />
            Please check back later.
          </motion.div>
        )}

        {/* Detail Modal for Badge-style Certifications */}
        <AnimatePresence>
          {selectedCertification && (
            <CertificationDetail
              certification={selectedCertification}
              onClose={() => setSelectedCertification(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Certifications;
