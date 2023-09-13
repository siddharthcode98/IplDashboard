import "./index.css";

const LatestMatch = (props) => {
  const { details } = props;
  const {
    competingTeam,
    competingTeamLogo,
    date,
    result,
    firstInnings,
    secondInnings,
    umpires,
    venue,
    ManOfTheMatch,
  } = details;
  return (
    <div className="latest-match-details">
      <div>
        <h1>{competingTeam}</h1>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <div>
        <img
          src={competingTeamLogo}
          className="image-logo"
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <div>
        <p className="leftAlign">First Innings</p>
        <p className="leftAlign">{firstInnings}</p>
        <p className="leftAlign">Second Innings</p>
        <p className="leftAlign">{secondInnings}</p>
        <p className="leftAlign">Man of the match</p>
        <p className="leftAlign">{ManOfTheMatch}</p>
        <p className="leftAlign">Umpires</p>
        <p className="leftAlign">{umpires}</p>
      </div>
    </div>
  );
};

export default LatestMatch;
