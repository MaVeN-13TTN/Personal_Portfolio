import PropTypes from "prop-types";

const CertificationBadge = ({ badgeUrl, name }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={badgeUrl}
        alt={`${name} certification badge`}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/placeholder-badge.png";
          e.target.onerror = null;
        }}
      />
    </div>
  );
};

CertificationBadge.propTypes = {
  badgeUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CertificationBadge;
