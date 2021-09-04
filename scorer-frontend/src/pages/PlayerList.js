import React, { useEffect, useState,useContext } from "react";
import Footer from "../Components/Footer";
import { useHistory } from "react-router-dom";
import plus from "../assets/plus2.svg";
import { addplayer } from "../actions/actions";
//import { getData } from "../utils/storgeService";
import { connect } from "react-redux";
import Auth from "../context/auth-context";
import {getPlayerData} from "../services/playerservice";
import Loader from "../Components/Common/Loader";

function PlayerList({ editMode = false, dispatch,player }) {
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  const [playersList, setPlayersList] = useState([]);
  const [loading, setloading] = useState(false);
  const context = useContext(Auth);
   useEffect(() => {
  //   let players = getData('players');
  //   players?.length > 0 && setPlayersList([...players]);
  setloading(true);        
  getPlayerData().then((res) => {
        console.log(res.data.data.players);
        const players = res.data.data.players;
        setloading(false);
        return setPlayersList(players);
      })
      .catch((err) => {
        console.log(err);
      });
      dispatch(addplayer(playersList));
    }, []);
    const alloweduser = context.userId;
    
    const createPlayer=()=>{
      redirectTo("/player/add")
      }
  return (
    <React.Fragment>
      <div className="teams-page-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Players</div>
          {!editMode && (
            <div onClick={() => redirectTo(`/player/add`)}>
              <img src={plus} width="30px" alt="" style={{cursor:"pointer"}}/>
            </div>
          )}
        </div>
        {
        playersList.some(pl =>pl.user._id === alloweduser) ?
         playersList.map((player, playerIndex) => {
          return (
                <div>
                 {alloweduser === player.user._id ?
                  <div
                  className="border player-list-item p-2 shadow-sm mb-2"
                  key={`team-${playerIndex}`}
                  onClick={() => {
                    redirectTo(`/player/info/${player._id}`);
                  }}
                >  
                  <div className="d-flex align-items-center">
                    <img alt=""
                      src={player.image ||
                        "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
                      }
                      className="rounded-circle playerpic mr-2"
                    />
                    <div className="ml-2 w-100">
                      <div>{player.name}</div>
                      <div className="text-muted small">
                        {player.batting_style}
                      </div>
                      <div className="h-50 d-flex player-stats align-items-center text-secondary">
                        <div className="mr-3">
                          Matches:{" "}
                          <span className="font-weight-bold">
                            {player.matches && player.matches}
                          </span>
                        </div>
                        <div className="mr-3">
                          Runs:{" "}
                          <span className="font-weight-bold">
                            {player.run && player.run}
                          </span>
                        </div>
                        <div className="mr-3">
                          Avg:{" "}
                          <span className="font-weight-bold">
                            {player.avg && player.avg }
                          </span>
                        </div>
                        <div>
                          SRate:{" "}
                          <span className="font-weight-bold">
                            {player.st_rate && player.st_rate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>:null}
                </div>
          );
            })
           : <div class="col-md-12 text-center"><div class="text-secondary mb-3">There is no player added</div>
          <button class="btn btn-md btn-primary w-30 ml-3" type="button" onClick={createPlayer}>create player</button></div>} 
          {/* !editMode && (
              <p className=" pt-5 pb-5 text-center">
                <button
                  type="submit"
                  class="btn btn-md btn-primary"
                  onClick={() => redirectTo(`/player/add`)}
                >
                  Create Player
                </button>
              </p>
            )}  */}
            
      </div>
      <Footer />
      {loading && <Loader status={true}/>}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};

export default connect(mapStateToProps)(PlayerList);
