import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const linkVariants = {
    hover: { scale: 1.1, color: "#ff9e00" },
  };

  return (
    <header className="bg-russian-violet text-orange-peel py-6">
      <nav className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-3xl font-titan mb-4 md:mb-0">
          Ndung'u Kinyanjui
        </Link>
        <ul className="flex flex-wrap justify-center space-x-6">
          {[
            "About",
            "Skills",
            "Projects",
            "Certifications",
            "Resume",
            "Contact",
          ].map((item) => (
            <motion.li key={item} whileHover="hover" variants={linkVariants}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="font-maven text-lg hover:text-princeton-orange transition-smooth"
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
