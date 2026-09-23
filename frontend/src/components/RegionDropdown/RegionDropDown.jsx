import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import "./RegionDropdown.css";

const RegionDropdown = ({
  placeholder = "Select Region",
  options = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="region-dropdown">
      <div
        className="ch-region-dropdown-box"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={selected ? "selected-value" : "placeholder-value"}>
          {selected || placeholder}
        </span>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`region-dropdown-icon ${
            isOpen ? "region-dropdown-icon--open" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="region-dropdown-menu">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className="region-dropdown-option"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="region-dropdown-option">No regions available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegionDropdown;
