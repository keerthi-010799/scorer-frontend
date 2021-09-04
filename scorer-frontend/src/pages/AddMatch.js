import React, { useState, useEffect, useContext } from "react";
import close from "../assets/close.png";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
//import { getData, putData } from "../utils/storgeService";
//import { colourOptions } from "../Components/SingleSelect/data";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
import moment from "moment";
import { connect } from "react-redux";
import { addingmatch } from "../actions/actions";
import Auth from "../context/auth-context";
import { CreateMatch } from "../services/matchservice";
import { getTeam } from "../services/teamservice";
import Loader from "../Components/Common/Loader";
import { createScorecard, updateScorecard } from "../services/scorecardservice";

function AddMatch({ dispatch, team }) {
  const [match, setMatchForm] = useState({
    team_1: "",
    team_2: "",
    toss_won_by: "",
    batting_first: "",
    overs: 0,
  });
  const context = useContext(Auth);
  const [teams, setTeams] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const [scoreCard, setscorecard] = useState();
  // useEffect(() => {
  //   getTeamData();
  // }, []);

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setMatchForm({ ...match, [key]: value });
    if(key === "batting_first"){
      createScorecard(scorecardpayload)
      .then((res) => {
        console.log(res.data.data.createScorecard);
        setscorecard(res.data.data.createScorecard);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    getTeam()
      .then((res) => {
        console.log(res.data.data);
        return setTeams(res.data.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const userallowed = context.userId;
  const teamsOption = teams.filter((tm) => tm.user._id === userallowed);

  const teamsOptions = teamsOption.map((t) => {
    return {
      label: t.name,
      value: t._id,
    };
  });
console.log(match?.batting_first)
  const firstbatting = (match?.batting_first.label === match?.team_1.label) ? match?.team_1 : match?.team_2;
  const teamfirstbat = teamsOption.filter((tm) => tm._id === firstbatting.value);
  const battingTeam_1 = teamfirstbat[0];
  const teamBattingPlayers1 = battingTeam_1?.players.map(p=>{
    return {
      batsmen:p._id
    }
  });
console.log(match?.batting_first.label === match?.team_1.label)

  console.log(teamBattingPlayers1);
  const secondbatting = (firstbatting.label === match?.team_1.label) ? match?.team_2 : match?.team_1;
  const teamSecondBat = teamsOption.filter((tm) => tm._id === secondbatting.value);
  const battingTeam_2 = teamSecondBat[0];
  const teamBattingPlayers2 = battingTeam_2?.players.map(p=>{
    return {
      batsmen:p._id
    }
  });
  console.log(teamBattingPlayers2);

  const firstbowling = (match?.batting_first.label === match?.team_1.label) ? match?.team_2 : match?.team_1;
  const teamfirstbowl = teamsOption.filter((tm) => tm._id === firstbowling.value);
  const bowlingTeam_1 = teamfirstbowl[0];
  const teamBowlingPlayers1 = bowlingTeam_1?.players.map(p=>{
    return {
      bowler:p._id
    }
  });
  console.log(teamBowlingPlayers1);
  const secondbowling = (firstbowling.label === match?.team_1.label) ? match?.team_2 : match?.team_1;
  const teamSecondBowl = teamsOption.filter((tm) => tm._id === secondbowling.value);
  const bowlingTeam_2 = teamSecondBowl[0];
  const teamBowlingPlayers2 = bowlingTeam_2?.players.map(p=>{
    return {
      bowler:p._id
    }
  });
  console.log(teamBowlingPlayers2);

let scorecardpayload = {
  matchStatus: "notStart",
  innings1: {
    runs: 0,
    wickets: 0,
    current_over: 0,
    current_ball: 0,
    target: 0,
    bowler_2: " ",
    end: false,
    batting:{
      scores:teamBattingPlayers1,
      total:{},
      extras:{},
    },
    bowling:{
      bowlerscores:teamBowlingPlayers1,
    },
  },
  innings2: {
    runs: 0,
    wickets: 0,
    current_over: 0,
    current_ball: 0,
    target: 0,
    bowler_2: " ",
    end: false,
    batting:{
      scores:teamBattingPlayers2,
      total:{},
      extras:{},
    },
    bowling:{
      bowlerscores:teamBowlingPlayers2,
    },
  },
};
// createScorecard(scorecard)
//     .then((res) => {
//       console.log(res.data.data.createScorecard);
//       setscorecard(res.data.data.createScorecard);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

  console.log(teamsOption);
  // const getTeamById = (teamId) => {
  //   let team = teams.find((t) => t.id === teamId);
  //   return team;
  // };
  const createMatch = () => {
    // getData('matches');
    // if (!matches) matches = [];
    let ScardId = scoreCard._id;
    
    const date = moment();
    let matchvalue = {
      //  [`team_${match.team_1.value}`]: match.team_1.id,//getTeamById(match.team_1.value),
      //  [`team_${match.team_2.value}`]: match.team_2.id,//getTeamById(match.team_2.value),
      team_1: match.team_1,
      team_2: match.team_2,
      toss_won_by: match.toss_won_by,
      batting_first: match.batting_first,
      overs: match.overs,
      date: date.format("DD/MM/YYYY"),
      teams: [match.team_1, match.team_2],
    };

    let matches = [];
    matches.push({ ...matchvalue, id: matches.length + 1 });
    dispatch(addingmatch(matches));
    const matchData = {
      overs: +matchvalue.overs,
      team1: matchvalue.team_1.value,
      team2: matchvalue.team_2.value,
      tossWonBy: matchvalue.toss_won_by.label,
      battingFirst: matchvalue.batting_first.label,
      date: matchvalue.date,
      scorecard: scoreCard?._id,
      token: context.token,
    };

    updateScorecard(ScardId,scorecardpayload)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))

    setloading(true);
    CreateMatch(matchData)
      .then((res) => {
        console.log(res);
        setloading(false);
        redirectTo("/matches");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //putData('matches', matches);
  //match = matches;
  // let match = matches.map((m,index)=>{
  //  return { m,
  //         id:index+1
  //       }
  // });

  const team2_validation = match.team_1 === "";
  const toss_won_by_validation = match.team_1 === "" || match.team_2 === "";
  const batting_first_validation = match.toss_won_by === "";
  
  return (
    <React.Fragment>
      <div className="add-players-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Add Match</div>
          <div onClick={() => redirectTo(`/matches`)}>
            <img
              src={close}
              width="30px"
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="text-secondary">
          <div class="form-group">
            <label for="">Team 1</label>
            <SingleSelect
              name={"team_1"}
              placeholder=""
              options={teamsOptions}
              value={match.team_1}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "team_1");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Team 2</label>
            <SingleSelect
              name={"team_2"}
              placeholder=""
              options={teamsOptions.filter(
                (t) => t.value !== match.team_1.value
              )}
              value={match.team_2}
              isDisabled={team2_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "team_2");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Toss Won By</label>
            <SingleSelect
              name={"toss_won_by"}
              placeholder=""
              options={[
                {
                  label: match.team_1.label,
                  value: match.team_1.value,
                  color: "#000000",
                },
                {
                  label: match.team_2.label,
                  value: match.team_2.value,
                  color: "#000000",
                },
              ]}
              value={match.toss_won_by}
              isDisabled={toss_won_by_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "toss_won_by");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Batting First</label>
            <SingleSelect
              name={"batting_first"}
              placeholder=""
              options={[
                {
                  label: match.team_1.label,
                  value: match.team_1.value,
                  color: "#000000",
                },
                {
                  label: match.team_2.label,
                  value: match.team_2.value,
                  color: "#000000",
                },
              ]}
              value={match.batting_first}
              isDisabled={batting_first_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "batting_first");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Innings Overs</label>
            <input
              type="number"
              class="form-control"
              name="overs"
              id=""
              aria-describedby="helpId"
              placeholder="Enter Overs"
              value={match.overs}
              onChange={(e) => {
                handleForm(e.target.value, "overs");
              }}
            />
          </div>

          <br />
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-md btn-primary w-100"
              onClick={() => createMatch()}
            >
              Create Match
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {loading && <Loader status={true} />}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    match: state.match,
    team: state.team,
  };
};
export default connect(mapStateToProps)(AddMatch);
