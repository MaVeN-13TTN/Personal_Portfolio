import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-russianViolet text-white py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Ndung'u Kinyanjui
        </Link>
        <ul className="flex space-x-4">
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
            <Link to="/certifications" className="hover:text-orangePeel">
              Certifications
            </Link>
          </li>
          <li>
            <Link to="/resume" className="hover:text-orangePeel">
              Resume
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orangePeel">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
