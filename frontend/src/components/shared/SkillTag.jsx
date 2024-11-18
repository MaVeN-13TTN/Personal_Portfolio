import PropTypes from "prop-types";

const SkillTag = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-800 transition-colors duration-200">
      {skill}
    </span>
  );
};

SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
};

export default SkillTag;
