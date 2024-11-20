import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TechSelect = ({ options, value = [], onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleKeyDown = (e, option) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOption(option);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`bg-persian-indigo text-gray-300 rounded-lg px-3 py-2 h-10 border 
                   flex items-center justify-between
                   ${
                     !disabled
                       ? "cursor-pointer hover:border-princeton-orange"
                       : "opacity-50 cursor-not-allowed"
                   }
                   ${value.length ? "border-orange-peel" : "border-gray-600"}
                   ${isOpen ? "ring-2 ring-princeton-orange" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            !disabled && setIsOpen(!isOpen);
          }
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex-1 truncate">
          {value.length ? `${value.length} selected` : "Select technologies"}
        </div>
        <FaChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-persian-indigo border border-gray-600 rounded-lg shadow-lg"
          >
            <div className="p-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-russian-violet text-gray-300 rounded px-2 py-1 
                         border border-gray-600 focus:outline-none focus:border-orange-peel"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div
              className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-peel scrollbar-track-russian-violet"
              role="listbox"
              aria-multiselectable="true"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    role="option"
                    aria-selected={value.includes(option)}
                    tabIndex={0}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between
                               hover:bg-russian-violet transition-colors duration-150
                               ${
                                 value.includes(option)
                                   ? "text-orange-peel"
                                   : "text-gray-300"
                               }`}
                    onClick={() => toggleOption(option)}
                    onKeyDown={(e) => handleKeyDown(e, option)}
                  >
                    <span>{option}</span>
                    {value.includes(option) && (
                      <FaTimes
                        className="text-princeton-orange hover:text-orange-peel"
                        aria-label={`Remove ${option}`}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-400 text-center">
                  No technologies found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

TechSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TechSelect;
