import { useQuery } from "@tanstack/react-query";
import { getHero, getSkills, getProjects } from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: heroData } = useQuery({ queryKey: ["hero"], queryFn: getHero });
  const { data: skillsData } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="space-y-12">
      <section className="hero text-center">
        <h1 className="text-5xl mb-4">{heroData?.name}</h1>
        <h2 className="text-3xl mb-4">{heroData?.title}</h2>
        <p className="text-xl mb-8">{heroData?.tagline}</p>
        <Link
          to="/projects"
          className="bg-pumpkin hover:bg-safetyOrange text-white font-bold py-2 px-4 rounded"
        >
          View My Work
        </Link>
      </section>

      <section className="quick-intro">
        <h2>Quick Introduction</h2>
        <p className="text-lg">{heroData?.intro}</p>
      </section>

      <section className="featured-skills">
        <h2>Featured Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skillsData && skillsData.technical ? (
            Object.entries(skillsData.technical)
              .flatMap(([category, skills]) => skills)
              .slice(0, 6)
              .map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  {skill}
                </div>
              ))
          ) : (
            <p>No technical skills available</p>
          )}
        </div>
      </section>
      <section className="highlighted-projects">
        <h2>Highlighted Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData?.featured.slice(0, 3).map((project) => (
            <div key={project.id} className="bg-white p-6 rounded shadow">
              <h3>{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <Link
                to={`/projects/${project.id}`}
                className="text-pumpkin hover:text-safetyOrange"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
