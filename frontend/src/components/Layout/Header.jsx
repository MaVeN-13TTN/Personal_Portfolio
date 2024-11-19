import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const NAVIGATION_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Certifications",
  "Resume",
  "Contact",
];

const MenuIcon = ({ isOpen }) => (
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
      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
    />
  </svg>
);

MenuIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const NavLink = ({ to, children, onClick, className }) => (
  <motion.li
    whileHover="hover"
    variants={{
      hover: { scale: 1.1, color: "#ff9e00" },
    }}
  >
    <Link
      to={to}
      className={`font-maven text-lg hover:text-princeton-orange transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.li>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

const MobileMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-40 md:hidden">
      <div
        ref={menuRef}
        className="bg-russian-violet/90 p-6 rounded-lg shadow-xl"
      >
        <ul className="space-y-4">
          {NAVIGATION_LINKS.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={onClose}
              className="block text-xl text-orange-peel"
            >
              {item}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <header className="bg-russian-violet text-orange-peel py-6" role="banner">
      <nav
        className="container mx-auto px-4 flex justify-between items-center"
        role="navigation"
      >
        <Link
          to="/"
          className="text-3xl font-titan focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel rounded"
        >
          Ndung&apos;u Kinyanjui
        </Link>

        <button
          className="md:hidden text-orange-peel focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel rounded p-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon isOpen={menuOpen} />
        </button>

        <MobileMenu isOpen={menuOpen} onClose={closeMenu} />

        <ul className="hidden md:flex md:space-x-6" role="menubar">
          {NAVIGATION_LINKS.map((item) => (
            <NavLink key={item} to={`/${item.toLowerCase()}`}>
              {item}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
