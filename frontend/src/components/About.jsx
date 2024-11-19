import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo } from "react";
import { getAbout } from "../utils/api";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLightbulb,
  FaBullseye,
} from "react-icons/fa";
import { ErrorBoundary } from "react-error-boundary";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = memo(function Section({
  title,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <motion.section
      className={`section ${className}`}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2 flex items-center">
        {Icon && <Icon className="mr-2" />} {title}
      </h2>
      {children}
    </motion.section>
  );
});

Section.displayName = "Section";
Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-8 bg-persian-indigo/30 rounded w-1/4"></div>
    <div className="space-y-4">
      <div className="h-4 bg-persian-indigo/30 rounded w-full"></div>
      <div className="h-4 bg-persian-indigo/30 rounded w-5/6"></div>
      <div className="h-4 bg-persian-indigo/30 rounded w-4/6"></div>
    </div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="text-center text-pumpkin p-4">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p className="mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="bg-princeton-orange text-russian-violet px-4 py-2 rounded hover:bg-orange-peel transition-colors"
    >
      Try again
    </button>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

const INTERESTS_DATA = [
  { key: "cloudComputing", title: "Cloud Computing", icon: "☁️" },
  { key: "cybersecurity", title: "Cybersecurity", icon: "🔒" },
  {
    key: "artificialIntelligence",
    title: "Artificial Intelligence",
    icon: "🤖",
  },
  { key: "softwareEngineering", title: "Software Engineering", icon: "💻" },
];

const About = () => {
  const {
    data: aboutData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  if (isLoading) return <SkeletonLoader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={refetch}>
      <motion.div
        className="max-w-4xl mx-auto space-y-16 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Section title="About Me">
          <p className="text-lg font-maven text-orange-peel leading-relaxed whitespace-pre-line">
            {aboutData?.bio}
          </p>
        </Section>

        <Section title="Education" icon={FaGraduationCap}>
          <div className="w-full">
            {aboutData?.education.map((edu, index) => (
              <div
                key={index}
                className="bg-persian-indigo p-4 rounded-lg hover:shadow-lg transition-all mb-4 last:mb-0"
              >
                <h3 className="text-xl font-maven text-white">{edu.degree}</h3>
                <p className="text-orange-peel">
                  {edu.institution}, {edu.year}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Professional Journey" icon={FaBriefcase}>
          <div className="w-full">
            {aboutData?.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-persian-indigo p-4 rounded-lg hover:shadow-lg transition-all mb-4 last:mb-0"
              >
                <h3 className="text-xl font-maven text-white">{exp.title}</h3>
                <p className="text-orange-peel">
                  {exp.company}, {exp.duration}
                </p>
                {exp.description && (
                  <p className="text-orange-peel mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Interests" icon={FaLightbulb}>
          <div className="grid md:grid-cols-2 gap-6">
            {INTERESTS_DATA.map((interest, index) => (
              <div
                key={index}
                className="bg-persian-indigo p-6 rounded-lg hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-maven text-white mb-2 flex items-center">
                  <span className="mr-2">{interest.icon}</span> {interest.title}
                </h3>
                <p className="text-orange-peel">
                  {aboutData?.interests[interest.key]}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Goals and Aspirations" icon={FaBullseye}>
          <p className="text-lg font-maven text-orange-peel leading-relaxed">
            {aboutData?.goals}
          </p>
        </Section>
      </motion.div>
    </ErrorBoundary>
  );
};

export default About;
