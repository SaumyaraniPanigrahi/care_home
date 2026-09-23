import RegionDropdown from "../RegionDropdown/RegionDropDown";

import "./FilterSection.css";
import StatusFilter from "../StatusFilter/StatusFilter";
// import SearchBox from "../SearchBox/SearchBox";

export default function FilterSection() {
  const regions = [
    "North Region",
    "South Region",
    "East Region",
    "West Region",
  ];

  return (
    <div className="filter-section">
      {/* Region + Search */}
      <div className="filter-section__left">
        <RegionDropdown
          placeholder="Select Region"
          options={regions}
          onChange={(region) => console.log(region)}
        />
      </div>

      {/* Current Cycle Status */}
      <StatusFilter title="Filter - Current Cycle Status" />

      {/* Next Cycle Status */}
      <StatusFilter title="Filter - Next Cycle Status" />
    </div>
  );
}
