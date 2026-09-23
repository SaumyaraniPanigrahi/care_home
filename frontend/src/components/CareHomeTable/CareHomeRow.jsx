import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function CareHomeRow({ home }) {
  return (
    <tr className="care-home-row">
      {/* Care Home Name */}
      <td className="care-home-row__name">{home.name}</td>

      {/* Postcode */}
      <td className="care-home-row__postcode">{home.postcode}</td>

      {/* Residents */}
      <td className="care-home-row__residents">
        <span className="resident-count">{home.residents}</span>
      </td>

      {/* Current Cycle - To Action */}
      <td className="care-home-row__status">
        {home.currentAction > 0 && (
          <span className="status-count status-count--action">
            <span className="status-count__icon">
              <FontAwesomeIcon icon={faExclamation} />
            </span>

            <span className="status-count__number">{home.currentAction}</span>
          </span>
        )}
      </td>

      {/* Current Cycle - To Review */}
      <td className="care-home-row__status">
        {home.currentReview > 0 && (
          <span className="status-count status-count--review">
            <span className="status-count__icon">
              <FontAwesomeIcon icon={faQuestion} />
            </span>

            <span className="status-count__number">{home.currentReview}</span>
          </span>
        )}
      </td>

      {/* Next Cycle - To Action */}
      <td className="care-home-row__status">
        {home.nextAction > 0 && (
          <span className="status-count status-count--action">
            <span className="status-count__icon">
              <FontAwesomeIcon icon={faExclamation} />
            </span>

            <span className="status-count__number">{home.nextAction}</span>
          </span>
        )}
      </td>

      {/* Next Cycle - To Review */}
      <td className="care-home-row__status">
        {home.nextReview > 0 && (
          <span className="status-count status-count--review">
            <span className="status-count__icon">
              <FontAwesomeIcon icon={faQuestion} />
            </span>

            <span className="status-count__number">{home.nextReview}</span>
          </span>
        )}
      </td>
    </tr>
  );
}
