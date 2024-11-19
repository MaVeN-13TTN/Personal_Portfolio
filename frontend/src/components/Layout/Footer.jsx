import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";

const QUICK_LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Certifications",
  "Contact",
];

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-ut-orange hover:text-pumpkin transition-all duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel"
    aria-label={label}
  >
    <Icon size="2em" />
  </a>
);

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const SocialLinks = ({ className }) => (
  <div className={`flex items-center space-x-6 ${className}`}>
    <SocialIcon
      href="https://www.linkedin.com/in/ndungu-kinyanjui/"
      icon={FaLinkedin}
      label="LinkedIn Profile"
    />
    <SocialIcon
      href="https://github.com/MaVeN-13TTN"
      icon={FaGithub}
      label="GitHub Profile"
    />
    <SocialIcon
      href="https://x.com/Maven_TTN"
      icon={FaXTwitter}
      label="Twitter Profile"
    />
  </div>
);

SocialLinks.propTypes = {
  className: PropTypes.string,
};

SocialLinks.defaultProps = {
  className: "",
};

const Footer = ({ customLinks, className }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const getCurrentYear = useCallback(() => new Date().getFullYear(), []);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen, handleClickOutside]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  }, []);

  const links = customLinks || QUICK_LINKS;

  return (
    <footer
      className={`bg-russian-violet text-orange-peel py-12 ${className}`}
      onKeyDown={handleKeyDown}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="w-full md:w-1/3 relative">
            <button
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left text-2xl font-titan mb-4 bg-gradient-to-r from-persian-indigo to-russian-violet text-orange-peel px-4 py-2 rounded-lg shadow-lg hover:bg-persian-indigo transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel"
              aria-expanded={isDropdownOpen}
              aria-controls="quick-links-dropdown"
            >
              Quick Links
            </button>
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                id="quick-links-dropdown"
                className="absolute bg-[rgba(0,0,0,0.8)] backdrop-blur-sm text-white rounded-lg shadow-lg mt-2 w-full z-10"
                role="menu"
              >
                {links.map((item) => (
                  <li
                    key={item}
                    className="border-b border-gray-600 last:border-none"
                    role="none"
                  >
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-princeton-orange hover:text-russian-violet transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel"
                      role="menuitem"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-titan mb-4">Connect</h3>
            <SocialLinks />
          </div>

          <div className="w-full md:w-1/3 text-center md:text-left">
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

Footer.propTypes = {
  customLinks: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

Footer.defaultProps = {
  customLinks: null,
  className: "",
};

export default Footer;
