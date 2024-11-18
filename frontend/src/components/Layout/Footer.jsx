import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const getCurrentYear = () => new Date().getFullYear();

  const quickLinks = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <footer className="bg-russian-violet text-orange-peel py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Quick Links Dropdown */}
          <div className="w-full md:w-1/3 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left text-2xl font-titan mb-4 bg-gradient-to-r from-persian-indigo to-russian-violet text-orange-peel px-4 py-2 rounded-lg shadow-lg hover:bg-persian-indigo transition duration-300"
            >
              Quick Links
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-[rgba(0,0,0,0.6)] text-white rounded-lg shadow-lg mt-2 w-full z-10">
                {quickLinks.map((item) => (
                  <li
                    key={item}
                    className="border-b border-gray-600 last:border-none"
                  >
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown after selecting
                      className="block px-4 py-2 hover:bg-princeton-orange hover:text-russian-violet transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-titan mb-4">Connect</h3>
            <div className="flex items-center space-x-6">
              <a
                href="https://www.linkedin.com/in/ndungu-kinyanjui/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size="2em" />
              </a>
              <a
                href="https://github.com/MaVeN-13TTN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
                aria-label="GitHub Profile"
              >
                <FaGithub size="2em" />
              </a>
              <a
                href="https://x.com/Maven_TTN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ut-orange hover:text-pumpkin transition-smooth"
                aria-label="Twitter Profile"
              >
                <FaXTwitter size="2em" />
              </a>
            </div>
          </div>

          {/* Copyright Section */}
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

export default Footer;
