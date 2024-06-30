import { useQuery } from "@tanstack/react-query";
import { getResume } from "../utils/api";

const Resume = () => {
  const {
    data: resumeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resume"],
    queryFn: getResume,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Resume</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
        <p>{resumeData.summary}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p>
              {exp.company} | {exp.duration}
            </p>
            <ul className="list-disc list-inside mt-2">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p>
              {edu.institution} | {edu.year}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <ul className="list-disc list-inside">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div>
        <a
          href={resumeData.pdfUrl}
          download
          className="bg-pumpkin hover:bg-safetyOrange text-white font-bold py-2 px-4 rounded inline-block"
        >
          Download PDF Version
        </a>
      </div>
    </div>
  );
};

export default Resume;
