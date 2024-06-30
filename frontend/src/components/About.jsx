import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../utils/api";

const About = () => {
  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="space-y-8">
      <section className="personal-bio">
        <h2>Personal Bio</h2>
        <p className="text-lg">{aboutData?.bio}</p>
      </section>

      <section className="education">
        <h2>Education</h2>
        {aboutData?.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3>{edu.degree}</h3>
            <p>
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </section>

      <section className="professional-journey">
        <h2>Professional Journey</h2>
        {aboutData?.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3>{exp.title}</h3>
            <p>
              {exp.company}, {exp.duration}
            </p>
          </div>
        ))}
      </section>

      <section className="interests">
        <h2>Interests in Computer Science</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3>Full-Stack Development</h3>
            <p>{aboutData?.interests.fullStack}</p>
          </div>
          <div>
            <h3>Cloud Computing</h3>
            <p>{aboutData?.interests.cloudComputing}</p>
          </div>
          <div>
            <h3>Cybersecurity</h3>
            <p>{aboutData?.interests.cybersecurity}</p>
          </div>
        </div>
      </section>

      <section className="goals">
        <h2>Goals and Aspirations</h2>
        <p className="text-lg">{aboutData?.goals}</p>
      </section>
    </div>
  );
};

export default About;
