import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkVariants = {
    hover: { scale: 1.1, color: "#ff9e00" },
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-russian-violet text-orange-peel py-6">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-titan">
          Ndung&apos;u Kinyanjui
        </Link>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-orange-peel focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40 ${
            menuOpen ? "block md:hidden" : "hidden"
          }`}
        >
          <ul className="space-y-4">
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
                  className="block text-xl font-maven text-orange-peel hover:text-princeton-orange transition-smooth"
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <ul className={`hidden md:flex md:space-x-6`}>
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
