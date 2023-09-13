import { Component } from "react";

import TeamCard from "../TeamCard";

import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css";

class Home extends Component {
  state = { listOfIplTeams: [], isLoading: true };

  getIplDashboard = async () => {
    const response = await fetch("https://apis.ccbp.in/ipl");
    const data = await response.json();
    console.log(data);
    const { teams } = data;

    const formattedData = teams.map((eachData) => ({
      name: eachData.name,
      id: eachData.id,
      teamImageUrl: eachData.team_image_url,
    }));

    this.setState({ listOfIplTeams: formattedData, isLoading: false });
  };

  componentDidMount() {
    this.getIplDashboard();
  }

  render() {
    const { listOfIplTeams, isLoading } = this.state;
    return (
      <div className="IplDashboardContainer">
        <div className="teamsContainer">
          <h1>Ipl Dashboard</h1>
          {isLoading ? (
            <li>
              <div data-testid="loader">
                <Loader type="Oval" color="#ffffff" height={50} width={50} />
              </div>
            </li>
          ) : (
            <ul className="teams">
              {listOfIplTeams.map((eachTeam) => (
                <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
