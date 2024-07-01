import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getHero, getSkills, getProjects } from "../utils/api";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import Card from "./Card";

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const DynamicIcon = ({ iconName, size = "1.5em", color = "#ff9e00" }) => {
  const IconComponent = FaIcons[iconName] || SiIcons[iconName];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
};

const Home = () => {
  const { data: heroData } = useQuery({ queryKey: ["hero"], queryFn: getHero });
  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
  const { data: projectsData } = useQuery({
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
      <motion.section
        className="hero flex flex-col md:flex-row items-center justify-between py-16"
        variants={itemVariants}
      >
        <div className="md:w-1/3 mb-8 md:mb-0">
          <Card />
        </div>
        <div className="md:w-2/3 md:pl-12 text-center md:text-left">
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
            className="bg-pumpkin hover:bg-safety-orange text-russian-violet font-maven font-bold py-3 px-6 rounded-md transition-smooth inline-block"
          >
            View My Work
          </Link>
        </div>
      </motion.section>

      <motion.section className="featured-skills" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8 text-center">
          Featured Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {skillsData && skillsData.technical ? (
            Object.entries(skillsData.technical)
              .flatMap(([category, skills]) => skills)
              .slice(0, 6)
              .map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-persian-indigo p-4 rounded-lg shadow-lg flex flex-col items-center justify-center"
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
        </div>
      </motion.section>

      <motion.section className="highlighted-projects" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8 text-center">
          Highlighted Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData?.featured.slice(0, 3).map((project) => (
            <motion.div
              key={project.id}
              className="bg-persian-indigo p-6 rounded-lg shadow-lg flex flex-col justify-between"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <h3 className="text-xl font-maven text-ut-orange mb-2">
                  {project.title}
                </h3>
                <p className="mb-4 font-maven text-orange-peel">
                  {project.description}
                </p>
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="text-pumpkin hover:text-safety-orange font-maven transition-smooth mt-4 inline-block"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
