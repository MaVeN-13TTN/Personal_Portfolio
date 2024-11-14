import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="bg-russian-violet text-orange-peel py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-titan mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="font-maven hover:text-princeton-orange transition-smooth"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-titan mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/ndungu-kinyanjui/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
              >
                <FaLinkedin size="2em" />
              </a>
              <a
                href="https://github.com/MaVeN-13TTN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
              >
                <FaGithub size="2em" />
              </a>
              <a
                href="https://x.com/Maven_TTN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
              >
                <FaXTwitter size="2em" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-maven">
              &copy; {getCurrentYear()} Ndung&apos;u Kinyanjui. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
