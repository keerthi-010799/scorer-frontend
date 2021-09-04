import axios from "axios";
import { API_PORT, baseURL } from "../constants/appConstants";

export const setData = async (data) => {
  const name = data.playerData.name;
  const battingStyle = data.playerData.batting_style;
  const bowlingStyle = data.playerData.bowling_style;
  const image = data.image;
  const token = data.token;

  const res = await axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation CreatePlayer($name:String!,$battingStyle:String!,$bowlingStyle:String!,$image:String!){
        createPlayer(playerInput:{name:$name,battingStyle:$battingStyle,bowlingStyle:$bowlingStyle,wickets:0,run:0,image:$image,st_rate:0,fours:0,sixes:0,bowl_runs:0,overs:0,thirty:0,fifty:0,bowl_rate:0,matches:0,avg:0,bowl_avg:0,balls:0}){
          _id
          name
          battingStyle
          bowlingStyle
          image
          wickets
          user{
            _id
        }
      }
      }`,
      variables: {
        name: name,
        battingStyle: battingStyle,
        bowlingStyle: bowlingStyle,
        image: image,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

export const getPlayerData = () => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query{
            players{
              name
              _id
              battingStyle
              bowlingStyle
              image
              run
              overs
              matches
              st_rate
              bowl_runs
              avg
              user{
                _id
              }
            }
          }`,
    },
  });
  return res;
};

export const getPlayerById = async (playerId) => {
  const res = await axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query GetPlayerById($playerId:ID!){
            getPlayerById(playerId:$playerId){
              _id
              name
              image
              run
              wickets
              battingStyle
              bowlingStyle
              overs
              matches 
              bowl_rate
              bowl_avg
              st_rate
              avg
            }
          }`,
      variables: {
        playerId: playerId,
      },
    },
  });
  return res;
};

export const updatePlayer = async (playerId, data) => {
  const name = data.name;
  const run = data.run;
  const balls = data.balls;
  const fours = data.fours;
  const sixes = data.sixes;
  const overs = data.overs;
  const bowl_runs = data.runs;
  const wickets = data.wickets;
  const res = await axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation UpdatePlayer($playerId:ID!,$name:String,$run:Int,$balls:Int,$fours:Int,$sixes:Int,$overs:Int,$bowl_runs:Int,$wickets:Int){
    updatePlayer(playerId:$playerId,name:$name,run:$run,balls:$balls,fours:$fours,sixes:$sixes,overs:$overs,bowl_runs:$bowl_runs,wickets:$wickets){
      _id
      name
      image
      run
      bowl_runs
      wickets
      battingStyle
      bowlingStyle
      overs
      matches
      bowl_rate
      bowl_avg
      st_rate
      avg
    }
  }
    `,
      variables: {
        playerId: playerId,
        name: name,
        run: run,
        balls: balls,
        fours: fours,
        sixes: sixes,
        overs: overs,
        bowl_runs: bowl_runs,
        wickets: wickets,
      },
    },
  });
  return res;
};

export const updateScoreOfPlayers = async (
  strikerData,
  nonStrikerData,
  bowlerData,
  scorecard
) => {
  const scorecardId = scorecard._id;
  const matchStatus = scorecard.matchStatus;
  const innings1 = scorecard.innings1;
  const innings2 = scorecard.innings2;

  const strikerId = strikerData?._id;
  const strikername = strikerData?.name;
  const strikerrun = strikerData?.run;
  const strikerballs = strikerData?.balls;
  const strikerfours = strikerData?.fours;
  const strikersixes = strikerData?.sixes;
  const strikerovers = strikerData?.overs;
  const strikerbowl_runs = strikerData?.bowl_runs;
  const strikerwickets = strikerData?.wickets;
 
  const nonStrikerId = nonStrikerData?._id;
  const nonStrikername = nonStrikerData?.name;
  const nonStrikerrun = nonStrikerData?.run;
  const nonStrikerballs = nonStrikerData?.balls;
  const nonStrikerfours = nonStrikerData?.fours;
  const nonStrikersixes = nonStrikerData?.sixes;
  const nonStrikerovers = nonStrikerData?.overs;
  const nonStrikerbowl_runs = nonStrikerData?.bowl_runs;
  const nonStrikerwickets = nonStrikerData?.wickets;

  const bowlerId = bowlerData?._id;
  const bowlername = bowlerData?.name;
  const bowlerrun = bowlerData?.run;
  const bowlerballs = bowlerData?.balls;
  const bowlerfours = bowlerData?.fours;
  const bowlersixes = bowlerData?.sixes;
  const bowlerovers = bowlerData?.overs;
  const bowlerbowl_runs = bowlerData?.bowl_runs;
  const bowlerwickets = bowlerData?.wickets;
  const res = await axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation updateScoreOfPlayers ($strikerId:ID,$strikername:String,$strikerrun:Int,$strikerballs:Int,$strikerfours:Int,$strikersixes:Int,$strikerovers:Int,$strikerbowl_runs:Int,$strikerwickets:Int,$strikerTotalRuns:Int,$strikerTotalWickets:Int,$strikerTotalBalls:Int,$strikerTotalFours:Int,$strikerTotalSixes:Int,
        $nonStrikerId:ID,$nonStrikername:String,$nonStrikerrun:Int,$nonStrikerballs:Int,$nonStrikerfours:Int,$nonStrikersixes:Int,$nonStrikerovers:Int,$nonStrikerbowl_runs:Int,$nonStrikerwickets:Int,
        $bowlerId:ID,$bowlername:String,$bowlerrun:Int,$bowlerballs:Int,$bowlerfours:Int,$bowlersixes:Int,$bowlerovers:Int,$bowlerbowl_runs:Int,$bowlerwickets:Int,
        $scorecardId:ID,$matchStatus:String,$innings1:InningsInput,$innings2:InningsInput){
    
          striker:updatePlayer(playerId:$strikerId,name:$strikername,run:$strikerrun,balls:$strikerballs,fours:$strikerfours,sixes:$strikersixes,overs:$strikerovers,bowl_runs:$strikerbowl_runs,wickets:$strikerwickets,totalRuns:$strikerTotalRuns,totalWickets:$strikerTotalWickets,totalFours:$strikerTotalFours,totalSixes:$strikerTotalSixes,totalBalls:$strikerTotalBalls){
      _id
      name
      image
      run
      bowl_runs
      wickets
      battingStyle
      bowlingStyle
      overs
      matches 
      bowl_rate
      bowl_avg
      st_rate
      avg
    }
    nonStriker:updatePlayer(playerId:$nonStrikerId,name:$nonStrikername,run:$nonStrikerrun,balls:$nonStrikerballs,fours:$nonStrikerfours,sixes:$nonStrikersixes,overs:$nonStrikerovers,bowl_runs:$nonStrikerbowl_runs,wickets:$nonStrikerwickets){
      _id
      name
      image
      run
      bowl_runs
      wickets
      battingStyle
      bowlingStyle
      overs
      matches 
      bowl_rate
      bowl_avg
      st_rate
      avg
    }
    bowler:updatePlayer(playerId:$bowlerId,name:$bowlername,run:$bowlerrun,balls:$bowlerballs,fours:$bowlerfours,sixes:$bowlersixes,overs:$bowlerovers,bowl_runs:$bowlerbowl_runs,wickets:$bowlerwickets){
      _id
      name
      image
      run
      bowl_runs
      wickets
      battingStyle
      bowlingStyle
      overs
      matches 
      bowl_rate
      bowl_avg
      st_rate
      avg
    }
    
    updatedScorecard:updateScorecard(scorecardId:$scorecardId,matchStatus:$matchStatus,innings1:$innings1,innings2:$innings2){
      _id
      matchStatus
      innings1{
        striker{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets 
          bowl_runs
        }
        non_striker{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets
          bowl_runs
        }
        bowler_1{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets 
          bowl_runs
        }
        bowler_2
        runs
        wickets
        target
        current_ball
        current_over
        balls{
          type
          value
        }
        end
      }
      innings2{
        striker{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets 
          bowl_runs
        }
        non_striker{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets
          bowl_runs
        }
        bowler_1{
          _id
          name
          run
          fours
          sixes
          overs
          balls
          st_rate
          wickets
          bowl_runs
        }
        bowler_2
        runs
        wickets
        target
        current_ball
        current_over
        balls{
          type
          value
        }
        end
      }
    }
  }
    `,
      variables: {
        strikerId: strikerId,
        strikername: strikername,
        strikerrun: strikerrun,
        strikerballs: strikerballs,
        strikerfours: strikerfours,
        strikersixes: strikersixes,
        strikerovers: strikerovers,
        strikerbowl_runs: strikerbowl_runs,
        strikerwickets: strikerwickets,
       
        nonStrikerId: nonStrikerId,
        nonStrikername: nonStrikername,
        nonStrikerrun: nonStrikerrun,
        nonStrikerballs: nonStrikerballs,
        nonStrikerfours: nonStrikerfours,
        nonStrikersixes: nonStrikersixes,
        nonStrikerovers: nonStrikerovers,
        nonStrikerbowl_runs: nonStrikerbowl_runs,
        nonStrikerwickets: nonStrikerwickets,
        
        bowlerId: bowlerId,
        bowlername: bowlername,
        bowlerrun: bowlerrun,
        bowlerballs: bowlerballs,
        bowlerfours: bowlerfours,
        bowlersixes: bowlersixes,
        bowlerovers: bowlerovers,
        bowlerbowl_runs: bowlerbowl_runs,
        bowlerwickets: bowlerwickets,
        
        scorecardId:scorecardId,
        matchStatus:matchStatus,
        innings1:innings1,
        innings2:innings2,
      },
    },
  });
  return res;
};
