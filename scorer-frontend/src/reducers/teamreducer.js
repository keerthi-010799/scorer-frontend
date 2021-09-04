const teamstate = [];

const teamreducers = (state = teamstate, action) => {
  switch (action.type) {
    case "addteam":
      return [...action.state];
    default:
      return state;
  }
};

export default teamreducers;
