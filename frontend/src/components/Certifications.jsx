import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CertificationCard from "./certifications/CertificationCard";
import CertificationDetail from "./certifications/CertificationDetail";
import CertificateHolder from "./certifications/CertificateHolder";
import { getCertifications, getCertificates } from "../utils/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

const Certifications = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  // Query for badge-style certifications
  const certificationsQuery = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });

  // Query for full image certificates
  const certificatesQuery = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });

  const isLoading =
    certificationsQuery.isLoading || certificatesQuery.isLoading;
  const error = certificationsQuery.error || certificatesQuery.error;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-persian-indigo/5 to-transparent">
        <div className="text-xl text-orange-peel font-maven animate-pulse">
          Loading certifications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-persian-indigo/5 to-transparent">
        <div className="text-xl text-pumpkin font-maven">
          Error: {error.message}
          <pre className="mt-4 text-sm">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  // Ensure we have arrays even if the backend returns null/undefined
  const certifications = certificationsQuery.data || [];
  const certificates = certificatesQuery.data || [];

  return (
    <>
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-titan text-princeton-orange mb-12 text-center">
          Certifications & Achievements
        </h1>

        {/* Badge-style Certifications Section */}
        {certifications.length > 0 && (
          <motion.div variants={containerVariants}>
            <h2 className="text-2xl font-maven text-white mb-8 text-center">
              Professional Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((certification) => (
                <motion.div key={certification.id} variants={itemVariants}>
                  <CertificationCard
                    certification={certification}
                    onClick={setSelectedCertification}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Show message if no certificates are found */}
        {certificates.length === 0 && certifications.length === 0 && (
          <div className="text-center text-gray-600">
            No certifications found.
          </div>
        )}
      </motion.div>

      {/* Detail Modal for Badge-style Certifications */}
      {selectedCertification && (
        <CertificationDetail
          certification={selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}

      {/* Full Image Certificates Section */}
      {certificates.length > 0 && (
        <motion.div className="mb-16" variants={containerVariants}>
          <h2 className="text-2xl font-maven text-white mb-8 text-center">
            Course Certificates
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certificates.map((certificate) => (
              <motion.div key={certificate.id} variants={itemVariants}>
                <CertificateHolder certification={certificate} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Certifications;
