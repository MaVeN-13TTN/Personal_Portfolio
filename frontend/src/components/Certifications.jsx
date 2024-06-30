import { useQuery } from "@tanstack/react-query";
import { getCertifications } from "../utils/api";
import PropTypes from "prop-types";

const CertificationCard = ({ certification }) => (
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-semibold mb-2">{certification.name}</h3>
    <p className="mb-1">Issuing Organization: {certification.issuer}</p>
    <p className="mb-1">Date: {certification.date}</p>
    {certification.expiry && (
      <p className="mb-1">Expiry: {certification.expiry}</p>
    )}
    {certification.credentialUrl && (
      <a
        href={certification.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pumpkin hover:text-safetyOrange"
      >
        View Credential
      </a>
    )}
  </div>
);

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    expiry: PropTypes.string,
    credentialUrl: PropTypes.string,
  }).isRequired,
};

const Certifications = () => {
  const {
    data: certificationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Certifications</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </div>
  );
};

export default Certifications;
