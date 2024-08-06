import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getSkills } from "../utils/api";
import PropTypes from "prop-types";
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

DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

const SkillCategory = ({ title, skills }) => (
  <motion.div className="mb-8" variants={itemVariants}>
    <h3 className="text-xl font-maven text-ut-orange mb-4">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="bg-persian-indigo p-3 rounded-lg shadow-md flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DynamicIcon iconName={skill.icon} />
          <p className="font-maven text-orange-peel ml-2">{skill.name}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Skills = () => {
  const {
    data: skillsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
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
      className="space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section className="technical-skills" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8">
          Technical Skills
        </h2>
        {[
          "Programming",
          "Frontend",
          "Backend",
          "Scripting",
          "Cloud",
          "Cybersecurity",
          "Databases",
          "DevOps",
        ].map((category) => (
          <SkillCategory
            key={category}
            title={`${category} ${
              category === "Programming" ? "Languages" : "Technologies"
            }`}
            skills={skillsData?.technical[category.toLowerCase()] || []}
          />
        ))}
      </motion.section>

      <motion.section className="soft-skills" variants={itemVariants}>
        <h2 className="text-3xl font-titan text-princeton-orange mb-8">
          Soft Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData?.soft.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-persian-indigo p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-2">
                <DynamicIcon iconName={skill.icon} />
                <h3 className="text-xl font-maven text-ut-orange ml-2">
                  {skill.name}
                </h3>
              </div>
              <p className="font-maven text-orange-peel">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Skills;
