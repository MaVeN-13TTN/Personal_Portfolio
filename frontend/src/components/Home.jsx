import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { getHero, getSkills, getProjects } from "../utils/api";
import Card from "./Card";
import ProjectCard from "./ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const DynamicIcon = ({ iconName, size = "1.5em", color = "#ff9e00" }) => {
  const IconComponent = FaIcons[iconName] || SiIcons[iconName];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
};

DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

const Home = () => {
  const { data: heroData, isLoading: heroLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: getHero,
  });

  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="hero flex flex-col md:flex-row items-center justify-between py-16"
        variants={itemVariants}
      >
        <div className="md:w-1/3 mb-8 md:mb-0">
          <Card />
        </div>
        <div className="md:w-2/3 md:pl-12 text-center md:text-left">
          <AnimatePresence mode="wait">
            {heroLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="h-12 bg-persian-indigo rounded-lg animate-pulse" />
                <div className="h-8 bg-persian-indigo rounded-lg animate-pulse w-3/4" />
                <div className="h-6 bg-persian-indigo rounded-lg animate-pulse w-1/2" />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-titan text-princeton-orange mb-4">
                  {heroData?.name}
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-maven text-ut-orange mb-4">
                  {heroData?.title}
                </h2>
                <p className="text-lg sm:text-xl font-maven text-orange-peel mb-8">
                  {heroData?.tagline}
                </p>
                <Link
                  to="/projects"
                  className="bg-pumpkin hover:bg-safety-orange text-russian-violet font-maven 
                         font-bold py-3 px-6 rounded-md transition-smooth inline-block"
                >
                  View My Work
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section className="featured-skills" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8 text-center">
          Featured Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <AnimatePresence mode="wait">
            {skillsLoading ? (
              [...Array(6)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  className="bg-persian-indigo p-4 rounded-lg shadow-lg h-24 animate-pulse"
                />
              ))
            ) : skillsData?.technical ? (
              Object.entries(skillsData.technical)
                .flatMap(([, skills]) => skills)
                .slice(0, 6)
                .map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-persian-indigo p-4 rounded-lg shadow-lg flex flex-col 
                             items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <DynamicIcon iconName={skill.icon} size="2em" />
                    <p className="mt-2 text-center font-maven text-orange-peel text-sm">
                      {skill.name}
                    </p>
                  </motion.div>
                ))
            ) : (
              <p className="text-orange-peel col-span-full text-center">
                No technical skills available
              </p>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section className="highlighted-projects" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8 text-center">
          Highlighted Projects
        </h2>
        <AnimatePresence mode="wait">
          {projectsLoading ? (
            <motion.div
              key="loading"
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(2)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="bg-persian-indigo rounded-lg shadow-lg h-96 animate-pulse"
                />
              ))}
            </motion.div>
          ) : projectsError ? (
            <motion.div
              key="error"
              className="text-pumpkin text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Error loading projects: {projectsError.message}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projectsData?.featured.slice(0, 2).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHomePage={true}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="text-center mt-12" variants={itemVariants}>
          <Link
            to="/projects"
            className="bg-pumpkin hover:bg-safety-orange text-russian-violet 
                     font-maven font-bold py-3 px-6 rounded-md transition-smooth 
                     inline-block"
          >
            View All Projects
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
