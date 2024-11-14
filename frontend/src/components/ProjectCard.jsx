import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const isSoloProject = project.team.type === "solo";

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-500",
      "In Progress": "bg-yellow-500",
      Planned: "bg-blue-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const calculateDuration = (timeline) => {
    const start = new Date(timeline.startDate);
    const end = timeline.endDate ? new Date(timeline.endDate) : new Date();
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  return (
    <motion.div
      className="bg-persian-indigo rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      layout
    >
      {/* Preview Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.previewImage}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`${getStatusColor(
              project.status
            )} px-2 py-1 rounded-full text-white text-xs font-maven`}
          >
            {project.status}
          </span>
          <span
            className={`${
              isSoloProject ? "bg-blue-500" : "bg-purple-500"
            } px-2 py-1 rounded-full text-white text-xs font-maven`}
          >
            {isSoloProject ? "Personal Project" : "Team Project"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-titan text-orange-peel mb-3 leading-tight">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 font-maven text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-orange-peel mb-1">
            <span>Progress</span>
            <span>{project.completion}%</span>
          </div>
          <div className="w-full bg-russian-violet rounded-full h-2">
            <div
              className="bg-orange-peel h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.completion}%` }}
            />
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-russian-violet text-orange-peel px-2 py-1 rounded-full text-xs font-maven"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Metadata */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-300">
            {isSoloProject ? (
              <FaUser className="mr-2 text-orange-peel" />
            ) : (
              <FaUsers className="mr-2 text-orange-peel" />
            )}
            <span>
              {isSoloProject
                ? "Solo Developer"
                : `${project.team.size} Contributors`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <FaCalendarAlt className="mr-2 text-orange-peel" />
            <span>{calculateDuration(project.timeline)}</span>
          </div>
        </div>

        {/* Learning Outcomes for Solo Projects */}
        {isSoloProject && project.learningOutcomes && (
          <div className="mb-4 bg-russian-violet bg-opacity-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaGraduationCap className="text-orange-peel" />
              <h4 className="text-orange-peel text-sm font-maven">
                Key Learnings
              </h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              {project.learningOutcomes.slice(0, 2).map((outcome, index) => (
                <li key={index} className="line-clamp-1">
                  • {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-peel hover:text-princeton-orange transition-colors duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-peel hover:text-princeton-orange transition-colors duration-300"
              >
                <FaExternalLinkAlt className="w-5 h-5" />
              </a>
            )}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="text-princeton-orange hover:text-orange-peel transition-colors duration-300 
                     font-maven text-sm font-semibold"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.oneOf(["Completed", "In Progress", "Planned"]).isRequired,
    completion: PropTypes.number.isRequired,
    team: PropTypes.shape({
      size: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["solo", "team"]).isRequired,
      contributors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          role: PropTypes.string.isRequired,
          github: PropTypes.string.isRequired,
          isOwner: PropTypes.bool,
        })
      ).isRequired,
    }).isRequired,
    timeline: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
    }).isRequired,
    learningOutcomes: PropTypes.arrayOf(PropTypes.string),
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string,
    personalProject: PropTypes.bool,
  }).isRequired,
};

export default ProjectCard;
