import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaCode,
  FaTasks,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";
import { getProjectDetails } from "../../utils/api";

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

// Separate Section component
const Section = ({ title, icon: Icon, children }) => (
  <section className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="text-orange-peel text-xl" />
      <h2 className="text-2xl font-titan text-orange-peel">{title}</h2>
    </div>
    {children}
  </section>
);

// Section PropTypes
Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
};

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectDetails(id),
  });

  if (isLoading)
    return (
      <div className="text-center text-orange-peel font-maven">Loading...</div>
    );

  if (error)
    return (
      <div className="text-center text-pumpkin font-maven">
        An error occurred: {error.message}
      </div>
    );

  const isSoloProject = project.team.type === "solo";

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-500",
      "In Progress": "bg-yellow-500",
      Planned: "bg-blue-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "bg-green-400",
      Intermediate: "bg-yellow-400",
      Advanced: "bg-red-400",
    };
    return colors[difficulty] || "bg-gray-400";
  };

  const calculateDuration = (timeline) => {
    const start = new Date(timeline.startDate);
    const end = timeline.endDate ? new Date(timeline.endDate) : new Date();
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Navigation */}
      <Link
        to="/projects"
        className="inline-flex items-center text-orange-peel hover:text-princeton-orange mb-8 font-maven"
      >
        <FaChevronLeft className="mr-2" /> Back to Projects
      </Link>

      {/* Project Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-titan text-princeton-orange">
            {project.title}
          </h1>
          <div className="flex gap-2">
            <span
              className={`${getStatusColor(
                project.status
              )} px-3 py-1 rounded-full text-white text-sm font-maven`}
            >
              {project.status}
            </span>
            <span
              className={`${getDifficultyColor(
                project.difficulty
              )} px-3 py-1 rounded-full text-white text-sm font-maven`}
            >
              {project.difficulty}
            </span>
            <span
              className={`${
                isSoloProject ? "bg-blue-500" : "bg-purple-500"
              } px-3 py-1 rounded-full text-white text-sm font-maven`}
            >
              {isSoloProject ? "Personal Project" : "Team Project"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Preview Image */}
      <motion.div variants={itemVariants} className="mb-8">
        <img
          src={project.previewImage}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Project Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-persian-indigo rounded-lg p-4 flex items-center">
          <FaCalendarAlt className="text-orange-peel mr-3 text-2xl" />
          <div>
            <h3 className="text-orange-peel font-maven text-sm">Duration</h3>
            <p className="text-white font-maven text-lg">
              {calculateDuration(project.timeline)}
            </p>
          </div>
        </div>

        <div className="bg-persian-indigo rounded-lg p-4 flex items-center">
          {isSoloProject ? (
            <>
              <FaUser className="text-orange-peel mr-3 text-2xl" />
              <div>
                <h3 className="text-orange-peel font-maven text-sm">
                  Developer
                </h3>
                <p className="text-white font-maven text-lg">Solo Project</p>
              </div>
            </>
          ) : (
            <>
              <FaUsers className="text-orange-peel mr-3 text-2xl" />
              <div>
                <h3 className="text-orange-peel font-maven text-sm">
                  Team Size
                </h3>
                <p className="text-white font-maven text-lg">
                  {project.team.size} Contributors
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-persian-indigo rounded-lg p-4 flex items-center">
          <FaClock className="text-orange-peel mr-3 text-2xl" />
          <div>
            <h3 className="text-orange-peel font-maven text-sm">Progress</h3>
            <p className="text-white font-maven text-lg">
              {project.completion}% Complete
            </p>
          </div>
        </div>

        <div className="bg-persian-indigo rounded-lg p-4 flex items-center">
          <FaCode className="text-orange-peel mr-3 text-2xl" />
          <div>
            <h3 className="text-orange-peel font-maven text-sm">Tech Stack</h3>
            <p className="text-white font-maven text-lg">
              {project.technologies.length} Technologies
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="bg-persian-indigo rounded-lg shadow-lg p-8">
        <Section title="Project Overview" icon={FaTasks}>
          <p className="text-gray-300 font-maven leading-relaxed">
            {project.description}
          </p>
        </Section>

        <Section title="Technologies Used" icon={FaTools}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-russian-violet text-orange-peel px-3 py-1 rounded-full font-maven"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        <Section
          title={isSoloProject ? "Developer" : "Team"}
          icon={isSoloProject ? FaUser : FaUsers}
        >
          {isSoloProject ? (
            <div className="bg-russian-violet rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-orange-peel font-maven font-semibold mb-2">
                  Solo Developer
                </h3>
                <p className="text-gray-300 font-maven">
                  This project was independently developed, handling all aspects
                  from design to implementation.
                </p>
              </div>
              {project.roles && (
                <div className="mt-4">
                  <h4 className="text-orange-peel font-maven mb-2">
                    Roles Handled:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role, index) => (
                      <span
                        key={index}
                        className="bg-persian-indigo px-3 py-1 rounded-full text-orange-peel text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.team.contributors.map((contributor, index) => (
                <div key={index} className="bg-russian-violet rounded-lg p-4">
                  <h3 className="text-orange-peel font-maven font-semibold mb-2">
                    {contributor.name}
                  </h3>
                  <p className="text-gray-300 font-maven text-sm mb-2">
                    {contributor.role}
                  </p>
                  {contributor.github && (
                    <a
                      href={contributor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-princeton-orange hover:text-orange-peel flex items-center gap-2"
                    >
                      <FaGithub /> GitHub Profile
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Learning Outcomes (Solo Projects Only) */}
        {isSoloProject && project.learningOutcomes && (
          <Section title="Learning Outcomes" icon={FaGraduationCap}>
            <div className="bg-russian-violet rounded-lg p-6">
              <ul className="space-y-3">
                {project.learningOutcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-orange-peel">•</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Features */}
        <Section title="Features" icon={FaCode}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 bg-russian-violet rounded-lg p-4"
              >
                <FaTasks className="text-orange-peel mt-1 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Project Links */}
        <div className="flex flex-wrap gap-6 mt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-peel hover:text-princeton-orange font-maven gap-2"
            >
              <FaGithub className="text-xl" /> View on GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-peel hover:text-princeton-orange font-maven gap-2"
            >
              <FaExternalLinkAlt className="text-xl" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Project shape for PropTypes
const ProjectShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.oneOf(["Completed", "In Progress", "Planned"]).isRequired,
  difficulty: PropTypes.oneOf(["Beginner", "Intermediate", "Advanced"])
    .isRequired,
  timeline: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
  }).isRequired,
  team: PropTypes.shape({
    size: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["solo", "team"]).isRequired,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        github: PropTypes.string,
        isOwner: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  completion: PropTypes.number.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
  learningOutcomes: PropTypes.arrayOf(PropTypes.string),
  githubUrl: PropTypes.string,
  demoUrl: PropTypes.string,
  personalProject: PropTypes.bool,
});

ProjectDetails.propTypes = {
  data: ProjectShape,
};

export default ProjectDetails;
