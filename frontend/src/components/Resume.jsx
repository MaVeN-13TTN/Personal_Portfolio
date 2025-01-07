import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getResume } from "../utils/api";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGlobe,
  FaDownload,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Resume = () => {
  const {
    data: resumeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resume"],
    queryFn: getResume,
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-700 font-maven text-lg">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 font-maven text-lg">
        An error occurred: {error.message}
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden font-maven"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="bg-gray-800 text-white py-8 px-6">
          <h1 className="text-3xl sm:text-4xl font-maven font-light mb-2">
            {resumeData.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300 font-maven">
            <span className="flex items-center">
              <FaEnvelope className="mr-2" /> {resumeData.contact.email}
            </span>
            <span className="flex items-center">
              <FaPhone className="mr-2" /> {resumeData.contact.phone}
            </span>
            <span className="flex items-center">
              <FaLinkedin className="mr-2" /> {resumeData.contact.linkedin}
            </span>
            <span className="flex items-center">
              <FaGlobe className="mr-2" /> {resumeData.contact.portfolio}
            </span>
          </div>
        </header>

        <div className="p-6 sm:p-10">
          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed font-maven">
              {resumeData.summary}
            </p>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-700 font-maven">
              {resumeData.certifications.map((cert, index) => (
                <li key={index} className="mb-2">
                  {cert}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-maven font-semibold text-gray-700">
                  {exp.title}
                </h3>
                <p className="text-gray-600 italic mb-2 font-maven">
                  {exp.company} | {exp.duration}
                  {exp.location && ` | ${exp.location}`}
                </p>
                <ul className="list-disc list-inside text-gray-700 font-maven">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="mb-1 pl-5 -indent-5">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Education
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-maven font-semibold text-gray-700">
                {resumeData.education.degree}
              </h3>
              <p className="text-gray-600 font-maven">
                {resumeData.education.institution}, {resumeData.education.graduation}
              </p>
            </div>
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Skills
            </h2>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-maven font-semibold text-gray-700 mb-2">
                  {category}
                </h3>
                <ul className="list-disc list-inside text-gray-700 font-maven">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="mb-1">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Projects
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-maven font-semibold text-gray-700">
                  {project.name}
                </h3>
                <p className="text-gray-700 font-maven">{project.description}</p>
              </div>
            ))}
          </motion.section>

          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Leadership Principles
            </h2>
            {resumeData.leadershipPrinciples.map((principle, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-maven font-semibold text-gray-700">
                  {principle.principle}
                </h3>
                <p className="text-gray-700 font-maven">
                  {principle.demonstration}
                </p>
              </div>
            ))}
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Interests
            </h2>
            <ul className="list-disc list-inside text-gray-700 columns-1 sm:columns-2 gap-x-6 font-maven">
              {resumeData.interests.map((interest, index) => (
                <li key={index} className="mb-1">
                  {interest}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.div
          className="bg-gray-100 py-6 px-6 sm:px-10"
          variants={sectionVariants}
        >
          <a
            href={resumeData.pdfUrl}
            download
            className="bg-blue-600 hover:bg-blue-700 text-white font-maven font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
          >
            <FaDownload className="mr-2" /> Download PDF Version
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Resume;
