import { Link } from "react-router-dom";

import "./index.css";

const TeamCard = (props) => {
  const { teamDetails } = props;
  const { name, id, teamImageUrl } = teamDetails;
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="singelTeam">
        <img src={teamImageUrl} className="team-logo" alt={name} />
        <div>
          <h1 className="teamName">{name}</h1>
        </div>
      </li>
    </Link>
  );
};

export default TeamCard;
