// src/components/Layout/Footer.jsx
import { useState, useCallback, useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";

// Constants
const QUICK_LINKS = Object.freeze([
  "Home",
  "About",
  "Skills",
  "Projects",
  "Certifications",
  "Contact",
]);

// SocialIcon Component
const SocialIcon = memo(function SocialIcon({ href, icon: Icon, label }) {
  return (
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
});

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

// SocialLinks Component
const SocialLinks = memo(function SocialLinks({ className = "" }) {
  return (
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
});

SocialLinks.propTypes = {
  className: PropTypes.string,
};

// QuickLinksDropdown Component
const QuickLinksDropdown = memo(function QuickLinksDropdown({
  isOpen,
  onToggle,
  links,
  buttonRef,
  dropdownRef,
}) {
  return (
    <div className="w-full md:w-1/3 relative">
      <button
        ref={buttonRef}
        onClick={() => onToggle(!isOpen)}
        className="w-full text-left text-2xl font-titan mb-4 bg-gradient-to-r from-persian-indigo to-russian-violet text-orange-peel px-4 py-2 rounded-lg shadow-lg hover:bg-persian-indigo transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-peel"
        aria-expanded={isOpen}
        aria-controls="quick-links-dropdown"
      >
        Quick Links
      </button>
      {isOpen && (
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
                onClick={() => onToggle(false)}
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
  );
});

QuickLinksDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonRef: PropTypes.object.isRequired,
  dropdownRef: PropTypes.object.isRequired,
};

// Main Footer Component
function Footer({ customLinks = null, className = "" }) {
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
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          <QuickLinksDropdown
            isOpen={isDropdownOpen}
            onToggle={setIsDropdownOpen}
            links={links}
            buttonRef={buttonRef}
            dropdownRef={dropdownRef}
          />

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
}

Footer.propTypes = {
  customLinks: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

// Export memoized component with display name
const MemoizedFooter = memo(Footer);
MemoizedFooter.displayName = "Footer";

export default MemoizedFooter;
