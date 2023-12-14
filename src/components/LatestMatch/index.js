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
      <div className="leftAlign">
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man of the match</p>
        <p>{ManOfTheMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  );
};

export default LatestMatch;
