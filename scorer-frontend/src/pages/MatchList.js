import React, { useEffect, useState, useContext } from "react";
import Footer from "../Components/Footer";
import { useHistory } from "react-router-dom";
import plus from "../assets/plus2.svg";
//import { getData } from "../utils/storgeService";
import { connect } from "react-redux";
import Loader from "../Components/Common/Loader";
import { getMatch } from "../services/matchservice";
import Auth from "../context/auth-context";

function MatchList({ editMode = false, match }) {
  const context = useContext(Auth);
  const history = useHistory();

  const [matches, setMatches] = useState([]);

  const redirectTo = (route) => {
    history.push(route);
  };
  const [loading, setloading] = useState(false);
  const userallowed = context.userId;
  const createMatch = () => {
    redirectTo("/match/add");
  };
  useEffect(() => {
    setloading(true);
    getMatch()
      .then((res) => {
        console.log(res.data.data.matches);
        setloading(false);
        return setMatches(res.data.data.matches);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(matches);
  return (
    <React.Fragment>
      <div className="matches-page-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Matches</div>
          {!editMode && (
            <div onClick={() => redirectTo(`/match/add`)}>
              <img src={plus} width="30px" alt="" />
            </div>
          )}
        </div>
        {matches.some((mh) => mh.user._id === userallowed) ? (
          matches.map((matchvalue, matchIndex) => {
            return (
              <div>
                {userallowed === matchvalue.user._id ? (
                  <div
                    className="border team-list-item p-2 shadow-sm mb-2"
                    key={`team-${matchIndex}`}
                    onClick={() => {
                      redirectTo(`/match/info/${matchvalue._id}`);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          "https://img2.pngio.com/clipart-cricket-batsman-logo-cricket-logo-png-900_520.jpg"
                        }
                        className="rounded-circle teampic"
                        alt=""
                      />
                      <div className="ml-2 w-100">
                        <div>
                          <span className="font-weight-bold">
                            {matchvalue.team1.name}
                          </span>{" "}
                          <span className="smaller">Vs</span>{" "}
                          <span className="font-weight-bold">
                            {matchvalue.team2.name}
                          </span>
                        </div>
                        <div className="d-flex team-stats align-items-center text-secondary">
                          <div className="mr-3">
                            Overs:{" "}
                            <span className="font-weight-bold">
                              {matchvalue.overs}
                            </span>
                          </div>
                          <div className="mr-3">
                            Players Per Side:{" "}
                            <span className="font-weight-bold">
                              0
                              {
                                //matchvalue.matchData.players_per_team
                              }
                            </span>
                          </div>
                        </div>
                        <div className="text-secondary smaller">{matchvalue.date}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div class="col-md-12 text-center">
            <div class="text-secondary mb-3">There is no match added</div>
            <button
              class="btn btn-md btn-primary w-30 ml-3"
              type="button"
              onClick={createMatch}
            >
              create match
            </button>
          </div>
        )}
      </div>
      <Footer />
      {loading && <Loader status={true} />}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    match: state.match,
  };
};
export default connect(mapStateToProps)(MatchList);
