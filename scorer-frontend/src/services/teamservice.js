import axios from "axios";
import { API_PORT, baseURL } from "../constants/appConstants";

export const CreateTeam = (data) => {
  const name = data.name;
  const image = data.image;
  const token = data.token;
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation CreateTeam($name:String!,$image:String){
              createTeam(teamInput:{name:$name,image:$image,score:0,matches:0,won:0,loss:0,tie:0}){
                _id
                name
                image
                score
                matches
                won
                loss
                tie
                user{
                  _id
                }
                players{
                  _id
                }
              }
          }`,
      variables: {
        name: name,
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
export const getTeam = () => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query{
                  teams{
                _id
                name
                image
                score
                matches
                won
                loss
                tie
                user{
                  _id
                }
                players{
                  _id
                  run
                  name
                battingStyle
                bowlingStyle
                }
              }
          }`,
    },
  });
  return res;
};
export const getTeamById = (teamId) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `query GetTeamById($teamId:ID!){
              getTeamById(teamId:$teamId){
              _id
              name
              image
              score
              won
              loss
              tie    
              players{
                _id
                name
                run
                battingStyle
                bowlingStyle
                image
              }             
            }
          }`,
      variables: {
        teamId: teamId,
      },
    },
  });
  return res;
};
export const AddPlayerToTeam = (playerId, teamId) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation AddPlayerToTeam($playerId:ID!,$teamId:ID!){
        addPlayerToTeam(playerId:$playerId,teamId:$teamId){
          _id
              name
              image
              score
              matches
              won
              loss
              tie
              players{
                _id
                name
                image
                battingStyle
                bowlingStyle
              }
        }
      }
      `,
      variables: {
        playerId: playerId,
        teamId: teamId,
      },
    },
  });
  return res;
};
export const DeletePlayerFromTeam = async (playerId, teamId) => {
  const res = await axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutationDeletePlayerFromTeam($teamId:ID!,$playerId:ID!){
        deletePlayerFromTeam(teamId:$teamId,playerId:$playerId){
            _id
            name
            players{
                _id
                name
            }
        }
      }`,
      variables: {
        teamId: teamId,
        playerId: playerId,
      },
    },
  });
  return res;
};

export const updateTeam = (data) => {
  const name = data.name;
  const matches = data.matches;
  const won = data.won;
  const loss = data.loss;
  const tie = data.tie;
  const token = data.token;
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation CreateTeam($name:String!,$image:String,$matches:Int,$won:Int,$loss:Int,$tie:Int){
              createTeam(teamInput:{name:$name,image:$image,matches:$matches,won:$won,loss:$loss,tie:$tie}){
                _id
                name
                image
                score
                matches
                won
                loss
                tie
                user{
                  _id
                }
                players{
                  _id
                }
              }
          }`,
      variables: {
        name: name,
        matches:matches,
        won:won,
        loss:loss,
        tie:tie,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};