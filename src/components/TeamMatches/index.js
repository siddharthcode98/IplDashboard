import { Component } from "react";

import LatestMatch from "../LatestMatch";

import MatchCard from "../MatchCard";

import Loader from "react-loader-spinner";

import { PieChart, Pie, Cell } from "recharts";

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
  onClickBackBtn = () => {
    const { history } = this.props;
    history.replace("/");
  };

  getData = () => {
    const { recentMatch } = this.state;
    let wonCount = 0;
    let lossCount = 0;
    let drawCount = 0;
    for (let i = 0; i < recentMatch.length; i++) {
      if (recentMatch[i].matchStatus === "Won") {
        wonCount = wonCount + 1;
      } else if (recentMatch[i].matchStatus === "Lost") {
        lossCount = lossCount + 1;
      } else {
        drawCount = drawCount + 1;
      }
    }
    return [
      { name: "Won", value: wonCount },
      { name: "Lost", value: lossCount },
      { name: "Draw", value: drawCount },
    ];
  };

  render() {
    const {
      team,
      isLoading,
      latestMatchesDetails,
      recentMatch,
      teamBannerUrl,
    } = this.state;
    console.log(recentMatch);
    const newList = this.getData();
    console.log(newList);

    const COLORS = ["#18ed66", "#e31a1a", "#FFBB28"];
    return (
      <main className={`team-main-container ${team}`}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-match-container">
            <button
              type="button"
              className="back-btn"
              onClick={this.onClickBackBtn}
            >
              Back
            </button>
            <div className="banner-container">
              <img
                src={teamBannerUrl}
                className="image-banner"
                alt="team banner"
              />
            </div>
            <div>
              <h1>Latest Matches</h1>
              <LatestMatch
                details={latestMatchesDetails}
                key={latestMatchesDetails.id}
              />
            </div>
            <div className="pie-chart">
              <PieChart width={400} height={400}>
                <Pie
                  data={newList}
                  dataKey="value"
                  name="name"
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="80%"
                  outerRadius={"100%"}
                  fill="#000"
                  label={{ fontSize: "2rem" }}
                >
                  {newList.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <ul className="recent-Matches">
              {recentMatch.map((eachMatch) => (
                <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </main>
    );
  }
}

export default TeamMatches;
