import { combineReducers } from "redux";
import playerreducers from "./playerreducer";
import matchreducers from "./matchreducer";
import teamreducers from "./teamreducer";
export default combineReducers({
  player: playerreducers,
  team: teamreducers,
  match: matchreducers,
});
