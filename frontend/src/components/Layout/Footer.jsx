import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-russianViolet text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orangePeel">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orangePeel">
                  About
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-orangePeel">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-orangePeel">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orangePeel">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl mb-2">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orangePeel"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orangePeel"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orangePeel"
              >
                Twitter
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <p>&copy; 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
