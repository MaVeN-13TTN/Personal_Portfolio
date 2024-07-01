import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getResume } from "../utils/api";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaLinkedin,
  FaGithub,
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
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden font-maven"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="bg-gray-800 text-white py-8 px-6">
          <h1 className="text-3xl sm:text-4xl font-maven font-light mb-2">
            Samuel Ndung'u Kinyanjui
          </h1>
          <p className="text-xl text-gray-300 mb-4 font-maven font-light">
            Computer Science Student
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300 font-maven">
            <span className="flex items-center">
              <FaEnvelope className="mr-2" /> kinyanjuindungu1324@gmail.com
            </span>
            <span className="flex items-center">
              <FaPhone className="mr-2" /> +254 728 446 824
            </span>
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Nairobi, Kenya
            </span>
            <span className="flex items-center">
              <FaLinkedin className="mr-2" />
              {"Ndung'u Kinyanjui"}
            </span>
            <span className="flex items-center">
              <FaGithub className="mr-2" /> {"https://github.com/MaVeN-13TTN"}
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
              Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-maven font-semibold text-gray-700">
                  {exp.title}
                </h3>
                <p className="text-gray-600 italic mb-2 font-maven">
                  {exp.company} | {exp.duration}
                </p>
                <ul className="list-disc list-inside text-gray-700 font-maven">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="mb-1 pl-5 -indent-5">
                      {resp}
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
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-maven font-semibold text-gray-700">
                  {edu.degree}
                </h3>
                <p className="text-gray-600 font-maven">
                  {edu.institution}, {edu.year}
                </p>
              </div>
            ))}
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-maven font-light text-gray-800 mb-3 pb-2 border-b border-gray-300">
              Skills
            </h2>
            <ul className="list-disc list-inside text-gray-700 columns-1 sm:columns-2 gap-x-6 font-maven">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="mb-1">
                  {skill}
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
