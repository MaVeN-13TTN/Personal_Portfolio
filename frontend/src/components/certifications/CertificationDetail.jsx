import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CertificationBadge from "./CertificationBadge";
import SkillTag from "../shared/SkillTag";

const CertificationDetail = ({ certification, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-persian-indigo/50 flex items-center justify-center z-50 p-4">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certification-title"
      >
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8">
          <div className="bg-gradient-to-b from-persian-indigo to-russian-violet p-8 flex justify-center items-start rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
            <div className="w-64 h-64">
              <CertificationBadge
                badgeUrl={certification.badgeUrl}
                name={certification.name}
              />
            </div>
          </div>

          <div className="p-8 pr-12">
            <h2
              id="certification-title"
              className="text-[28px] font-bold text-persian-indigo mb-2 font-maven"
            >
              {certification.name}
            </h2>

            <p className="text-gray-700 mb-4 font-maven">
              Issued by{" "}
              <span className="text-orange-peel">{certification.issuer}</span>
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed font-maven">
              {certification.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-persian-indigo/10 rounded-md">
                <svg
                  className="w-4 h-4 mr-2 text-persian-indigo"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-persian-indigo font-maven">
                  Certification
                </span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-orange-peel/10 rounded-md">
                <svg
                  className="w-4 h-4 mr-2 text-orange-peel"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-sm font-medium text-orange-peel font-maven">
                  Intermediate
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-persian-indigo font-maven">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-persian-indigo font-maven">
                Earning Criteria
              </h3>
              {certification.earningCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-3 mb-2">
                  <svg
                    className="w-5 h-5 text-orange-peel mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-700 leading-relaxed font-maven">
                    {criteria}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-persian-indigo/10 rounded-full transition-colors duration-200 group"
          aria-label="Close dialog"
        >
          <svg
            className="w-6 h-6 text-persian-indigo group-hover:text-orange-peel transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

CertificationDetail.propTypes = {
  certification: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    badgeUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    earningCriteria: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CertificationDetail;
