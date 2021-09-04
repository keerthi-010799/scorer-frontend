import React, { useState, useEffect, useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Footer from "../Components/Footer";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
//import { getTeamById, getData, updateTeamById, getPlayerById } from '../utils/storgeService';
import Auth from "../context/auth-context";
import { connect } from "react-redux";
import { getPlayerData } from "../services/playerservice";
import { getTeamById, AddPlayerToTeam } from "../services/teamservice";
import Loader from "../Components/Common/Loader";

function Team({ team }) {
  const match = useRouteMatch();
  const {
    params: { teamId },
  } = match;
  const history = useHistory();
  const context = useContext(Auth);
  const [teamData, setTeamData] = useState({});
  const [players, setPlayers] = useState([]);
  const [currplayer, setcurrplayer] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [isLoading,setLoading] = useState(false);
  // const [updateData, setUpdateData] = useState(0)
  // useEffect(() => {
  //   let team = getTeamById(+teamId);
  //   team && setTeamData({ ...team });

  //   let players = getData('players');
  //   players?.length > 0 && setPlayers([...players]);
  // }, []);

  // useEffect(() => {
  //   updateTeamById(teamData.id, teamData);
  // }, [teamData.players]);
  const redirectTo = (route) => {
    history.push(route);
  };
  useEffect(() => {
    getTeamById(teamId)
      .then((res) => {
        console.log(res.data.data.getTeamById);
        return setTeamData(res.data.data.getTeamById);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPlayerData()
      .then((res) => {
        return setPlayers(res.data.data.players);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePlayer = (player) => {
    console.log(player);
    console.log(teamData.players);
    setSelectedPlayer({ ...player });
    setcurrplayer({ ...player });
  };

  const addPlayerToTeam = () => {
    const playerId = selectedPlayer.id;
    setLoading(true);
    AddPlayerToTeam(playerId, teamId)
      .then((res) => {
        setLoading(false);
        console.log(res.data.data.addPlayerToTeam);
        return setTeamData(res.data.data.addPlayerToTeam);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setSelectedPlayer({});
  };

  const playerOption = players.filter((p) => p.user._id === context.userId);
  const playerOptions = playerOption.map((p) => {
    return {
      label: p.name,
      id: p._id,
    };
  });
  console.log(playerOptions);
  return (
    <React.Fragment>
      <div className="team-page full-height">
        <div className="d-flex team-page-header justify-content-between align-items-center mt-3 border-bottom pb-2">
          <img
            alt=""
            src={
              teamData.image ||
              "https://img2.pngio.com/clipart-cricket-batsman-logo-cricket-logo-png-900_520.jpg"
            }
            className="rounded-circle teampic mr-3"
          />
          <div className="h5 text-secondary">{teamData.name}</div>
        </div>
        <div className="ml-2">
          <div className="d-flex small text-muted justify-content-center pt-2 team-stats align-items-center text-secondary border-bottom pb-2">
            <div className="mr-3">
              Matches: <span className="font-weight-bold">{teamData.matches}</span>
            </div>
            <div className="mr-3">
              Won: <span className="font-weight-bold text-success">{teamData.won}</span>
            </div>
            <div className="mr-3">
              Loss: <span className="font-weight-bold text-danger">{teamData.loss}</span>
            </div>
            <div>
              Tied: <span className="font-weight-bold text-info">{teamData.tie}</span>
            </div>
          </div>
        </div>
        <div className="player-list full-height mt-2 pl-0 pr-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="mr-2 flex-1">Players</div>
            <div className="flex-2 mr-2">
              <SingleSelect
                name={"players"}
                placeholder=""
                options={playerOptions.filter((p) => p.id !== currplayer.id)}
                value={selectedPlayer}
                isSearchable={true}
                onChange={(value) => {
                  handlePlayer(value, "team_2");
                }}
              />
            </div>
            <div>
              <button
                type="button"
                class="btn btn-outline-primary"
                disabled={!selectedPlayer.id}
                onClick={() => addPlayerToTeam()}
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-3">
            {teamData.players &&
              teamData.players.map((player, playerIndex) => {
                return (
                  <div
                    className="border player-list-item p-2 shadow-sm mb-2"
                    key={`team-${playerIndex}`}
                    onClick={() => {
                      redirectTo(`/player/info/${player._id}`);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        alt=""
                        src={
                          player.image ||
                          "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
                        }
                        className="rounded-circle playerpic mr-2"
                      />
                      <div className="ml-2 w-100">
                        <div>{player.name}</div>
                        <div className="text-muted small">
                          {player.battingStyle}
                        </div>
                        <div className="h-50 d-flex player-stats align-items-center text-secondary">
                          <div className="mr-3">
                            Matches:{" "}
                            <span className="font-weight-bold">
                              {/*player.matches*/}0
                            </span>
                          </div>
                          <div className="mr-3">
                            Runs:{" "}
                            <span className="font-weight-bold">
                              {player.run}
                            </span>
                          </div>
                          <div className="mr-3">
                            Avg:{" "}
                            <span className="font-weight-bold">
                              0{/*player.avg*/}
                            </span>
                          </div>
                          <div>
                            SRate:{" "}
                            <span className="font-weight-bold">
                              0{/*player.srate*/}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      {isLoading && <Loader status={true}/>}
      </div>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    team: state.team,
    player: state.player,
  };
};
export default connect(mapStateToProps)(Team);
