const playerstate = [];
const playerreducers = (state = playerstate, action) => {
  switch (action.type) {
    case "addplayer":
      return [...action.state];
    default:
      return state;
  }
};

export default playerreducers;
