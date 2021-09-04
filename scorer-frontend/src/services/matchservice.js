import axios from "axios";
import { API_PORT, baseURL } from "../constants/appConstants";

export const CreateMatch = (matchData) => {
  const overs = matchData.overs;
  const team1 = matchData.team1;
  const team2 = matchData.team2;
  const tossWonBy = matchData.tossWonBy;
  const battingFirst = matchData.battingFirst;
  const scorecard = matchData.scorecard;
  const date = matchData.date;
  const matchWonby = matchData.matchWonby;
  const token = matchData.token;

  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation CreateMatch($overs:Int!,$team1:ID!,$team2:ID!,$tossWonBy:String!,$battingFirst:String!,$scorecard:ID,$date:String,$matchWonby:String){
                  createMatch(matchInput:{overs:$overs,team1:$team1,team2:$team2,tossWonBy:$tossWonBy,battingFirst:$battingFirst,scorecard:$scorecard,date:$date,matchWonby:$matchWonby}){
                   _id
                   overs
                   team1{
                      _id
                      name
                   }
                   team2{
                      _id
                      name
                   }
                   tossWonBy
                   battingFirst 
                   scorecard
                   date
                   matchWonby
                  }
           }`,
      variables: {
        overs: overs,
        team1: team1,
        team2: team2,
        tossWonBy: tossWonBy,
        battingFirst: battingFirst,
        scorecard:scorecard,
        date:date,
        matchWonby:matchWonby,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

export const getMatch = () => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query{
                 matches{
                     _id
                   overs
                   team1{
                     _id
                     name 
                   }
                   team2{
                    _id
                    name 
                  }
                  user{
                    _id
                  }
                   tossWonBy
                   battingFirst 
                   scorecard
                   date
                   matchWonby
                  }
           }`,
    },
  });
  return res;
};
export const GetMatchById = (matchId) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query GetMatchById($matchId:ID!){
                    getMatchById(matchId:$matchId){
                   _id
                   overs
                   team1{
                     _id
                     name
                     score
                     image
                     players{
                       _id
                       name
                       run
                       wickets
                       fours
                       sixes
                       balls
                       overs
                       bowl_runs
                       st_rate
                     }
                    }
                    team2{
                     _id
                     name
                     score
                     image
                     players{
                      _id
                      name
                      run
                      fours
                      wickets
                       sixes
                       balls
                       overs
                       bowl_runs
                       st_rate
                    }
                   }
                   user{
                    _id
                  }
                   tossWonBy
                   battingFirst
                   scorecard
                   date
                   matchWonby                
                  }
                }`,
      variables: {
        matchId: matchId,
      },
    },
  });
  return res;
};
export const updateMatch = (matchId,matchWonby) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation UpdateMatch($matchId:ID!,$matchWonby:String){
                    updateMatch(matchId:$matchId,matchWonby:$matchWonby){
                   _id
                   overs
                   team1{
                     _id
                     name
                     score
                     players{
                       _id
                       name
                       run
                       wickets
                       fours
                       sixes
                       balls
                       overs
                       bowl_runs
                       st_rate
                     }
                    }
                    team2{
                     _id
                     name
                     score
                     players{
                      _id
                      name
                      run
                      fours
                      wickets
                       sixes
                       balls
                       overs
                       bowl_runs
                       st_rate
                    }
                   }
                   user{
                    _id
                  }
                   tossWonBy
                   battingFirst
                   scorecard
                   date
                   matchWonby                
                  }
                }`,
      variables: {
        matchId: matchId,
        matchWonby:matchWonby,
      },
    },
  });
  return res;
};
