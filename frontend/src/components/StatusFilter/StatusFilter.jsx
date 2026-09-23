import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import "./StatusFilter.css";

const StatusFilter = ({ title }) => {
  const [selected, setSelected] = useState(null);

  const filterItems = [
    {
      id: "no-action",
      label: "No Action",
      icon: faCheck,
      color: "#0b8250",
    },
    {
      id: "to-action",
      label: "To Action",
      icon: faExclamation,
      color: "#d71945",
    },
    {
      id: "to-review",
      label: "To Review",
      icon: faQuestion,
      color: "#e88b00",
    },
  ];

  return (
    <div className="status-filter">
      <h3 className="status-filter__title">{title}</h3>

      <div className="status-filter__group">
        {filterItems.map((item) => {
          const isSelected = selected === item.id;
          const isInactive = selected && !isSelected;

          return (
            <button
              type="button"
              key={item.id}
              className={`status-filter__card ${
                isInactive ? "status-filter__card--inactive" : ""
              } ${isSelected ? "status-filter__card--selected" : ""}`}
              onClick={() => setSelected(isSelected ? null : item.id)}
            >
              <div
                className="status-filter__pill"
                style={{
                  backgroundColor: item.color,
                  boxShadow: isSelected ? `0 0 0 3px ${item.color}30` : "none",
                }}
              >
                <span className="status-filter__icon-circle">
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: item.color }}
                  />
                </span>
              </div>

              <span className="status-filter__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilter;
