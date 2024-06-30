import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../utils/api";
import PropTypes from "prop-types";

const SkillCategory = ({ title, skills }) => (
  <div className="mb-6">
    <h3 className="mb-2">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {skills.map((skill, index) => (
        <div key={index} className="bg-white p-2 rounded shadow text-center">
          {skill}
        </div>
      ))}
    </div>
  </div>
);

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="space-y-8">
      <section className="technical-skills">
        <h2>Technical Skills</h2>
        <SkillCategory
          title="Programming Languages"
          skills={skillsData?.technical.languages || []}
        />
        <SkillCategory
          title="Frontend Technologies"
          skills={skillsData?.technical.frontend || []}
        />
        <SkillCategory
          title="Backend Technologies"
          skills={skillsData?.technical.backend || []}
        />
        <SkillCategory
          title="Cloud Computing"
          skills={skillsData?.technical.cloud || []}
        />
        <SkillCategory
          title="Cybersecurity"
          skills={skillsData?.technical.cybersecurity || []}
        />
        <SkillCategory
          title="Databases"
          skills={skillsData?.technical.databases || []}
        />
        <SkillCategory
          title="DevOps Tools"
          skills={skillsData?.technical.devops || []}
        />
      </section>

      <section className="soft-skills">
        <h2>Soft Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData?.soft.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
