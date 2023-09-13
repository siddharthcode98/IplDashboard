import { Component } from "react";

import LatestMatch from "../LatestMatch";

import MatchCard from "../MatchCard";

import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class TeamMatches extends Component {
  state = {
    team: "",
    latestMatchesDetails: {},
    recentMatch: [],
    isLoading: true,
    teamBannerUrl: "",
  };

  getTeamMatchDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    let test_color = "";

    switch (id) {
      case "KKR":
        test_color = "KKR_color";
        break;
      case "CSK":
        test_color = "CSK_color";
        break;
      case "RCB":
        test_color = "RCB_color";
        break;
      case "SH":
        test_color = "SRH_color";
        break;
      case "DC":
        test_color = "DC_color";
        break;
      case "RR":
        test_color = "RR_color";
        break;
      case "KXP":
        test_color = "KXP_color";
        break;
      case "MI":
        test_color = "MI_color";
        break;
      default:
        break;
    }
    this.setState({ team: test_color });

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`);
    const data = await response.json();
    const { team_banner_url, latest_match_details, recent_matches } = data;
    const formattedLatestMatchDetails = {
      id: latest_match_details.id,
      competingTeam: latest_match_details.competing_team,
      competingTeamLogo: latest_match_details.competing_team_logo,
      date: latest_match_details.date,
      result: latest_match_details.result,
      firstInnings: latest_match_details.first_innings,
      secondInnings: latest_match_details.second_innings,
      umpires: latest_match_details.umpires,
      venue: latest_match_details.venue,
      ManOfTheMatch: latest_match_details.man_of_the_match,
    };
    const formattedRecentMatches = recent_matches.map((eachMatch) => ({
      id: eachMatch.id,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      result: eachMatch.result,
      matchStatus: eachMatch.match_status,
    }));
    this.setState({
      teamBannerUrl: team_banner_url,
      latestMatchesDetails: formattedLatestMatchDetails,
      recentMatch: formattedRecentMatches,
      isLoading: false,
    });
  };
  componentDidMount() {
    this.getTeamMatchDetails();
  }
  render() {
    const {
      team,
      isLoading,
      latestMatchesDetails,
      recentMatch,
      teamBannerUrl,
    } = this.state;

    return (
      <div className={`background-color ${team}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div className="banner-container">
              <img
                src={teamBannerUrl}
                className="image-banner"
                alt="team banner"
              />
            </div>
            <h1>Latest Matches</h1>
            <br />
            <div>
              <LatestMatch
                details={latestMatchesDetails}
                key={latestMatchesDetails.id}
              />
            </div>
            <ul className="recent-Matches">
              {recentMatch.map((eachMatch) => (
                <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default TeamMatches;
