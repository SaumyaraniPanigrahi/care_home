import React from "react";
import "./SubHeader.css";

const SubHeader = ({ title }) => {
  return (
    <div className="ch-sub-header">
      <h3>{title}</h3>
    </div>
  );
};

export default SubHeader;
