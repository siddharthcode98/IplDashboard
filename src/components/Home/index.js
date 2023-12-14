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
      <main className="main-container">
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <div className="IplDashboardContainer">
              <section className="bottom-section">
                <div className="teamsContainer">
                  <section className="top-section">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                      alt="ipl logo"
                      className="ipl-logo"
                    />
                    <h1 className="dashboard-heading">Ipl Dashboard</h1>
                  </section>
                  <ul className="teams">
                    {listOfIplTeams.map((eachTeam) => (
                      <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    );
  }
}

export default Home;
