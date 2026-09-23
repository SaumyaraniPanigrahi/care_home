import CareHomeRow from "./CareHomeRow";
import SearchBox from "../SearchBox/SearchBox";

import "./CareHomeTable.css";

const data = [
  {
    id: 1,
    name: "Avengers Master Carehome",
    postcode: "E9 7QX",
    residents: 1,
    currentAction: 0,
    currentReview: 0,
    nextAction: 0,
    nextReview: 0,
  },
  {
    id: 2,
    name: "IronMan carehome",
    postcode: "E9 7QX",
    residents: 2,
    currentAction: 4,
    currentReview: 0,
    nextAction: 0,
    nextReview: 2,
  },
  {
    id: 3,
    name: "Hulk carehome",
    postcode: "E9 7QX",
    residents: 0,
    currentAction: 0,
    currentReview: 0,
    nextAction: 0,
    nextReview: 0,
  },
  {
    id: 4,
    name: "Terazoin carehome",
    postcode: "E9 7QX",
    residents: 0,
    currentAction: 0,
    currentReview: 0,
    nextAction: 0,
    nextReview: 0,
  },
  {
    id: 5,
    name: "Master carehome one today",
    postcode: "E9 7QX",
    residents: 0,
    currentAction: 0,
    currentReview: 0,
    nextAction: 0,
    nextReview: 0,
  },
];

export default function CareHomeTable() {
  return (
    <div className="care-home-table-wrapper">
      <table className="care-home-table">
        <thead>
          {/* ROW 1 */}
          <tr className="care-home-table__top-row">
            {/* SearchBox occupies Care Home + Postcode + Residents */}
            <th colSpan="3" className="care-home-table__search-cell">
              <SearchBox />
            </th>

            {/* Current Cycle */}
            <th colSpan="2" className="care-home-table__cycle-title">
              Residents - Current Cycle
            </th>

            {/* Next Cycle */}
            <th colSpan="2" className="care-home-table__cycle-title">
              Residents - Next Cycle
            </th>
          </tr>

          {/* ROW 2 */}
          <tr className="care-home-table__header-row">
            <th>Care Home Name</th>
            <th>Postcode</th>
            <th>Residents</th>

            <th>To Action</th>
            <th>To Review</th>

            <th>To Action</th>
            <th>To Review</th>
          </tr>
        </thead>

        <tbody>
          {data.map((home) => (
            <CareHomeRow key={home.id} home={home} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
