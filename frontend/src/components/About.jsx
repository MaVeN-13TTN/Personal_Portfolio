import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getAbout } from "../utils/api";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLightbulb,
  FaBullseye,
} from "react-icons/fa";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
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
    <div className="max-w-4xl mx-auto space-y-16 px-4">
      <motion.section
        className="personal-bio"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2">
          About Me
        </h2>
        <p className="text-lg font-maven text-orange-peel leading-relaxed whitespace-pre-line">
          {aboutData?.bio}
        </p>
      </motion.section>

      <motion.section
        className="education"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2 flex items-center">
          <FaGraduationCap className="mr-2" /> Education
        </h2>
        {aboutData?.education.map((edu, index) => (
          <div key={index} className="mb-4 bg-persian-indigo p-4 rounded-lg">
            <h3 className="text-xl font-maven text-ut-orange">{edu.degree}</h3>
            <p className="text-orange-peel">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="professional-journey"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2 flex items-center">
          <FaBriefcase className="mr-2" /> Professional Journey
        </h2>
        {aboutData?.experience.map((exp, index) => (
          <div key={index} className="mb-4 bg-persian-indigo p-4 rounded-lg">
            <h3 className="text-xl font-maven text-ut-orange">{exp.title}</h3>
            <p className="text-orange-peel">
              {exp.company}, {exp.duration}
            </p>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="interests"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2 flex items-center">
          <FaLightbulb className="mr-2" /> Interests in Computer Science
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: "fullStack", title: "Full Stack", icon: "🌐" },
            { key: "cloudComputing", title: "Cloud Computing", icon: "☁️" },
            { key: "cybersecurity", title: "Cybersecurity", icon: "🔒" },
          ].map((interest, index) => (
            <div
              key={index}
              className="bg-persian-indigo p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-maven text-ut-orange mb-2 flex items-center">
                <span className="mr-2">{interest.icon}</span> {interest.title}
              </h3>
              <p className="text-orange-peel">
                {aboutData?.interests[interest.key]}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="goals"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-titan text-princeton-orange mb-6 border-b-2 border-orange-peel pb-2 flex items-center">
          <FaBullseye className="mr-2" /> Goals and Aspirations
        </h2>
        <p className="text-lg font-maven text-orange-peel leading-relaxed">
          {aboutData?.goals}
        </p>
      </motion.section>
    </div>
  );
};

export default About;
